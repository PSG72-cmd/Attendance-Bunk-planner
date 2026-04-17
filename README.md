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

The application leverages a Greedy Algorithm mapping into future scenario Arrays to solve the schedule problem in **O(n)** time complexity per subject projection.

1. **Date Math**: Calculates `future classes = remaining weeks * classes per week`.
2. **Greedy Decision**: At each step into the future `(i = 0 to n)`, we ask: *"Can I afford to bunk today and still geometrically reach my required % by the final class?"*
3. **Local Optimal Choice**: If yes → push `"Bunk"`. If no → push `"Attend"`.
4. **Array Simulation**: The output is an Array mapping exactly when it's statistically safe to skip class vs attend.
5. 
## 🛠️ Tech Stack
- React + Vite
- Framer Motion (Physics-based Animations)
- Lucide React (Premium Iconography)
- Date-Fns (Date calculation engine)


---
*Built by Prathmesh Sharma · [GitHub](https://github.com/PSG72-cmd) · prathmeshsharma72@gmail.com*
