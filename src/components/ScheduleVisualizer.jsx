import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1 }
};

export default function ScheduleVisualizer({ optimalSchedule, randomSchedule, isSimulation }) {
  const [activeTab, setActiveTab] = useState("optimal");

  if (!optimalSchedule || !randomSchedule || optimalSchedule.length === 0) {
     return <div className="no-data">No future classes scheduled.</div>;
  }

  const renderScheduleGrid = (schedule) => {
    const itemsPerRow = 7;
    const weeks = Math.ceil(schedule.length / itemsPerRow);

    return (
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="schedule-grid-container"
      >
        {Array.from({ length: weeks }).map((_, weekIdx) => (
          <div key={`week-${weekIdx}`} className="week-container">
            <div className="week-label">Week {weekIdx + 1}</div>
            <div className="day-grid">
              {schedule
                .slice(weekIdx * itemsPerRow, (weekIdx + 1) * itemsPerRow)
                .map((day, dayIdx) => {
                  const absoluteIdx = weekIdx * itemsPerRow + dayIdx;
                  const isSimulatedBunk = isSimulation && absoluteIdx === 0 && activeTab === "optimal";

                  return (
                    <motion.div
                      variants={itemVariants}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      key={`day-${absoluteIdx}`}
                      className={`glass-card day-item attend-${day.toLowerCase()} ${isSimulatedBunk ? 'simulated-pulse' : ''}`}
                      title={`Class ${absoluteIdx + 1}: ${day}`}
                    >
                      <span className="day-number">{absoluteIdx + 1}</span>
                      <span className="day-status">
                        {day === "Attend" ? "✓" : "×"}
                      </span>
                    </motion.div>
                  );
                })}
            </div>
          </div>
        ))}
      </motion.div>
    );
  };

  const currentSchedule = activeTab === "optimal" ? optimalSchedule : randomSchedule;

  return (
    <div className="schedule-visualizer-container">
      <div className="tab-navigation glass-tabs">
        <button
          className={`tab-btn ${activeTab === "optimal" ? "active" : ""}`}
          onClick={() => setActiveTab("optimal")}
        >
          Optimal Strategy
        </button>
        <button
          className={`tab-btn ${activeTab === "random" ? "active" : ""}`}
          onClick={() => setActiveTab("random")}
        >
          Random Strategy
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          <div className="schedule-legend">
            <div className="legend-item"><div className="legend-icon attend">✓</div> Attend</div>
            <div className="legend-item"><div className="legend-icon bunk">×</div> Bunk</div>
          </div>

          {activeTab === "optimal" ? (
             <p className="strategy-note safe">
                <strong>Why This Works (Greedy):</strong> Calculates minimal classes needed at each step, maximizing early bunks securely.
             </p>
          ) : (
             <p className="strategy-note danger">
                <strong>Why This Fails:</strong> Random absence planning can lead to unpredictable shortfalls against requirements.
             </p>
          )}

          {renderScheduleGrid(currentSchedule)}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
