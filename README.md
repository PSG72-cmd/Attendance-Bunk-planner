# Smart Attendance Manager (SaaS Edition) 🚀

A modern, Glassmorphism-styled multi-subject attendance tracker powered by a **Greedy Algorithm**. This project solves the daily student struggle of tracking attendance across subjects with different schedules, predicting future absences, and maximizing safe "bunks" up to the end of the semester.

## 🌟 Live Demo
[**View Live on Vercel**](https://attendance-bunk-planner.vercel.app/) *(Assumed domain based on project setup)*

## 🧠 Problem Statement
Students manage attendance across multiple subjects, each having:
- Different number of classes per week
- Different end dates

Students struggle to:
- calculate total remaining classes accurately
- know exactly how many classes they can safely bunk
- generate a future timeline of when to attend and when to skip
- test scenarios dynamically ("What if I bunk tomorrow?")

**This system solves all of this automatically using Data Structures & Algorithms.**

## ⚙️ CoreDSA Logic (Greedy + Arrays)
The application leverages a Greedy Algorithm mapping into future scenario Arrays to solve the schedule problem in **O(n)** time complexity per subject projection.

1. **Date Math**: Calculates `future classes = remaining weeks * classes per week`.
2. **Greedy Decision**: At each step into the future `(i = 0 to n)`, we ask: *"Can I afford to bunk today and still geometrically reach my required % by the final class?"*
3. **Local Optimal Choice**: If yes → push `"Bunk"`. If no → push `"Attend"`.
4. **Array Simulation**: The output is an Array mapping exactly when it's statistically safe to skip class vs attend.

## 🔥 Key Features
- **Modern Glass UI**: Deep space layout powered by `framer-motion` for buttery smooth transitions.
- **Dynamic Subject Support**: Track as many individual subjects as you need simultaneously.
- **Animated Metrics**: Real-time counter animations climbing to projected outcomes.
- **Simulation Engine**: Hit **"What if I Bunk Next?"** to instantly fork the timeline and see how the Greedy algorithm adjusts dynamically.

## 🎤 VIVA Explanation Guide (Top Performer)
If asked to explain your project, hit these points:

- **"Why Greedy?"** - Because scheduling attendance is a problem of local optimal choices. We want to take our bunks as early as possible without mathematically barring ourselves from reaching the 75% threshold by the end of the term. The Greedy approach ensures maximum immediate payoff (bunking) while rigidly protecting the global goal (required %).
- **"How does Date Math work?"** - We don't just ask the user "how many classes are left" (because they don't know). We ask for the End Date, subtract the Current Date to find remaining weeks, and multiply by weekly class frequency.
- **"Time Complexity?"** - The array simulation runs in strictly **O(n)** time where `n` is the number of future classes. It is highly optimized and calculates instantly even for long timelines.
- **"Real World Impact"** - This isn't just a toy sorting visualizer — it translates a complex mental load for students into a one-stop automated dashboard. 

## 🛠️ Tech Stack
- React + Vite
- Framer Motion (Physics-based Animations)
- Lucide React (Premium Iconography)
- Date-Fns (Date calculation engine)

## 📁 Installation

```bash
git clone https://github.com/PSG72-cmd/Attendance-Bunk-planner.git
cd Attendance-Bunk-planner
npm install
npm run dev
```

---
*Built by Prathmesh Sharma · [GitHub](https://github.com/PSG72-cmd) · prathmeshsharma72@gmail.com*
