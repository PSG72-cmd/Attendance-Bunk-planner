import React from "react";
import { isAttendanceSafe, getAttendanceStatus } from "../utils/attendanceLogic";
import "../styles/ResultDisplay.css";

export default function ResultDisplay({ data }) {
  if (!data) return null;

  const currentStatus = getAttendanceStatus(
    data.currentAttendance,
    100,
    data.requiredPercentage
  );
  const isSafe = isAttendanceSafe(
    data.currentAttendance,
    100,
    data.requiredPercentage
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "safe":
        return "#10b981"; // Green
      case "warning":
        return "#f59e0b"; // Orange
      case "critical":
        return "#ef4444"; // Red
      default:
        return "#6366f1";
    }
  };

  const getStatusEmoji = (status) => {
    switch (status) {
      case "safe":
        return "✅";
      case "warning":
        return "⚠️";
      case "critical":
        return "🚨";
      default:
        return "ℹ️";
    }
  };

  return (
    <div className="result-display-container">
      <div className="result-card">
        <h2 className="result-title">📈 Analysis Results</h2>

        {/* Current Status Section */}
        <div className="status-section">
          <div
            className="status-indicator"
            style={{ borderColor: getStatusColor(currentStatus) }}
          >
            <span className="status-emoji">{getStatusEmoji(currentStatus)}</span>
            <div>
              <h3>Current Attendance</h3>
              <p className="attendance-percent">
                {data.currentAttendance}%
              </p>
              <p className="status-text">
                {isSafe
                  ? "✅ You are above the required percentage!"
                  : "⚠️ You need to improve your attendance!"}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="progress-bar-container">
            <div className="progress-bar-label">
              <span>Required: {data.requiredPercentage}%</span>
              <span>Current: {data.currentAttendance}%</span>
            </div>
            <div className="progress-bar">
              <div
                className={`progress-fill ${currentStatus}`}
                style={{ width: `${Math.min(data.currentAttendance, 100)}%` }}
              ></div>
              <div
                className="required-line"
                style={{
                  left: `${data.requiredPercentage}%`,
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="metrics-grid">
          <div className="metric-card">
            <h4>📅 Max Classes to Bunk</h4>
            <p className="metric-value">{data.maxBunkAllowed}</p>
            <p className="metric-desc">Classes you can safely skip</p>
          </div>

          <div className="metric-card">
            <h4>🎯 Min Classes to Attend</h4>
            <p className="metric-value">{data.minAttendanceNeeded}</p>
            <p className="metric-desc">In the next {data.minAttendanceNeeded > 0 ? "period" : "period"}</p>
          </div>

          <div className="metric-card">
            <h4>🔄 Time Complexity</h4>
            <p className="metric-value">{data.timeComplexity}</p>
            <p className="metric-desc">Greedy Algorithm efficiency</p>
          </div>

          <div className="metric-card">
            <h4>💾 Space Complexity</h4>
            <p className="metric-value">{data.spaceComplexity}</p>
            <p className="metric-desc">Array storage requirement</p>
          </div>
        </div>

        {/* Comparison Section */}
        <div className="comparison-section">
          <h3>🔄 Strategy Comparison</h3>
          <div className="comparison-grid">
            {/* Optimal Strategy */}
            <div className="strategy-card optimal">
              <div className="strategy-header">
                <h4>✅ Optimal (Greedy Algorithm)</h4>
              </div>
              <div className="strategy-stats">
                <div className="stat">
                  <span>Total Attended:</span>
                  <strong>{data.optimalProjection.totalAttended}</strong>
                </div>
                <div className="stat">
                  <span>Total Classes:</span>
                  <strong>{data.optimalProjection.totalClasses}</strong>
                </div>
                <div className="stat">
                  <span>Final Attendance:</span>
                  <strong className="final-percent">
                    {data.optimalProjection.finalPercentage}%
                  </strong>
                </div>
                <div className="stat">
                  <span>Bunks Used:</span>
                  <strong className="bunk-count">
                    {data.optimalProjection.totalBunksUsed}
                  </strong>
                </div>
              </div>
              <p className="strategy-desc">
                🧠 Uses Greedy Algorithm to maximize bunk days while staying
                safe
              </p>
            </div>

            {/* Random Strategy */}
            <div className="strategy-card random">
              <div className="strategy-header">
                <h4>❌ Random (Bad Strategy)</h4>
              </div>
              <div className="strategy-stats">
                <div className="stat">
                  <span>Total Attended:</span>
                  <strong>{data.randomProjection.totalAttended}</strong>
                </div>
                <div className="stat">
                  <span>Total Classes:</span>
                  <strong>{data.randomProjection.totalClasses}</strong>
                </div>
                <div className="stat">
                  <span>Final Attendance:</span>
                  <strong className={data.randomProjection.finalPercentage >= data.requiredPercentage ? "final-percent-good" : "final-percent-bad"}>
                    {data.randomProjection.finalPercentage}%
                  </strong>
                </div>
                <div className="stat">
                  <span>Bunks Used:</span>
                  <strong className="bunk-count">
                    {data.randomProjection.totalBunksUsed}
                  </strong>
                </div>
              </div>
              <p className="strategy-desc">
                🎲 Random bunking without planning - risky!
              </p>
            </div>
          </div>
        </div>

        {/* Algorithm Explanation */}
        <div className="explanation-section">
          <h3>📚 Algorithm Explanation</h3>
          <div className="explanation-card">
            <h4>🧠 Greedy Algorithm Approach</h4>
            <ul>
              <li>
                <strong>How it works:</strong> For each future class, we decide:
                if we can bunk and still maintain the required percentage, we
                bunk. Otherwise, we attend.
              </li>
              <li>
                <strong>Why Greedy?</strong> We make the locally optimal choice
                (bunk if possible) at each step, which leads to a globally
                optimal solution for maximizing bunk days.
              </li>
              <li>
                <strong>Time Complexity:</strong> O(n) - we iterate through
                future classes once
              </li>
              <li>
                <strong>Space Complexity:</strong> O(n) - we store the schedule
                array of future classes
              </li>
            </ul>
          </div>

          <div className="explanation-card">
            <h4>📊 Array-Based Simulation</h4>
            <ul>
              <li>
                <strong>Data Structure:</strong> We use an array to represent a
                schedule of future classes
              </li>
              <li>
                <strong>Values:</strong> Each element is either "Attend" or
                "Bunk"
              </li>
              <li>
                <strong>Purpose:</strong> Array allows us to simulate and
                visualize attendance patterns
              </li>
              <li>
                <strong>Benefit:</strong> Easy to iterate, modify, and compare
                different strategies
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
