# 🚀 Deploy TyphoonHub to typhoonhub.ca

## Current Status
- ✅ Domain: **typhoonhub.ca** (registered with Squarespace)
- ✅ Firebase Project: **typhoon-indie-stream**
- ✅ Code: Ready to deploy
- ✅ Videos: Firebase Storage configured
- ✅ Build: Static export configured

---

## 🎯 Quick Deployment (3 Steps)

### Step 1: Build the Production Site

```bash
cd /home/user/webapp
npm run build
```

This creates the `out` folder with all static files.

### Step 2: Deploy to Firebase Hosting

**Option A - Using GitHub Actions (Recommended):**

1. Go to: https://github.com/Selorm4321/typhoonhub/actions
2. Find workflow: "Deploy to Firebase Hosting on merge"
3. Merge your PR to main branch
4. Deployment happens automatically!

**Option B - Using Firebase CLI:**

```bash
# Login to Firebase (if not already)
firebase login

# Deploy to hosting
firebase deploy --only hosting
```

### Step 3: Connect typhoonhub.ca Domain

1. Go to Firebase Console: https://console.firebase.google.com/project/typhoon-indie-stream/hosting
2. Click **"Add custom domain"**
3. Enter: **typhoonhub.ca**
4. Firebase will provide DNS records

---

## 📋 DNS Configuration in Squarespace

After Firebase provides the records, update your Squarespace DNS:

### Current DNS (What you have now):
```
HOST        TYPE    VALUE                                STATUS
─────────────────────────────────────────────────────────────────
@           A       216.198.7.91                         ❌ OLD
www         CNAME   eq31feedc46dd489f.vercel-dns.com    ⚠️  Vercel
```

### Update to Firebase (What you need):

**Firebase will provide specific IPs. Example:**
```
HOST        TYPE    VALUE                                ACTION
─────────────────────────────────────────────────────────────────
@           A       151.101.1.195                        ✅ ADD
@           A       151.101.65.195                       ✅ ADD
@           A       151.101.129.195                      ✅ ADD
@           A       151.101.193.195                      ✅ ADD
```

**If you prefer Vercel (simpler):**
```
HOST        TYPE    VALUE                                ACTION
─────────────────────────────────────────────────────────────────
@           A       76.76.21.21                          ✅ CHANGE
www         CNAME   cname.vercel-dns.com                 ✅ UPDATE
```

### Keep These (Email Security):
```
_domainkey  TXT     v=DKIM1; p=                          ✅ KEEP
_dmarc      TXT     v=DMARC1; p=reject...                ✅ KEEP
@           TXT     v=spf1 -all                          ✅ KEEP
@           TXT     fsh-claim=002-02...                  ✅ KEEP
```

---

## 🌐 Alternative: Deploy to Vercel (Faster Setup)

If Firebase domain setup is complex, use Vercel (your DNS already points there):

### Deploy to Vercel:

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd /home/user/webapp
vercel --prod
```

### Add Domain in Vercel:
1. Go to: https://vercel.com/dashboard
2. Select your project
3. Settings → Domains
4. Add: **typhoonhub.ca**
5. Add: **www.typhoonhub.ca**

### Update DNS in Squarespace:
```
HOST    TYPE    VALUE               TTL
────────────────────────────────────────
@       A       76.76.21.21         Auto
```

Your www CNAME is already correct for Vercel!

---

## ✅ Verification Steps

After deployment and DNS update:

### 1. Check DNS Propagation
Visit: https://www.whatsmydns.net/#A/typhoonhub.ca

### 2. Test Your Site
- Main domain: https://typhoonhub.ca
- With www: https://www.typhoonhub.ca

### 3. Test Features
- ✅ Homepage loads
- ✅ Browse page shows all films
- ✅ YouTube videos play
- ✅ Firebase videos play
- ✅ TyphoonPod page loads
- ✅ No login required for videos

---

## 📊 Current Site Status

### Pages Ready:
- ✅ Homepage (newsletter + featured films)
- ✅ Browse (all films grid)
- ✅ Watch (video player - YouTube + Firebase)
- ✅ Live TV (continuous streaming)
- ✅ TyphoonPod (podcast landing page)
- ✅ Global Cinema (podcast player)
- ✅ Contact, Submit, etc.

### Videos Ready:
- ✅ 10 YouTube films
- ✅ 3 Firebase Storage films (Legends of Legacy)
- ✅ 1 Podcast audio (Global Cinema)

### Features:
- ✅ No login required to watch
- ✅ Dark theme with red branding
- ✅ Fully responsive
- ✅ SEO optimized
- ✅ Static export (fast loading)

---

## 🔧 Build Configuration

Your site is configured for static export:

**next.config.ts:**
```typescript
{
  output: 'export',
  trailingSlash: true,
  distDir: 'out',
  images: { unoptimized: true }
}
```

This ensures Firebase Hosting compatibility.

---

## 🆘 Troubleshooting

### "Build fails"
```bash
# Clean and rebuild
rm -rf .next out
npm install
npm run build
```

### "DNS not updating"
- Wait 24-48 hours for full propagation
- Test with www first (usually faster)
- Clear browser cache (Ctrl+Shift+Delete)

### "Firebase domain verification fails"
- Ensure you added the TXT record exactly as provided
- Wait 15 minutes after adding DNS records
- Use Firebase Console to verify

### "Videos not playing"
- Check Firebase Storage rules
- Ensure video URLs are public
- Test in incognito mode

---

## 📞 Support Resources

- **Firebase Hosting Docs**: https://firebase.google.com/docs/hosting
- **Squarespace DNS Guide**: https://support.squarespace.com/hc/en-us/articles/205812378
- **Vercel Custom Domains**: https://vercel.com/docs/concepts/projects/domains
- **DNS Checker**: https://www.whatsmydns.net

---

## 🎬 Next Steps

1. **Merge your PR**: https://github.com/Selorm4321/typhoonhub/pull/10
2. **Choose deployment method**: Firebase (automatic) or Vercel (manual)
3. **Update DNS**: Change @ A record in Squarespace
4. **Wait for propagation**: 1-48 hours
5. **Test live site**: Visit https://typhoonhub.ca
6. **Celebrate!** 🎉

---

## 📝 Post-Deployment Checklist

After typhoonhub.ca is live:

- [ ] Test all video playback (YouTube + Firebase)
- [ ] Verify newsletter signup works
- [ ] Check mobile responsiveness
- [ ] Test all navigation links
- [ ] Verify SSL certificate is active
- [ ] Update Google Analytics (if configured)
- [ ] Share with team/users!

---

**Your TyphoonHub is ready to go live at typhoonhub.ca!** 🚀

Domain: https://typhoonhub.ca
Firebase Project: typhoon-indie-stream
GitHub Repo: https://github.com/Selorm4321/typhoonhub
Pull Request: https://github.com/Selorm4321/typhoonhub/pull/10
