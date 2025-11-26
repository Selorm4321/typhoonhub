# 🌐 Squarespace DNS Setup for typhoonhub.ca

## Current DNS Records (What You Have Now)

```
┌─────────────┬──────┬────────────────────────────────────────────┐
│ HOST        │ TYPE │ VALUE                                      │
├─────────────┼──────┼────────────────────────────────────────────┤
│ _domainkey  │ TXT  │ v=DKIM1; p=                                │ ← KEEP (Email)
│ _dmarc      │ TXT  │ v=DMARC1; p=reject; sp=reject...           │ ← KEEP (Email)
│ @           │ TXT  │ v=spf1 -all                                │ ← KEEP (Email)
│ @           │ TXT  │ fsh-claim=002-02-2273ab2b-f82b...          │ ← KEEP
│ www         │ CNAME│ eq31feedc46dd489f.vercel-dns.com           │ ← KEEP (Already correct!)
│ @           │ A    │ 216.198.7.91                               │ ← CHANGE THIS
└─────────────┴──────┴────────────────────────────────────────────┘
```

---

## ✏️ What You Need to Change

### Option 1: Vercel Hosting (RECOMMENDED)

**Only change this one record:**

```
┌──────┬──────┬──────────────────────────────┐
│ HOST │ TYPE │ NEW VALUE                    │
├──────┼──────┼──────────────────────────────┤
│ @    │ A    │ 76.76.21.21                  │  ← Change from 216.198.7.91
└──────┴──────┴──────────────────────────────┘
```

**Your www record is already perfect!** It already points to Vercel.

---

### Option 2: Netlify Hosting

**Change this record:**

```
┌──────┬──────┬──────────────────────────────┐
│ HOST │ TYPE │ NEW VALUE                    │
├──────┼──────┼──────────────────────────────┤
│ @    │ A    │ 75.2.60.5                    │
└──────┴──────┴──────────────────────────────┘
```

**And update www:**

```
┌──────┬───────┬────────────────────────────────────┐
│ HOST │ TYPE  │ NEW VALUE                          │
├──────┼───────┼────────────────────────────────────┤
│ www  │ CNAME │ [your-site-name].netlify.app       │
└──────┴───────┴────────────────────────────────────┘
```

---

### Option 3: Firebase Hosting

**Change this record:**

```
┌──────┬──────┬──────────────────────────────┐
│ HOST │ TYPE │ NEW VALUE (Add all 4)        │
├──────┼──────┼──────────────────────────────┤
│ @    │ A    │ 151.101.1.195                │
│ @    │ A    │ 151.101.65.195               │
│ @    │ A    │ 151.101.129.195              │
│ @    │ A    │ 151.101.193.195              │
└──────┴──────┴──────────────────────────────┘
```

**Add verification TXT record (Firebase will provide):**

```
┌──────┬──────┬──────────────────────────────────────┐
│ HOST │ TYPE │ VALUE                                │
├──────┼──────┼──────────────────────────────────────┤
│ @    │ TXT  │ [Firebase verification code]         │
└──────┴──────┴──────────────────────────────────────┘
```

---

## 📝 Step-by-Step: Update DNS in Squarespace

### Step 1: Log into Squarespace
1. Go to: https://account.squarespace.com/domains
2. Click on **typhoonhub.ca**
3. Click **DNS Settings**

### Step 2: Find the A Record
Look for the record with:
- Host: `@`
- Type: `A`
- Value: `216.198.7.91`

### Step 3: Edit the A Record
1. Click the **Edit** (pencil) icon next to the A record
2. Change the value to: **76.76.21.21** (for Vercel)
3. Click **Save**

### Step 4: Verify www CNAME
Check that your www CNAME record shows:
- Host: `www`
- Type: `CNAME`
- Value: `eq31feedc46dd489f.vercel-dns.com`

**✅ This is already correct!** If it's there, don't change it.

### Step 5: Save Changes
Click **Save** at the bottom of the DNS settings page

---

## ⏱️ DNS Propagation Timeline

```
Immediately:     Your changes are saved in Squarespace
15-30 minutes:   Many users will see the new site
1-2 hours:       Most users will see the new site  
24-48 hours:     100% worldwide propagation complete
```

**Check propagation status:** https://www.whatsmydns.net/#A/typhoonhub.ca

---

## ✅ Verification Checklist

After updating DNS, wait 30 minutes then check:

- [ ] https://typhoonhub.ca loads (may take longer)
- [ ] https://www.typhoonhub.ca loads (should work faster)
- [ ] HTTPS certificate is active (green padlock)
- [ ] All pages load correctly
- [ ] Films play without login
- [ ] Newsletter form works

---

## 🚨 Important: DON'T DELETE THESE

**Keep all email security records:**
```
_domainkey → TXT → v=DKIM1; p=
_dmarc     → TXT → v=DMARC1; p=reject; sp=reject; adkim=s; aspf=s
@          → TXT → v=spf1 -all
```

**Keep verification record:**
```
@          → TXT → fsh-claim=002-02-2273ab2b-f82b-4f37-8dac-5e3a38c6e7b7
```

Deleting these could break your email or domain verification.

---

## 🎯 Summary: What Changes?

**Before:**
```
typhoonhub.ca (@ A record) → 216.198.7.91 (Unknown/Old host)
www.typhoonhub.ca          → Vercel (Already correct!)
```

**After (Vercel):**
```
typhoonhub.ca (@ A record) → 76.76.21.21 (Vercel)
www.typhoonhub.ca          → Vercel (No change needed)
```

**Result:**
Both `typhoonhub.ca` and `www.typhoonhub.ca` will point to your new Vercel-hosted site!

---

## 🆘 Troubleshooting

**"Site not loading after 1 hour"**
- Check DNS propagation: https://www.whatsmydns.net
- Clear your browser cache (Ctrl+Shift+Delete)
- Try incognito/private browsing mode
- Try accessing from mobile data (different DNS)

**"www works but typhoonhub.ca doesn't"**
- DNS propagation for @ records takes longer
- Wait full 24-48 hours
- The @ record change affects more DNS servers

**"HTTPS not working"**
- Vercel auto-provisions SSL certificates
- Can take 30-60 minutes after DNS is verified
- Vercel will email you when SSL is ready

---

## 📞 Support Links

- **Squarespace DNS Help**: https://support.squarespace.com/hc/en-us/articles/205812378
- **Vercel Custom Domains**: https://vercel.com/docs/concepts/projects/domains
- **DNS Propagation Checker**: https://www.whatsmydns.net

---

**Ready to go live? Change that one A record and you're done!** 🚀
