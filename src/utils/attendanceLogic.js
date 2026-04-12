/**
 * Smart Attendance Bunk Planner - Core DSA Logic
 * Uses Greedy Algorithm and Arrays for optimal attendance planning
 * Time Complexity: O(n) where n is the number of future classes
 * Space Complexity: O(n) for storing the schedule array
 */

/**
 * Main function to calculate bunk plan
 * @param {number} totalClasses - Total classes conducted
 * @param {number} attendedClasses - Number of classes attended
 * @param {number} requiredPercentage - Required attendance percentage (default 75)
 * @param {number} futureClasses - Number of future classes to plan (default 30)
 * @returns {Object} Detailed bunk plan analysis
 */
export function calculateBunkPlan(
  totalClasses,
  attendedClasses,
  requiredPercentage = 75,
  futureClasses = 30
) {
  // Input Validation
  if (totalClasses <= 0 || attendedClasses < 0 || attendedClasses > totalClasses) {
    return { error: "Invalid input: Check your values" };
  }

  // Calculate current attendance percentage
  const currentAttendance = (attendedClasses / totalClasses) * 100;

  // Maximum classes that can be bunked in current scenario
  const maxBunkAllowed = Math.floor(
    (attendedClasses - (requiredPercentage / 100) * totalClasses) /
      (1 - requiredPercentage / 100)
  );

  // Minimum classes needed to maintain required attendance
  const minClassesNeeded = Math.ceil(
    (requiredPercentage / 100) * (totalClasses + futureClasses)
  );
  const minAttendanceNeeded = Math.max(
    0,
    minClassesNeeded - attendedClasses
  );

  // Generate optimal future schedule using Greedy Algorithm
  const optionalSchedule = generateOptimalSchedule(
    attendedClasses,
    totalClasses,
    futureClasses,
    requiredPercentage
  );

  // Generate random (bad) strategy for comparison
  const randomSchedule = generateRandomSchedule(futureClasses);

  // Calculate projection for both strategies
  const optimalProjection = calculateProjection(
    attendedClasses,
    totalClasses,
    optionalSchedule
  );
  const randomProjection = calculateProjection(
    attendedClasses,
    totalClasses,
    randomSchedule
  );

  return {
    currentAttendance: Number(currentAttendance.toFixed(2)),
    maxBunkAllowed: Math.max(0, maxBunkAllowed),
    minAttendanceNeeded: Math.max(0, minAttendanceNeeded),
    requiredPercentage,
    optimalSchedule,
    randomSchedule,
    optimalProjection: {
      totalAttended: optimalProjection.attended,
      totalClasses: optimalProjection.total,
      finalPercentage: optimalProjection.percentage,
      totalBunksUsed: optimalSchedule.filter((d) => d === "Bunk").length,
    },
    randomProjection: {
      totalAttended: randomProjection.attended,
      totalClasses: randomProjection.total,
      finalPercentage: randomProjection.percentage,
      totalBunksUsed: randomSchedule.filter((d) => d === "Bunk").length,
    },
    algorithm: "Greedy Algorithm",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
  };
}

/**
 * Greedy Algorithm for optimal attendance planning
 * Strategy: Attend just enough classes to maintain required percentage
 * Tries to maximize bunk days while staying above required threshold
 * Time Complexity: O(n)
 * @param {number} attended - Current attended classes
 * @param {number} total - Current total classes
 * @param {number} future - Number of future classes
 * @param {number} required - Required percentage
 * @returns {Array} Schedule array with "Attend" or "Bunk"
 */
function generateOptimalSchedule(attended, total, future, required) {
  const schedule = [];
  let currentAttended = attended;
  let currentTotal = total;

  for (let i = 0; i < future; i++) {
    currentTotal++;

    // Calculate minimum classes needed to reach required percentage at end
    const minNeeded = Math.ceil((required / 100) * currentTotal);
    const classesStillNeeded = minNeeded - currentAttended;

    // Greedy Decision: If we can bunk and still reach required percentage, BUNK
    if (classesStillNeeded <= future - i) {
      schedule.push("Bunk");
    } else {
      // Otherwise ATTEND
      schedule.push("Attend");
      currentAttended++;
    }
  }

  return schedule;
}

/**
 * Generate random schedule for comparison (bad strategy)
 * @param {number} future - Number of future classes
 * @returns {Array} Random schedule
 */
function generateRandomSchedule(future) {
  const schedule = [];
  for (let i = 0; i < future; i++) {
    // Random 60% attend, 40% bunk
    schedule.push(Math.random() < 0.6 ? "Attend" : "Bunk");
  }
  return schedule;
}

/**
 * Calculate final attendance projection
 * @param {number} attended - Current attended
 * @param {number} total - Current total
 * @param {Array} schedule - Future schedule
 * @returns {Object} Projection data
 */
function calculateProjection(attended, total, schedule) {
  let finalAttended = attended;
  let finalTotal = total;

  schedule.forEach((day) => {
    if (day === "Attend") {
      finalAttended++;
    }
    finalTotal++;
  });

  return {
    attended: finalAttended,
    total: finalTotal,
    percentage: Number(((finalAttended / finalTotal) * 100).toFixed(2)),
  };
}

/**
 * Check if attendance is safe (above required percentage)
 * @param {number} attended - Classes attended
 * @param {number} total - Total classes
 * @param {number} required - Required percentage
 * @returns {boolean} True if safe
 */
export function isAttendanceSafe(attended, total, required) {
  return (attended / total) * 100 >= required;
}

/**
 * Get urgency status based on attendance
 * @param {number} attended - Classes attended
 * @param {number} total - Total classes
 * @param {number} required - Required percentage
 * @returns {string} Status: "safe", "warning", "critical"
 */
export function getAttendanceStatus(attended, total, required) {
  const percentage = (attended / total) * 100;
  if (percentage >= required) {
    return "safe";
  } else if (percentage >= required - 5) {
    return "warning";
  } else {
    return "critical";
  }
}
