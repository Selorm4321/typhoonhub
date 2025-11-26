# 🌐 TyphoonHub Domain Setup Guide

## Current Domain Configuration
**Domain**: `typhoonhub.ca`  
**Registrar**: Squarespace  
**Current DNS Records**:
- `www` → CNAME → `eq31feedc46dd489f.vercel-dns.com`
- `@` → A → `216.198.7.91`
- Email Security TXT records configured

---

## 🚀 Option 1: Firebase Hosting (Current Setup - RECOMMENDED)

Your app is already configured for Firebase with static export. Follow these steps:

### Step 1: Build the Project
```bash
cd /home/user/webapp
npm run build
```

This creates the `out` folder with your static site.

### Step 2: Deploy to Firebase

**Method A: Using GitHub Actions (Easiest)**
1. Go to: https://github.com/Selorm4321/typhoonhub/actions
2. Find workflow: "Deploy to Firebase Hosting on merge"
3. Click "Run workflow" → Select `genspark_ai_developer` or `main` branch
4. Click "Run workflow" button
5. Wait for deployment to complete

**Method B: Using Firebase CLI**
```bash
# Install Firebase CLI if not installed
npm install -g firebase-tools

# Login to Firebase
firebase login

# Deploy
firebase deploy --only hosting
```

### Step 3: Connect Domain in Firebase Console

1. Go to Firebase Console: https://console.firebase.google.com/project/typhoon-indie-stream/hosting
2. Click "Add custom domain"
3. Enter: `typhoonhub.ca`
4. Firebase will provide DNS records to add

### Step 4: Update DNS Records in Squarespace

Firebase will give you records like:
```
Type: A
Host: @
Value: [Firebase IP addresses]

Type: TXT
Host: @
Value: [Firebase verification code]
```

Update these in your Squarespace DNS settings.

---

## 🔄 Option 2: Vercel Deployment

Since you already have Vercel in your DNS, you can use Vercel instead:

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Deploy to Vercel
```bash
cd /home/user/webapp
vercel --prod
```

### Step 3: Add Domain in Vercel Dashboard
1. Go to your Vercel dashboard
2. Select the project
3. Go to Settings → Domains
4. Add `typhoonhub.ca` and `www.typhoonhub.ca`

### Step 4: Update DNS (Already Configured!)
Your current DNS already points to Vercel:
- `www` → `eq31feedc46dd489f.vercel-dns.com` ✅

You may need to add:
```
Type: A
Host: @
Value: 76.76.21.21
```

---

## 🎯 Option 3: Keep Current Setup & Update Content

If your site is already live on Firebase/Vercel, simply rebuild and redeploy:

### Quick Rebuild & Deploy
```bash
# Build the updated site
npm run build

# Deploy using your current method
firebase deploy --only hosting
# OR
vercel --prod
```

---

## ✅ Recommended Approach

**I recommend Option 1 (Firebase)** because:
- ✅ Already configured in your Next.js config (`output: 'export'`)
- ✅ Firebase project exists: `typhoon-indie-stream`
- ✅ Static export perfect for your use case
- ✅ GitHub Actions workflow already set up
- ✅ Free hosting for static sites

---

## 🔧 DNS Records Summary

### Current Records (Keep These):
```
_domainkey → TXT → v=DKIM1; p=
_dmarc → TXT → v=DMARC1; p=reject; sp=reject; adkim=s; aspf=s
@ → TXT → v=spf1 -all
www → CNAME → eq31feedc46dd489f.vercel-dns.com
@ → A → 216.198.7.91
@ → TXT → fsh-claim=002-02-2273ab2b-f82b-4f37-8dac-5e3a38c6e7b7
```

### Add After Firebase Setup:
Firebase will provide specific A and TXT records. Add those while keeping email security records.

---

## 🚨 Important Notes

1. **Don't delete email security records** (DKIM, DMARC, SPF)
2. **DNS propagation** takes 24-48 hours
3. **Test with www first** before updating apex domain
4. **Backup current DNS** settings before making changes

---

## 🎬 Next Steps

1. **Merge your PR** to main branch
2. **Trigger GitHub Actions** deployment
3. **Add custom domain** in Firebase Console
4. **Update DNS records** in Squarespace
5. **Wait for propagation**
6. **Test**: Visit https://typhoonhub.ca

Your rebuilt homepage will be live! 🚀
