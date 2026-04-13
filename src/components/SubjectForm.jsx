import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getRemainingWeeks } from "../utils/dateUtils";
import { Calendar, BookOpen, Clock, AlertCircle } from "lucide-react";

export default function SubjectForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    subjectName: "",
    classesPerWeek: 3,
    attendedClasses: 0,
    totalClassesSoFar: "", 
    requiredPercentage: 75,
    endDate: ""
  });

  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!formData.subjectName || !formData.endDate) return;

    onSubmit({
      ...formData,
      id: Date.now().toString(),
      totalClassesSoFar: formData.totalClassesSoFar ? Number(formData.totalClassesSoFar) : Number(formData.attendedClasses)
    });
    
    setIsOpen(false);
    setFormData({
      subjectName: "",
      classesPerWeek: 3,
      attendedClasses: 0,
      totalClassesSoFar: "",
      requiredPercentage: 75,
      endDate: ""
    });
  };

  return (
    <div className="subject-form-wrapper">
      {!isOpen ? (
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn-primary"
          onClick={() => setIsOpen(true)}
        >
          + Add New Subject
        </motion.button>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="glass-card form-container"
        >
          <div className="form-header">
            <h3>Add New Subject</h3>
            <button className="btn-close" onClick={() => setIsOpen(false)}>×</button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label><BookOpen size={16}/> Subject Name</label>
                <input 
                  type="text" 
                  required 
                  value={formData.subjectName}
                  onChange={(e) => setFormData({...formData, subjectName: e.target.value})}
                  placeholder="e.g. Data Structures"
                />
              </div>

              <div className="form-group">
                <label><Clock size={16}/> Classes per Week</label>
                <input 
                  type="number" 
                  min="1" 
                  required 
                  value={formData.classesPerWeek}
                  onChange={(e) => setFormData({...formData, classesPerWeek: Number(e.target.value)})}
                />
              </div>

              <div className="form-group">
                <label>Classes Attended</label>
                <input 
                  type="number" 
                  min="0" 
                  required 
                  value={formData.attendedClasses}
                  onChange={(e) => setFormData({...formData, attendedClasses: Number(e.target.value)})}
                />
              </div>

              <div className="form-group">
                <label>Total Held (Optional)</label>
                <input 
                  type="number" 
                  min="0" 
                  value={formData.totalClassesSoFar}
                  onChange={(e) => setFormData({...formData, totalClassesSoFar: e.target.value})}
                  placeholder="Defaults to attended"
                />
              </div>

              <div className="form-group">
                <label>Required %</label>
                <input 
                  type="number" 
                  min="1" 
                  max="100" 
                  required 
                  value={formData.requiredPercentage}
                  onChange={(e) => setFormData({...formData, requiredPercentage: Number(e.target.value)})}
                />
              </div>

              <div className="form-group">
                <label><Calendar size={16}/> Subject End Date</label>
                <input 
                  type="date" 
                  required 
                  value={formData.endDate}
                  onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                />
              </div>
            </div>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit" 
              className="btn-submit"
            >
              Analyze Subject
            </motion.button>
          </form>
        </motion.div>
      )}
    </div>
  );
}
