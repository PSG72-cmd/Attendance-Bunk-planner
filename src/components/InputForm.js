import React, { useState } from "react";
import "../styles/InputForm.css";

export default function InputForm({ onCalculate }) {
  const [totalClasses, setTotalClasses] = useState(30);
  const [attendedClasses, setAttendedClasses] = useState(20);
  const [requiredPercentage, setRequiredPercentage] = useState(75);
  const [futureClasses, setFutureClasses] = useState(30);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (
      totalClasses <= 0 ||
      attendedClasses < 0 ||
      attendedClasses > totalClasses
    ) {
      setError("Invalid values. Check your inputs.");
      return;
    }

    if (requiredPercentage <= 0 || requiredPercentage > 100) {
      setError("Required percentage must be between 1-100%");
      return;
    }

    if (futureClasses <= 0) {
      setError("Future classes must be greater than 0");
      return;
    }

    onCalculate(
      totalClasses,
      attendedClasses,
      requiredPercentage,
      futureClasses
    );
  };

  const setPreset = (preset) => {
    if (preset === "good") {
      setTotalClasses(30);
      setAttendedClasses(25);
      setRequiredPercentage(75);
      setFutureClasses(30);
    } else if (preset === "average") {
      setTotalClasses(40);
      setAttendedClasses(26);
      setRequiredPercentage(75);
      setFutureClasses(30);
    } else if (preset === "critical") {
      setTotalClasses(50);
      setAttendedClasses(25);
      setRequiredPercentage(75);
      setFutureClasses(30);
    }
  };

  return (
    <div className="input-form-container">
      <div className="form-card">
        <h2>📊 Attendance Calculator</h2>
        <p className="form-subtitle">
          Enter your current attendance data to analyze your bunk plan
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="total">Total Classes Conducted</label>
            <input
              id="total"
              type="number"
              value={totalClasses}
              onChange={(e) => setTotalClasses(Number(e.target.value))}
              min="1"
              max="500"
            />
            <small>Total classes held so far</small>
          </div>

          <div className="form-group">
            <label htmlFor="attended">Classes Attended</label>
            <input
              id="attended"
              type="number"
              value={attendedClasses}
              onChange={(e) => setAttendedClasses(Number(e.target.value))}
              min="0"
              max={totalClasses}
            />
            <small>Classes you've attended</small>
          </div>

          <div className="form-group">
            <label htmlFor="required">Required Attendance %</label>
            <input
              id="required"
              type="number"
              value={requiredPercentage}
              onChange={(e) => setRequiredPercentage(Number(e.target.value))}
              min="1"
              max="100"
              step="0.1"
            />
            <small>Minimum required attendance percentage</small>
          </div>

          <div className="form-group">
            <label htmlFor="future">Future Classes to Account For</label>
            <input
              id="future"
              type="number"
              value={futureClasses}
              onChange={(e) => setFutureClasses(Number(e.target.value))}
              min="1"
              max="100"
            />
            <small>Classes you plan ahead for</small>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="btn-calculate">
            🧮 Calculate Plan
          </button>
        </form>

        <div className="preset-buttons">
          <p>Quick Presets:</p>
          <button
            className="preset-btn good"
            onClick={() => setPreset("good")}
          >
            Good
          </button>
          <button
            className="preset-btn average"
            onClick={() => setPreset("average")}
          >
            Average
          </button>
          <button
            className="preset-btn critical"
            onClick={() => setPreset("critical")}
          >
            Critical
          </button>
        </div>
      </div>
    </div>
  );
}
