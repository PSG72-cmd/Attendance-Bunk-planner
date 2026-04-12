# 🚀 Quick Start Guide

## Smart Attendance Bunk Planner

Get your project running in 5 minutes!

---

## Step 1: Clone or Download

```bash
# If cloning from GitHub
git clone https://github.com/PSG72-cmd/Attendance-Bunk-planner.git
cd Attendance-Bunk-planner

# Or use the provided folder
# Just navigate to: d:\dsa project
```

---

## Step 2: Install Dependencies

```bash
npm install
```

Wait for all packages to install. You'll see messages like:
```
added 1234 packages in 2m 30s
```

---

## Step 3: Start Development Server

```bash
npm start
```

A browser window will automatically open at `http://localhost:3000`

If it doesn't open automatically, visit the URL in your browser.

---

## Step 4: Test the App

### Try These Immediately:

**Test Case 1: Good Attendance**
- Total Classes: 30
- Classes Attended: 25
- Required: 75%
→ See you can safely bunk 5 classes

**Test Case 2: Average Attendance**
- Total Classes: 40
- Classes Attended: 26
- Required: 75%
→ Lower margin for error

**Test Case 3: Critical Attendance**
- Total Classes: 50
- Classes Attended: 25
- Required: 75%
→ Must attend carefully

Or use **Quick Presets** for instant testing!

---

## Step 5: View Features

1. **Results Tab**
   - See current attendance %
   - Max classes to bunk
   - Min classes to attend
   - Color-coded status

2. **Comparison Tab**
   - Optimal strategy (Greedy)
   - Random strategy
   - Side-by-side projection

3. **Schedule Tab**
   - Calendar view
   - Timeline view
   - Toggle between strategies

---

## Common Commands

```bash
# Start development
npm start

# Build for production
npm run build

# Run tests (if added)
npm test

# Stop the server
ctrl + c
```

---

## File Structure Quick Reference

```
smart-attendance-bunk-planner/
├── src/
│   ├── components/          ← React components
│   ├── utils/
│   │   └── attendanceLogic.js  ← Greedy Algorithm here!
│   ├── styles/              ← CSS files
│   └── App.js               ← Main app
├── public/
│   └── index.html           ← HTML file
└── package.json             ← Dependencies
```

---

## Deploy to Vercel (Optional)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts and get your live URL!
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| `npm: command not found` | Install Node.js from nodejs.org |
| Port 3000 in use | `npm start` will ask to use different port |
| Styling not showing | Hard refresh: Ctrl+Shift+R |
| Build fails | Delete node_modules and reinstall |

---

## Next Steps

1. ✅ Run the app
2. ✅ Test with different scenarios
3. ✅ Read [README.md](./README.md) for detailed docs
4. ✅ Study [VIVA_PREPARATION.md](./VIVA_PREPARATION.md) 
5. ✅ Deploy to Vercel
6. ✅ Show to your professor!

---

## Tips for Success

- 💡 **Understand the Algorithm**: Read attendanceLogic.js comments
- 💡 **Try Edge Cases**: What if attended > needed?
- 💡 **Explain the UI**: Know what each component does
- 💡 **Practice Viva**: Use VIVA_PREPARATION.md
- 💡 **Deploy Early**: Don't wait till last minute

---

**You're all set! Happy coding! 🎉**
