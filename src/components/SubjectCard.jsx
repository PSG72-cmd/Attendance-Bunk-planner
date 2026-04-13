import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import ProgressBar from "./ProgressBar";
import ScheduleVisualizer from "./ScheduleVisualizer";
import { calculateSubjectAttendance, recalculateWithNextBunk } from "../utils/attendanceLogic";
import { Trash2, AlertTriangle, CheckCircle, HelpCircle } from "lucide-react";

const AnimatedCounter = ({ from, to, duration = 1 }) => {
  const [count, setCount] = useState(from);

  useEffect(() => {
    let startTime;
    const animateCount = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / (duration * 1000), 1);
      
      // Easing function
      const easeOutQuart = 1 - Math.pow(1 - percentage, 4);
      setCount(Math.floor(from + (to - from) * easeOutQuart));

      if (percentage < 1) {
        requestAnimationFrame(animateCount);
      }
    };
    requestAnimationFrame(animateCount);
  }, [to, from, duration]);

  return <span>{count}</span>;
};

export default function SubjectCard({ subject, onRemove }) {
  const [showSchedule, setShowSchedule] = useState(false);
  const [simulatedBunk, setSimulatedBunk] = useState(false);

  const analysis = calculateSubjectAttendance(subject);
  
  if (analysis.error) {
    return <div className="glass-card error-card">Error calculating data for {subject.subjectName}</div>;
  }

  // Handle "What if I bunk?" simulation
  let displayAnalysis = analysis;
  if(simulatedBunk) {
     const simulatedSchedule = recalculateWithNextBunk(analysis.optimalSchedule, subject);
     if(simulatedSchedule) {
        // Build a mock analysis object just to show what happens
        const totalConducted = (subject.totalClassesSoFar || subject.attendedClasses) + 1;
        const newPercent = (subject.attendedClasses / totalConducted) * 100;
        
        displayAnalysis = {
            ...analysis,
            currentAttendance: newPercent,
            optimalSchedule: simulatedSchedule,
            isSimulation: true
        };
     }
  }

  const isSafe = displayAnalysis.currentAttendance >= subject.requiredPercentage;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      layout
      className={`glass-card subject-card ${isSafe ? 'border-safe' : 'border-danger'}`}
    >
      <div className="card-header">
        <div>
          <h2>{subject.subjectName}</h2>
          <p className="subtitle">Target Date: {new Date(subject.endDate).toLocaleDateString()}</p>
        </div>
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="btn-icon" 
          onClick={() => onRemove(subject.id)}
        >
          <Trash2 size={18} color="#ef4444" />
        </motion.button>
      </div>

      <div className="metrics-container">
        <ProgressBar 
          percentage={displayAnalysis.currentAttendance} 
          requiredPercentage={subject.requiredPercentage} 
        />
        
        {displayAnalysis.isSimulation && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="simulation-banner">
             <AlertTriangle size={14}/> Simulated Next Bunk Active
          </motion.div>
        )}

        <div className="stats-grid">
          <div className="stat-box">
            <span className="stat-label">Remaining Classes</span>
            <span className="stat-value">
              <AnimatedCounter from={0} to={analysis.futureClasses} />
            </span>
          </div>
          <div className="stat-box">
            <span className="stat-label">Max Safe Bunks</span>
            <span className="stat-value text-blue">
              <AnimatedCounter from={0} to={displayAnalysis.maxBunkAllowed} />
            </span>
          </div>
          <div className="stat-box">
            <span className="stat-label">Must Attend</span>
            <span className="stat-value text-red">
              <AnimatedCounter from={0} to={displayAnalysis.minAttendanceNeeded} />
            </span>
          </div>
        </div>
      </div>

      <div className="card-actions">
        <motion.button 
          whileTap={{ scale: 0.95 }}
          className={`btn-simulate ${simulatedBunk ? 'active' : ''}`}
          onClick={() => setSimulatedBunk(!simulatedBunk)}
        >
          <HelpCircle size={16} /> 
          {simulatedBunk ? "Reset Timeline" : "What if I Bunk Next?"}
        </motion.button>

        <motion.button 
          whileTap={{ scale: 0.95 }}
          className="btn-schedule"
          onClick={() => setShowSchedule(!showSchedule)}
        >
          <Calendar size={16} /> 
          {showSchedule ? 'Hide Strategy' : 'Show Smart Schedule'}
        </motion.button>
      </div>

      {showSchedule && (
        <motion.div 
           initial={{ opacity: 0, height: 0 }}
           animate={{ opacity: 1, height: "auto" }}
           className="schedule-wrapper"
        >
          <ScheduleVisualizer 
            optimalSchedule={displayAnalysis.optimalSchedule} 
            randomSchedule={displayAnalysis.randomSchedule}
            isSimulation={displayAnalysis.isSimulation}
          />
        </motion.div>
      )}
    </motion.div>
  );
}

// Ensure the icon import above is completely correct, replacing Calendar to use lucide
import { Calendar } from "lucide-react";
