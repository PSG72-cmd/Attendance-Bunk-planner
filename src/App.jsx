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
          <h1 className="app-title">Smart Attendance Planner</h1>
          <p className="app-subtitle">
            Optimize your schedule with our greedy algorithm engine
          </p>
          <div className="header-badges">
            <span className="badge">Greedy Algorithm</span>
            <span className="badge">Arrays</span>
            <span className="badge">O(n) Complexity</span>
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
                <h2>Overview</h2>
                <p>
                  <strong>Challenge:</strong> Students often lack clarity on how
                  many classes they can miss while adhering to minimum
                  attendance policies.
                </p>
                <p>
                  <strong>Solution:</strong> This application utilizes a Greedy
                  Algorithm to calculate maximum allowable absences and constructs
                  an optimal attendance scheduling sequence over time.
                </p>

                <div className="features-grid">
                  <div className="feature">
                    <h4>Analyze</h4>
                    <p>Review current attendance metrics</p>
                  </div>
                  <div className="feature">
                    <h4>Calculate</h4>
                    <p>Compute strict attendance margins</p>
                  </div>
                  <div className="feature">
                    <h4>Plan</h4>
                    <p>Generate future schedule</p>
                  </div>
                  <div className="feature">
                    <h4>Compare</h4>
                    <p>Optimal strategy vs baseline</p>
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
                Recalculate
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
              A web application demonstrating Greedy Algorithm and Arrays for
              real-world scheduling and attendance planning.
            </p>
          </div>
          <div className="footer-section">
            <h4>Algorithm Details</h4>
            <ul>
              <li>Greedy Strategy Selection</li>
              <li>O(n) Time Complexity Simulation</li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Technology Stack</h4>
            <ul>
              <li>React Framework</li>
              <li>CSS Architecture</li>
              <li>Responsive Design UI</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 Smart Attendance Planner</p>
          <p className="footer-credit">
            Built by Prathmesh Sharma · <a href="https://github.com/PSG72-cmd" target="_blank" rel="noopener noreferrer">GitHub</a> · <a href="mailto:prathmeshsharma72@gmail.com">prathmeshsharma72@gmail.com</a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
