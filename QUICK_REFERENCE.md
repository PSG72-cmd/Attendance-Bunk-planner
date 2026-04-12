# 🎯 Project Quick Reference Card

## Smart Attendance Bunk Planner

**Print this for quick reference!**

---

## ⚡ 5-Minute Setup

```bash
npm install
npm start
# Visit: http://localhost:3000
```

---

## 📖 Read The Docs

```
1. QUICK_START.md         (5 min)
2. README.md              (15 min)
3. VIVA_PREPARATION.md    (30 min)
4. DEPLOYMENT_GUIDE.md    (10 min)
```

---

## 🧠 Algorithm at a Glance

**Greedy Algorithm for Attendance**

```
For each future class:
    if (can bunk safely):
        → BUNK
    else:
        → ATTEND
```

**Complexity**: O(n) time, O(n) space

---

## 💻 File Structure

```
src/
├── App.js                 ← Main component
├── components/
│   ├── InputForm.js      ← User inputs
│   ├── ResultDisplay.js  ← Show results
│   └── ScheduleVisualizer.js ← Calendar
├── utils/
│   └── attendanceLogic.js ← GREEDY ALGORITHM
└── styles/                ← 5 CSS files
```

---

## 🎮 How to Use

```
1. Enter total classes
2. Enter classes attended
3. Set required percentage
4. Click "Calculate Plan"
5. View results
6. See schedule visualization
```

---

## 📊 Features

✅ Current attendance %  
✅ Max classes to bunk  
✅ Min classes to attend  
✅ Optimal schedule (Greedy)  
✅ Random schedule (comparison)  
✅ Calendar visualization  
✅ Timeline view  
✅ Color-coded status  

---

## 🌐 Deploy to Vercel

```bash
# 1. Push to GitHub
git add .
git commit -m "Smart Attendance Bunk Planner"
git branch -M main
git remote add origin https://github.com/PSG72-cmd/Attendance-Bunk-planner.git
git push -u origin main

# 2. Go to vercel.com
# 3. Import your GitHub repo
# 4. Click Deploy
# 5. Get live URL!
```

---

## ✅ Testing Checklist

- [ ] Form inputs work
- [ ] Calculations correct
- [ ] Results display
- [ ] Schedule shows
- [ ] Colors correct
- [ ] Mobile responsive
- [ ] No errors in console

---

## 🎓 Viva Key Points

1. **What is Greedy Algorithm?**
   - Makes locally optimal choice
   - Leads to globally optimal solution

2. **Why use it here?**
   - Simple and efficient
   - Perfect for this problem
   - O(n) complexity

3. **Time Complexity?**
   - O(n) - one pass through classes
   - Each decision is O(1)

4. **Space Complexity?**
   - O(n) - schedule array
   - Same as input size

5. **Real-world app?**
   - Hospital scheduling
   - Production planning
   - Resource optimization

---

## 📱 Preset Test Cases

**Good Attendance:**
- Total: 30, Attended: 25, Required: 75%

**Average Attendance:**
- Total: 40, Attended: 26, Required: 75%

**Critical Attendance:**
- Total: 50, Attended: 25, Required: 75%

---

## 🐛 Quick Fixes

| Issue | Fix |
|-------|-----|
| npm not found | Install Node.js |
| Port in use | Close other app |
| Styles missing | Ctrl+Shift+R |
| Build fails | npm install |

---

## 📞 Important Links

- GitHub: https://github.com/PSG72-cmd/Attendance-Bunk-planner
- Vercel: https://your-project.vercel.app
- React Docs: https://react.dev
- Node.js: https://nodejs.org

---

## 📝 File Purposes

| File | Purpose |
|------|---------|
| attendanceLogic.js | **Greedy Algorithm** |
| InputForm.js | User input & validation |
| ResultDisplay.js | Show calculation results |
| ScheduleVisualizer.js | Calendar & timeline |
| App.js | Main orchestrator |
| *.css | Styling & layout |

---

## 🎯 Next Steps (In Order)

1. ✅ npm install
2. ✅ npm start
3. ✅ Test the app
4. ✅ Read VIVA_PREPARATION.md
5. ✅ Push to GitHub
6. ✅ Deploy to Vercel
7. ✅ Show live link
8. ✅ Present & explain

---

## 💡 Remember

- ✅ Understand the algorithm
- ✅ Test edge cases
- ✅ Check mobile view
- ✅ Know complexity analysis
- ✅ Use live link when sharing
- ✅ Explain Greedy clearly
- ✅ Show working code

---

## 🚀 Status

```
✅ Code Complete
✅ Styled & Responsive
✅ Documented
✅ Ready to Deploy
✅ Production Ready
```

---

**You're ready to go! Good luck! 🎉**

**Print this card for quick reference during setup and viva!**
