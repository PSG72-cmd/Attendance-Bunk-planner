import { calculateFutureClasses } from "./dateUtils";

/**
 * Main function to calculate bunk plan for a specific subject
 * @param {Object} params
 * @param {number} params.classesPerWeek
 * @param {number} params.attendedClasses
 * @param {number} params.totalClassesSoFar
 * @param {number} params.requiredPercentage (e.g. 75)
 * @param {string|Date} params.endDate
 * @returns {Object} Detailed bunk plan analysis
 */
export function calculateSubjectAttendance({
  classesPerWeek,
  attendedClasses,
  totalClassesSoFar,
  requiredPercentage = 75,
  endDate,
}) {
  // If user doesn't provide total held, assume it's equal to attended
  let totalConducted = totalClassesSoFar;
  if (!totalConducted || totalConducted < attendedClasses) {
    totalConducted = attendedClasses;
  }

  // Input Validation
  if (totalConducted < 0 || attendedClasses < 0 || classesPerWeek <= 0) {
    return { error: "Invalid input values" };
  }

  const futureClasses = calculateFutureClasses(endDate, classesPerWeek);

  // Calculate current attendance percentage
  const currentAttendance = totalConducted === 0 ? 100 : (attendedClasses / totalConducted) * 100;

  // Max classes that can be bunked overall
  // Formula: (attended - req% * total) / (1 - req%)
  const reqFrac = requiredPercentage / 100;
  
  // Safe calculation to avoid division by zero edge cases
  let maxBunkAllowed = 0;
  if (reqFrac < 1) {
    maxBunkAllowed = Math.floor((attendedClasses - reqFrac * totalConducted) / (1 - reqFrac));
  }

  // Minimum classes needed in future to maintain required attendance
  const minClassesNeeded = Math.ceil(reqFrac * (totalConducted + futureClasses));
  const minAttendanceNeeded = Math.max(0, minClassesNeeded - attendedClasses);

  // Generate optimal future schedule using Greedy Algorithm
  const optimalSchedule = generateOptimalSchedule(
    attendedClasses,
    totalConducted,
    futureClasses,
    requiredPercentage
  );

  // Generate random (bad) strategy for comparison
  const randomSchedule = generateRandomSchedule(futureClasses);

  const optimalProjection = calculateProjection(attendedClasses, totalConducted, optimalSchedule);
  const randomProjection = calculateProjection(attendedClasses, totalConducted, randomSchedule);

  return {
    currentAttendance: Number(currentAttendance.toFixed(2)),
    maxBunkAllowed: Math.max(0, maxBunkAllowed),
    minAttendanceNeeded: Math.max(0, minAttendanceNeeded),
    futureClasses,
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
 * Generates an alternative schedule "What if I Bunk Next Class?"
 */
export function recalculateWithNextBunk(scheduleData, params) {
    // Force a bunk for day 1, then use greedy
    const futureClasses = calculateFutureClasses(params.endDate, params.classesPerWeek);
    if(futureClasses === 0) return null;

    let totalConducted = params.totalClassesSoFar || params.attendedClasses;
    
    // Simulate bunking the very next class
    totalConducted++; // Time passes
    // Attended remains same since it's a bunk

    const remainingFuture = futureClasses - 1;

    // Use greedy on the remainder
    const restSchedule = generateOptimalSchedule(
        params.attendedClasses, 
        totalConducted, 
        remainingFuture, 
        params.requiredPercentage
    );
    
    return ["Bunk", ...restSchedule];
}

/**
 * Greedy Algorithm
 */
function generateOptimalSchedule(attended, total, future, required) {
  const schedule = [];
  let currentAttended = attended;
  let currentTotal = total;

  for (let i = 0; i < future; i++) {
    currentTotal++;
    const minNeeded = Math.ceil((required / 100) * currentTotal);
    const classesStillNeeded = minNeeded - currentAttended;

    if (classesStillNeeded <= future - i) {
      schedule.push("Bunk");
    } else {
      schedule.push("Attend");
      currentAttended++;
    }
  }

  return schedule;
}

function generateRandomSchedule(future) {
  const schedule = [];
  for (let i = 0; i < future; i++) {
    schedule.push(Math.random() < 0.6 ? "Attend" : "Bunk");
  }
  return schedule;
}

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
    percentage: finalTotal === 0 ? 100 : Number(((finalAttended / finalTotal) * 100).toFixed(2)),
  };
}

export function isAttendanceSafe(attended, total, required) {
  return (attended / total) * 100 >= required;
}

export function getAttendanceStatus(attended, total, required) {
  if(total === 0) return "safe";
  const percentage = (attended / total) * 100;
  if (percentage >= required + 5) {
    return "safe";
  } else if (percentage >= required) {
    return "warning";
  } else {
    return "critical";
  }
}
