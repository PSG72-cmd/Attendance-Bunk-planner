import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SubjectForm from "./components/SubjectForm";
import SubjectCard from "./components/SubjectCard";
import "./styles/App.css";

function App() {
  const [subjects, setSubjects] = useState([]);

  const handleAddSubject = (subject) => {
    setSubjects([...subjects, subject]);
  };

  const handleRemoveSubject = (id) => {
    setSubjects(subjects.filter(s => s.id !== id));
  };

  return (
    <div className="app-container modern-theme">
      {/* Dynamic Background */}
      <div className="background-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>

      <header className="app-header glass-header">
        <div className="header-content">
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="app-title gradient-text"
          >
            Smart Attendance Manager
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="app-subtitle"
          >
            Manage multiple subjects, analyze future schedules, and maximize your safe bunks.
          </motion.p>
        </div>
      </header>

      <main className="app-main dashboard-layout">
        <SubjectForm onSubmit={handleAddSubject} />

        {subjects.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="empty-state glass-card"
          >
            <h2>No Subjects Added</h2>
            <p>Add a subject above to generate an optimized attendance timeline.</p>
          </motion.div>
        ) : (
          <div className="subjects-grid">
            <AnimatePresence>
              {subjects.map(subject => (
                 <SubjectCard 
                   key={subject.id} 
                   subject={subject} 
                   onRemove={handleRemoveSubject} 
                 />
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>

      <footer className="app-footer glass-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>About this Project</h4>
            <p>Advanced real-world dashboard using Greedy Algorithm and Arrays for precise attendance projection across dynamic timelines.</p>
          </div>
          <div className="footer-section">
            <h4>Algorithm Details</h4>
            <ul>
              <li>O(n) per Subject Projection</li>
              <li>Greedy Schedule Array Gen</li>
              <li>Framer Motion Physics</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 Smart Attendance Manager</p>
          <p className="footer-credit">
            Built by Prathmesh Sharma · <a href="https://github.com/PSG72-cmd" target="_blank" rel="noopener noreferrer">GitHub</a> · <a href="mailto:prathmeshsharma72@gmail.com">prathmeshsharma72@gmail.com</a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
