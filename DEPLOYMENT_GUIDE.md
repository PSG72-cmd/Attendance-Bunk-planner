# 📤 Deployment Guide

## Push to GitHub & Deploy to Vercel

---

## Part 1: Create GitHub Repository

### Step 1: Create Repo on GitHub

1. Go to [github.com](https://github.com)
2. Click **"New"** button (top left)
3. Fill in:
   - **Repository name**: `smart-attendance-bunk-planner`
   - **Description**: Smart Attendance Bunk Planner using Greedy Algorithm
   - **Visibility**: Public (for easy sharing) or Private
   - Click **Create Repository**

### Step 2: Initialize Git Locally

```bash
# Navigate to project folder
cd d:\dsa\ project

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Smart Attendance Bunk Planner - React app with Greedy Algorithm"

# Rename branch to main
git branch -M main

# Add remote
git remote add origin https://github.com/PSG72-cmd/Attendance-Bunk-planner.git

# Push to GitHub
git push -u origin main
```

### Step 3: Verify on GitHub

1. Visit your repository URL
2. Should see all your files
3. README.md should display nicely

---

## Part 2: Deploy to Vercel

### Option A: Using Vercel CLI (Faster)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# During deployment:
# 1. Link to GitHub account
# 2. Select framework: React
# 3. Confirm build command: npm run build
# 4. Wait for deployment

# You'll get a URL like: https://smart-attendance-bunk-planner-abc123.vercel.app
```

### Option B: Using Vercel Website (Easiest)

1. Go to [vercel.com](https://vercel.com)
2. Sign up or login with GitHub
3. Click **"New Project"**
4. Select your `smart-attendance-bunk-planner` repository
5. Click **Import**
6. **Framework Preset**: React
7. Click **Deploy**
8. Wait ~2-3 minutes
9. Get your live URL!

### Option C: Using GitHub Integration (Recommended)

1. Visit [vercel.com/new](https://vercel.com/new)
2. **Import Git Repository**
3. Enter: `https://github.com/PSG72-cmd/Attendance-Bunk-planner`
4. Click **Continue**
5. Leave default settings
6. Click **Deploy**
7. Auto-deploys on every push!

---

## Vercel Configuration

Your `vercel.json` is already set up with:

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm start",
  "installCommand": "npm install",
  "framework": "react",
  "outputDirectory": "build"
}
```

No changes needed!

---

## Environment Variables (Optional)

If you need environment variables on Vercel:

1. Go to **Project Settings** → **Environment Variables**
2. Add variables from your `.env` file
3. Redeploy

---

## Continuous Deployment

After deployment setup:

```bash
# Just push to GitHub, and Vercel auto-deploys!
git add .
git commit -m "Update feature"
git push origin main

# Your live site updates automatically in 1-2 minutes
```

---

## Check Deployment Status

### Vercel Dashboard:
- Visit [vercel.com/dashboard](https://vercel.com/dashboard)
- Click your project
- See all deployments
- View logs if needed

### Your Live Site:
- Click "Visit" button in dashboard
- Or type the URL directly
- Should load instantly!

---

## Share Your Project

```
✅ Live URL: https://your-project.vercel.app
✅ GitHub: https://github.com/PSG72-cmd/Attendance-Bunk-planner
✅ Can share link directly with professor
✅ Works on mobile too!
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Build fails on Vercel | Check build logs in Vercel dashboard |
| Site shows 404 | Wait a minute and refresh |
| Missing environment variables | Add to Vercel project settings |
| Very slow build | Delete node_modules locally, reinstall |
| Favicon warning | Already included in public/index.html |

---

## Post-Deployment Checklist

- ✅ Project shows on GitHub
- ✅ Website loads at Vercel URL
- ✅ Can enter attendance data
- ✅ Results calculate correctly
- ✅ Schedule visualizes properly
- ✅ Responsive on mobile
- ✅ All pages accessible
- ✅ No console errors

---

## Update After Deployment

### To make changes:

```bash
# Make changes locally
npm start  # Test locally

# When satisfied:
git add .
git commit -m "Fix/Update description"
git push origin main

# Wait 1-2 minutes → Vercel auto-deploys!
```

---

## Advanced: Custom Domain (Optional)

To use your own domain like `yourdomain.com`:

1. In Vercel Dashboard → Project Settings
2. Go to **Domains**
3. Add your domain
4. Update DNS records (Vercel provides guide)
5. Takes 24-48 hours to propagate

---

## Keep Your Code Safe

### What NOT to commit:
- `node_modules/` (automatically ignored)
- `.env` with secrets (already in .gitignore)
- `build/` folder (rebuilt on Vercel)

### What TO commit:
- Source code
- Configuration files
- Documentation (.md files)
- package.json

---

## Performance Monitoring

On Vercel Dashboard:
- **Analytics**: Page views, response times
- **Speed Insights**: Web vitals
- **Build Time**: Monitor for regression
- **Bandwidth**: Usage tracking

---

## Final Tips

1. **Always test locally first** before pushing
2. **Write meaningful commit messages**
3. **Test on multiple devices** before deployment
4. **Share live URL** not GitHub link with friends
5. **Update README** with live link

---

## Example Deployment Workflow

```bash
# 1. Make changes
nano src/utils/attendanceLogic.js
# or edit in VS Code

# 2. Test locally
npm start
# Test in browser, verify functionality

# 3. Stop server
# Ctrl + C

# 4. Commit and push
git add .
git commit -m "Improve algorithm efficiency"
git push origin main

# 5. Wait for Vercel to deploy (1-3 minutes)
# Check Vercel dashboard or get email notification

# 6. Access live site
# URL: https://your-project.vercel.app

# 7. Share with professor!
```

---

**Your project is now live and can be shared anywhere! 🎉**

**Live Sites to Share:**
- To professor: `https://your-project.vercel.app`
- On resume: Your GitHub + Live link
- In email: Direct link or both
- On LinkedIn: Link to GitHub repo

---

## Support

If deployment fails:
1. Check Vercel build logs
2. Verify package.json has all dependencies
3. Ensure `.gitignore` is correct
4. Try rebuilding on Vercel dashboard
5. Contact Vercel support

**You've successfully deployed your DSA project! Congratulations! 🚀**
