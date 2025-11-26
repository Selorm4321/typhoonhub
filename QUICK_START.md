# 🚀 TyphoonHub Quick Start Guide

## Your Domain: typhoonhub.ca (Squarespace)

---

## ⚡ FASTEST Way to Go Live (3 Steps)

### Step 1: Deploy to Vercel (5 minutes)

Run this command from your project directory:

```bash
./deploy-to-vercel.sh
```

Or manually:
```bash
npm install -g vercel
cd /home/user/webapp
vercel --prod
```

**Follow the prompts:**
- Set up and deploy? **Y**
- Project name? **typhoonhub**
- Directory? **./***
- Build command? **npm run build**
- Output directory? **out**

✅ **Your site is now live on a Vercel URL!**

---

### Step 2: Add Domain in Vercel (2 minutes)

1. Go to: https://vercel.com/dashboard
2. Find your **typhoonhub** project
3. Click **Settings** → **Domains**
4. Add **typhoonhub.ca**
5. Add **www.typhoonhub.ca**

Vercel will show you DNS instructions (but we already know what to do!)

---

### Step 3: Update ONE DNS Record in Squarespace (1 minute)

1. Go to: https://account.squarespace.com/domains
2. Click **typhoonhub.ca** → **DNS Settings**
3. Find the **@ A Record** with value `216.198.7.91`
4. Edit it to: **76.76.21.21**
5. Click **Save**

**That's it!** Your www CNAME is already pointing to Vercel correctly.

---

## ⏱️ Timeline

```
Now:         Site live on Vercel temporary URL
5 minutes:   DNS starts propagating
30 minutes:  www.typhoonhub.ca works
1-2 hours:   typhoonhub.ca works
24-48 hours: Fully propagated worldwide
```

---

## ✅ What You Built

- ✨ Beautiful newsletter subscription section
- 🎬 Browse All Shows with film carousel
- 🔓 No login required to watch movies
- 📱 Fully responsive mobile design
- 🎨 Dark theme with red brand colors
- ⚡ Lightning fast static site

---

## 📋 Current DNS Records

```
HOST        TYPE   VALUE                              STATUS
─────────────────────────────────────────────────────────────
@           A      216.198.7.91                       ← CHANGE to 76.76.21.21
www         CNAME  eq31feedc46dd489f.vercel-dns.com   ✅ PERFECT!
_domainkey  TXT    v=DKIM1; p=                        ✅ KEEP
_dmarc      TXT    v=DMARC1; p=reject...              ✅ KEEP
@           TXT    v=spf1 -all                        ✅ KEEP
@           TXT    fsh-claim=002-02...                ✅ KEEP
```

**Only change ONE record!** The @ A record value.

---

## 🔗 Important Links

- **Your PR**: https://github.com/Selorm4321/typhoonhub/pull/10
- **Live Preview**: https://9002-ibkkvrfppwymw2vbpbw3a-583b4d74.sandbox.novita.ai
- **Squarespace DNS**: https://account.squarespace.com/domains
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Check DNS**: https://www.whatsmydns.net/#A/typhoonhub.ca

---

## 📚 Detailed Guides Available

- `SQUARESPACE_DNS_SETUP.md` - Visual DNS setup guide
- `SQUARESPACE_DEPLOYMENT_GUIDE.md` - All hosting options
- `DEPLOYMENT_SUMMARY.md` - Complete technical summary
- `deploy-to-vercel.sh` - Automated deployment script

---

## 🆘 Need Help?

**Site not loading?**
1. Check DNS propagation: https://www.whatsmydns.net
2. Wait the full 24-48 hours
3. Try www.typhoonhub.ca first (usually faster)
4. Clear browser cache or use incognito mode

**Deployment issues?**
1. Make sure Node.js is installed: `node --version`
2. Ensure you're in project directory: `cd /home/user/webapp`
3. Try manual Vercel deploy: `vercel --prod`

---

## 🎬 You're Ready!

Your rebuilt TyphoonHub is production-ready and waiting to go live at **typhoonhub.ca**!

Just run `./deploy-to-vercel.sh` and update that one DNS record. 🚀

---

**Made with ❤️ for TyphoonHub**
