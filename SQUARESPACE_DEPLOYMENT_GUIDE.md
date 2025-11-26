# 🌐 TyphoonHub Deployment to Squarespace

## Overview
Your domain `typhoonhub.ca` is registered with Squarespace. To host your TyphoonHub Next.js site, you have two options:

---

## 🎯 Option 1: Use Squarespace Website Builder (Simplest)

### Problem: 
Your current site is built with Next.js/React, which Squarespace's native builder doesn't support directly.

### Solution A: Export Static HTML
Convert your Next.js site to pure HTML/CSS/JS that Squarespace can host.

**Steps:**
1. Build static site: `npm run build` (already done - creates `out` folder)
2. The `out` folder contains pure HTML files
3. You'd need to manually recreate pages in Squarespace or use Code Blocks

**❌ Not Recommended**: This loses React functionality and is very manual.

---

## 🎯 Option 2: Use External Hosting + Domain Pointing (RECOMMENDED)

Since Squarespace is just your domain registrar, point your domain to proper hosting:

### Recommended Hosting Platforms for Next.js:

#### A. Vercel (Best for Next.js)
**Why**: Built by Next.js creators, zero-config deployment

**Steps:**
1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy from your project:
```bash
cd /home/user/webapp
vercel --prod
```

3. Add domain in Vercel Dashboard:
   - Go to your project settings
   - Add domain: `typhoonhub.ca` and `www.typhoonhub.ca`
   - Vercel will provide DNS records

4. Update DNS in Squarespace:
```
Type: A
Host: @
Value: 76.76.21.21

Type: CNAME  
Host: www
Value: cname.vercel-dns.com
```

**✅ RECOMMENDED** - Free tier available, automatic HTTPS, global CDN

---

#### B. Netlify (Alternative)
**Steps:**
1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Deploy:
```bash
cd /home/user/webapp
netlify deploy --prod --dir=out
```

3. Update DNS in Squarespace:
```
Type: A
Host: @
Value: 75.2.60.5

Type: CNAME
Host: www  
Value: [your-site].netlify.app
```

---

#### C. Firebase Hosting (Current Setup)
Your project is already configured for Firebase!

**Steps:**
1. Deploy to Firebase:
```bash
firebase deploy --only hosting
```

2. Add custom domain in Firebase Console:
   - https://console.firebase.google.com/project/typhoon-indie-stream/hosting
   - Click "Add custom domain"
   - Enter: `typhoonhub.ca`

3. Update DNS in Squarespace (Firebase will provide specific IPs):
```
Type: A
Host: @
Value: [Firebase IP addresses - they'll provide multiple]

Type: TXT
Host: @
Value: [Firebase verification code]
```

**✅ ALSO RECOMMENDED** - Your project is already set up for this!

---

## 🚀 Step-by-Step: Vercel Deployment (EASIEST)

### Step 1: Sign up for Vercel
1. Go to: https://vercel.com/signup
2. Sign up with your GitHub account
3. Import your repository: `Selorm4321/typhoonhub`

### Step 2: Configure Project
Vercel will auto-detect Next.js settings:
- Framework Preset: **Next.js**
- Build Command: `npm run build`
- Output Directory: `out`
- Install Command: `npm install`

### Step 3: Deploy
Click "Deploy" - Vercel will build and host your site!

### Step 4: Add Custom Domain
1. In Vercel Dashboard → Settings → Domains
2. Add domain: `typhoonhub.ca`
3. Add domain: `www.typhoonhub.ca`

### Step 5: Update DNS in Squarespace

Go to your Squarespace DNS settings and update:

**Remove or Update:**
```
@ → A → 216.198.7.91  (Change this)
```

**Add These Records:**
```
Type: A
Name: @
Value: 76.76.21.21
TTL: Auto

Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: Auto
```

**Keep These (Email Security):**
```
_domainkey → TXT → v=DKIM1; p=
_dmarc → TXT → v=DMARC1; p=reject; sp=reject; adkim=s; aspf=s
@ → TXT → v=spf1 -all
```

### Step 6: Wait for DNS Propagation
- Vercel will automatically configure HTTPS
- DNS takes 24-48 hours to fully propagate
- Check status at: https://www.whatsmydns.net

---

## 🚀 Alternative: Use GitHub Pages with Custom Domain

Since you have GitHub Actions set up:

1. **Update next.config.ts** (already has `output: 'export'` ✓)

2. **Add GitHub Pages workflow:**
```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
```

3. **Enable GitHub Pages** in repo settings
4. **Update DNS in Squarespace:**
```
Type: A
Name: @
Value: 185.199.108.153
Value: 185.199.109.153
Value: 185.199.110.153
Value: 185.199.111.153

Type: CNAME
Name: www
Value: selorm4321.github.io
```

---

## 📋 Current DNS Records (Squarespace)

```
HOST          TYPE    VALUE
─────────────────────────────────────────
_domainkey    TXT     v=DKIM1; p=
_dmarc        TXT     v=DMARC1; p=reject; sp=reject; adkim=s; aspf=s
@             TXT     v=spf1 -all
www           CNAME   eq31feedc46dd489f.vercel-dns.com
@             A       216.198.7.91
@             TXT     fsh-claim=002-02-2273ab2b-f82b-4f37-8dac-5e3a38c6e7b7
```

**Note:** You already have a CNAME pointing to Vercel! Your `www` subdomain might already be connected to a Vercel project.

---

## ✅ Recommended Approach

**I recommend Vercel because:**
1. ✅ Your DNS already has Vercel CNAME for `www`
2. ✅ Zero configuration for Next.js
3. ✅ Automatic HTTPS and global CDN
4. ✅ Free tier is generous
5. ✅ No build config needed
6. ✅ GitHub integration available

**Quick Start:**
```bash
# Install Vercel CLI
npm install -g vercel

# Login and deploy
cd /home/user/webapp
vercel login
vercel --prod

# Follow prompts to link your domain
```

Then just update the A record in Squarespace to point `@` to Vercel's IP: `76.76.21.21`

---

## 🆘 Need Help?

- **Vercel Docs**: https://vercel.com/docs/concepts/projects/domains
- **Squarespace DNS**: https://support.squarespace.com/hc/en-us/articles/205812378
- **DNS Propagation Check**: https://www.whatsmydns.net

---

**Your site is ready to deploy! Choose Vercel for the easiest experience.** 🚀
