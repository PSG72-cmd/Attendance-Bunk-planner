import React, { useState } from "react";
import "../styles/ScheduleVisualizer.css";

export default function ScheduleVisualizer({ optimalSchedule, randomSchedule }) {
  const [activeTab, setActiveTab] = useState("optimal");

  if (!optimalSchedule || !randomSchedule) return null;

  const renderScheduleGrid = (schedule, type) => {
    const itemsPerRow = 7; // Weekly view
    const weeks = Math.ceil(schedule.length / itemsPerRow);

    return (
      <div className="schedule-grid-container">
        {Array.from({ length: weeks }).map((_, weekIdx) => (
          <div key={weekIdx} className="week-container">
            <div className="week-label">Week {weekIdx + 1}</div>
            <div className="day-grid">
              {schedule
                .slice(weekIdx * itemsPerRow, (weekIdx + 1) * itemsPerRow)
                .map((day, dayIdx) => {
                  const absoluteIdx = weekIdx * itemsPerRow + dayIdx;
                  return (
                    <div
                      key={absoluteIdx}
                      className={`day-item attend-${day.toLowerCase()}`}
                      title={`Day ${absoluteIdx + 1}: ${day}`}
                    >
                      <span className="day-number">{absoluteIdx + 1}</span>
                      <span className="day-status">
                        {day === "Attend" ? "✅" : "🚫"}
                      </span>
                    </div>
                  );
                })}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const getTotalStats = (schedule) => {
    const attends = schedule.filter((d) => d === "Attend").length;
    const bunks = schedule.filter((d) => d === "Bunk").length;
    return { attends, bunks };
  };

  const optimalStats = getTotalStats(optimalSchedule);
  const randomStats = getTotalStats(randomSchedule);

  return (
    <div className="schedule-visualizer-container">
      <div className="schedule-card">
        <h2 className="schedule-title">📅 Future Attendance Schedule</h2>
        <p className="schedule-subtitle">
          Next {optimalSchedule.length} days - Click to see different strategies
        </p>

        {/* Tab Navigation */}
        <div className="tab-navigation">
          <button
            className={`tab-btn ${activeTab === "optimal" ? "active" : ""}`}
            onClick={() => setActiveTab("optimal")}
          >
            ✅ Optimal Plan (Greedy)
          </button>
          <button
            className={`tab-btn ${activeTab === "random" ? "active" : ""}`}
            onClick={() => setActiveTab("random")}
          >
            ❌ Random Plan
          </button>
        </div>

        {/* Stats Bar */}
        <div className="stats-bar">
          {activeTab === "optimal" ? (
            <>
              <div className="stat-item">
                <span className="stat-label">👥 Attend</span>
                <span className="stat-value attend">{optimalStats.attends}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">🚫 Bunk</span>
                <span className="stat-value bunk">{optimalStats.bunks}</span>
              </div>
            </>
          ) : (
            <>
              <div className="stat-item">
                <span className="stat-label">👥 Attend</span>
                <span className="stat-value attend">{randomStats.attends}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">🚫 Bunk</span>
                <span className="stat-value bunk">{randomStats.bunks}</span>
              </div>
            </>
          )}
        </div>

        {/* Schedule Grid */}
        <div className="schedule-display">
          {activeTab === "optimal" ? (
            <div>
              <h3>Optimized Schedule (Greedy Algorithm)</h3>
              {renderScheduleGrid(optimalSchedule, "optimal")}
              <div className="schedule-legend">
                <div className="legend-item">
                  <div className="legend-color attend"></div>
                  <span>Attend Class</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color bunk"></div>
                  <span>Bunk Class</span>
                </div>
              </div>
              <div className="strategy-note">
                <strong>💡 Why This Strategy Works:</strong> The Greedy
                Algorithm calculates the minimum classes needed at each step and
                only attends when necessary, maximizing your bunk days while
                staying safe.
              </div>
            </div>
          ) : (
            <div>
              <h3>Random Schedule (No Planning)</h3>
              {renderScheduleGrid(randomSchedule, "random")}
              <div className="schedule-legend">
                <div className="legend-item">
                  <div className="legend-color attend"></div>
                  <span>Attend Class</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color bunk"></div>
                  <span>Bunk Class</span>
                </div>
              </div>
              <div className="strategy-note warning">
                <strong>⚠️ Why This Is Risky:</strong> Random bunking without
                planning can lead to unpredictable attendance. You might bunk
                too much and fail to meet the minimum requirement!
              </div>
            </div>
          )}
        </div>

        {/* Timeline View (Linear) */}
        <div className="timeline-section">
          <h3>📊 Timeline View</h3>
          <div className="timeline">
            {activeTab === "optimal"
              ? optimalSchedule.map((day, idx) => (
                  <div
                    key={idx}
                    className={`timeline-item attend-${day.toLowerCase()}`}
                  >
                    <div className="timeline-marker">
                      {day === "Attend" ? "✅" : "🚫"}
                    </div>
                    <span className="timeline-day">Day {idx + 1}</span>
                  </div>
                ))
              : randomSchedule.map((day, idx) => (
                  <div
                    key={idx}
                    className={`timeline-item attend-${day.toLowerCase()}`}
                  >
                    <div className="timeline-marker">
                      {day === "Attend" ? "✅" : "🚫"}
                    </div>
                    <span className="timeline-day">Day {idx + 1}</span>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}
