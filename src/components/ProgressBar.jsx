import React from "react";
import { motion } from "framer-motion";

export default function ProgressBar({ percentage, requiredPercentage = 75 }) {
  // Determine color based on safe margins
  const getColor = () => {
    if (percentage >= requiredPercentage + 5) return "#10b981"; // Emerald safe
    if (percentage >= requiredPercentage) return "#f59e0b"; // Yellow warning
    return "#ef4444"; // Red critical
  };

  const progressColor = getColor();

  return (
    <div className="progress-bar-container">
      <div className="progress-labels">
        <span style={{ color: progressColor, fontWeight: 700 }}>{percentage.toFixed(1)}%</span>
        <span>Req: {requiredPercentage}%</span>
      </div>
      <div className="progress-track" style={{ background: "rgba(255,255,255,0.1)", height: "12px", borderRadius: "10px", position: "relative", overflow: "hidden" }}>
        <motion.div
          className="progress-fill"
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(percentage, 100)}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{
            height: "100%",
            backgroundColor: progressColor,
            borderRadius: "10px",
            boxShadow: `0 0 10px ${progressColor}80`
          }}
        />
        <div
          className="progress-marker"
          style={{
            position: "absolute",
            left: `${requiredPercentage}%`,
            top: 0,
            height: "100%",
            width: "2px",
            backgroundColor: "rgba(255,255,255,0.5)",
            zIndex: 10
          }}
        />
      </div>
    </div>
  );
}
