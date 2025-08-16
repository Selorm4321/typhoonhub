# 🔥 Firebase Deployment Guide for Complete Investment Page

## 🎯 **Quick Deployment Options**

### **Option 1: GitHub Actions Manual Trigger (Recommended)**

1. **Go to your GitHub repository**: 
   `https://github.com/Selorm4321/typhoonhub/actions`

2. **Look for workflow**: "Deploy to Firebase Hosting on merge"

3. **Click "Run workflow"**:
   - Select branch: `main` 
   - Click "Run workflow" button

4. **Monitor deployment**: Watch the build process complete

5. **Result**: Your complete investment page will be live at `typhoonhub.ca/invest`

---

### **Option 2: Firebase CLI (Local)**

If you have Firebase CLI access:

```bash
# 1. Login to Firebase
firebase login

# 2. Build project (use our optimized script)
node scripts/build-investment-page.js

# 3. Deploy to hosting
firebase deploy --only hosting

# Result: Live at typhoonhub.ca
```

---

### **Option 3: Firebase Console Direct Upload**

1. **Go to Firebase Console**: 
   `https://console.firebase.google.com/project/typhoon-indie-stream/hosting`

2. **Click "Add another site"** or manage existing hosting

3. **Upload the `out` folder** contents manually

4. **Connect your domain** `typhoonhub.ca`

---

## 🚀 **What Will Be Deployed**

Your complete professional investment page with:

### ✨ **Investment Tiers**
- **Bronze ($100)**: Digital copy, credits, exclusive updates
- **Silver ($500)**: Bronze + signed poster + premiere tickets  
- **Gold ($1,500)**: Silver + producer credit + set visit

### 💳 **Payment Integration**
- Stripe checkout sessions
- Professional payment flow
- Success/cancel handling

### 📊 **Advanced Features**
- Investment progress bars
- Featured project: "Mary and Rose"
- FAQ section for investors
- Registration modal
- Mobile responsive design

---

## 🌐 **Expected Result**

After deployment:
- **Main site**: `https://typhoonhub.ca` 
- **Investment page**: `https://typhoonhub.ca/invest`

The investment page will replace your current simple PayPal setup with a comprehensive, professional investment platform.

---

## 🔧 **Troubleshooting**

**If GitHub Actions fails**:
- Check repository permissions (Actions → General → Workflow permissions)
- Verify `FIREBASE_SERVICE_ACCOUNT_TYPHOON_INDIE_STREAM` secret exists

**If manual upload needed**:
- Use the `out` folder created by our build script
- Upload contents to Firebase hosting

**For immediate testing**:
- Current working version: `https://9002-i3c1ttyscshexztp4925n-6532622b.e2b.dev/invest`

---

## 📞 **Next Steps**

1. **Try Option 1 first** (GitHub Actions manual trigger)
2. **Monitor the deployment** in GitHub Actions tab
3. **Test the live site** at `typhoonhub.ca/invest`
4. **Configure Stripe keys** for production payments

Your professional investment platform is ready to go live! 🎬💰