import React, { useState } from "react";
import InputForm from "./components/InputForm";
import ResultDisplay from "./components/ResultDisplay";
import ScheduleVisualizer from "./components/ScheduleVisualizer";
import { calculateBunkPlan } from "./utils/attendanceLogic";
import "./styles/App.css";

function App() {
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleCalculate = (
    totalClasses,
    attendedClasses,
    requiredPercentage,
    futureClasses
  ) => {
    const result = calculateBunkPlan(
      totalClasses,
      attendedClasses,
      requiredPercentage,
      futureClasses
    );
    setAnalysisResult(result);
  };

  const resetCalculation = () => {
    setAnalysisResult(null);
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">
            📚 Smart Attendance Bunk Planner
          </h1>
          <p className="app-subtitle">
            Powered by Greedy Algorithm & Arrays | DSA Project
          </p>
          <div className="header-badges">
            <span className="badge">🧠 Greedy Algorithm</span>
            <span className="badge">📊 Arrays</span>
            <span className="badge">⚡ O(n) Complexity</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="app-main">
        {!analysisResult ? (
          <>
            {/* Problem Statement */}
            <section className="problem-statement">
              <div className="problem-card">
                <h2>🎯 Problem Statement</h2>
                <p>
                  <strong>Challenge:</strong> Students often don't know how many
                  classes they can bunk while maintaining the minimum attendance
                  requirement (e.g., 75%).
                </p>
                <p>
                  <strong>Solution:</strong> This app uses a Greedy Algorithm to
                  calculate the maximum classes you can bunk and generate an
                  optimal attendance strategy for the future.
                </p>

                <div className="features-grid">
                  <div className="feature">
                    <span className="feature-icon">📊</span>
                    <h4>Analyze</h4>
                    <p>Check current attendance status</p>
                  </div>
                  <div className="feature">
                    <span className="feature-icon">🎯</span>
                    <h4>Calculate</h4>
                    <p>Find max bunk & min attend</p>
                  </div>
                  <div className="feature">
                    <span className="feature-icon">📈</span>
                    <h4>Plan</h4>
                    <p>Get optimal attendance schedule</p>
                  </div>
                  <div className="feature">
                    <span className="feature-icon">🔄</span>
                    <h4>Compare</h4>
                    <p>See optimal vs random strategy</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Input Form */}
            <InputForm onCalculate={handleCalculate} />
          </>
        ) : (
          <>
            {/* Results Section */}
            <div className="results-section">
              <button className="btn-reset" onClick={resetCalculation}>
                ↻ Calculate Again
              </button>

              {/* Result Display */}
              <ResultDisplay data={analysisResult} />

              {/* Schedule Visualizer */}
              <ScheduleVisualizer
                optimalSchedule={analysisResult.optimalSchedule}
                randomSchedule={analysisResult.randomSchedule}
              />
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>About this Project</h4>
            <p>
              A DSA-based web application demonstrating Greedy Algorithm and
              Arrays for real-world attendance planning.
            </p>
          </div>
          <div className="footer-section">
            <h4>Key Algorithms</h4>
            <ul>
              <li>🧠 Greedy Algorithm - O(n) time complexity</li>
              <li>📊 Array Simulation - O(n) space complexity</li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Technologies</h4>
            <ul>
              <li>⚛️ React 18</li>
              <li>🎨 CSS3</li>
              <li>📱 Responsive Design</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            © 2026 Smart Attendance Bunk Planner | DSA Project | Built with ❤️
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
