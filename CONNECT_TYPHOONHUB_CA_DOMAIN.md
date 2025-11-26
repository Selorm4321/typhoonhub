# 🌐 Connect typhoonhub.ca Domain to Firebase Hosting

## 🎉 Deployment Status

✅ **Site Successfully Deployed to Firebase Hosting!**

- **Firebase URL 1:** https://typhoon-indie-stream.web.app
- **Firebase URL 2:** https://typhoon-indie-stream.firebaseapp.com
- **Last Deployed:** November 26, 2025 at 14:01:32 GMT
- **Deployment Method:** GitHub Actions (automatic on merge to main)
- **Status:** HTTP 200 - Site is LIVE! 🚀

---

## 📝 Next Step: Connect Custom Domain

Your site is live on Firebase, but you need to connect **typhoonhub.ca** domain. Here's how:

---

## 🔗 Method 1: Firebase Console (Recommended)

### Step 1: Add Custom Domain in Firebase

1. **Go to Firebase Console:**
   - URL: https://console.firebase.google.com/project/typhoon-indie-stream/hosting
   - Navigate to: **Hosting** section

2. **Click "Add custom domain"** button

3. **Enter your domain:**
   - Type: `typhoonhub.ca`
   - Click "Continue"

4. **Verify Ownership:**
   - Firebase will provide a **TXT record**
   - Example:
     ```
     Type: TXT
     Host: @
     Value: firebase=typhoon-indie-stream-[verification-code]
     TTL: Auto
     ```

5. **Get DNS Records:**
   - After verification, Firebase provides **A records**
   - Example:
     ```
     Type: A
     Host: @
     Value: 151.101.1.195
     TTL: Auto
     
     Type: A
     Host: @
     Value: 151.101.65.195
     TTL: Auto
     
     Type: A
     Host: @
     Value: 151.101.129.195
     TTL: Auto
     
     Type: A
     Host: @
     Value: 151.101.193.195
     TTL: Auto
     ```

### Step 2: Update DNS in Squarespace

1. **Login to Squarespace:**
   - Go to: https://account.squarespace.com/domains
   - Select domain: **typhoonhub.ca**
   - Click "DNS Settings"

2. **Add Firebase TXT Record:**
   ```
   Type: TXT
   Host: @
   Value: [paste Firebase verification code]
   TTL: Auto
   ```
   Click "Add"

3. **Replace A Records with Firebase IPs:**
   
   **Current Records (DELETE these):**
   ```
   Type: A
   Host: @
   Value: 216.198.7.91  ❌ DELETE
   ```
   
   **New Records (ADD these from Firebase):**
   ```
   Type: A
   Host: @
   Value: 151.101.1.195  ✅ ADD
   
   Type: A
   Host: @
   Value: 151.101.65.195  ✅ ADD
   
   Type: A
   Host: @
   Value: 151.101.129.195  ✅ ADD
   
   Type: A
   Host: @
   Value: 151.101.193.195  ✅ ADD
   ```

4. **Update www CNAME (if needed):**
   ```
   Type: CNAME
   Host: www
   Value: typhoonhub.ca  ✅ CHANGE (currently points to Vercel)
   ```

5. **Keep These Records (DO NOT CHANGE):**
   ```
   _domainkey  TXT  v=DKIM1; p=...  ✅ KEEP (Email)
   _dmarc      TXT  v=DMARC1; p=... ✅ KEEP (Email)
   @           TXT  v=spf1 -all     ✅ KEEP (Email)
   @           TXT  fsh-claim=...   ✅ KEEP (Squarespace)
   ```

### Step 3: Wait for Verification

1. **In Firebase Console:**
   - Click "Verify" after adding TXT record
   - Wait 15 minutes for DNS propagation
   - Firebase will verify ownership

2. **After Verification:**
   - Firebase automatically provisions SSL certificate
   - Your site will be accessible at:
     - ✅ https://typhoonhub.ca
     - ✅ https://www.typhoonhub.ca

---

## 🚀 Method 2: Using Firebase CLI (Alternative)

If you prefer command-line:

```bash
# Navigate to project
cd /home/user/webapp

# Login to Firebase
npx firebase login

# Add custom domain
npx firebase hosting:channel:deploy live --only hosting:typhoonhub.ca

# Or use interactive mode
npx firebase hosting:sites:list
npx firebase hosting:sites:update typhoon-indie-stream --add-domain typhoonhub.ca
```

---

## ⏱️ DNS Propagation Timeline

After updating DNS records in Squarespace:

- **15 minutes:** Firebase can verify TXT record
- **1-2 hours:** Most users can access typhoonhub.ca
- **24-48 hours:** Global DNS propagation complete

**Check propagation status:**
- Tool: https://www.whatsmydns.net/#A/typhoonhub.ca

---

## ✅ Verification Checklist

After connecting the domain, verify everything works:

### 1. DNS Records Check
```bash
# Check A records
dig typhoonhub.ca A +short

# Should return Firebase IPs:
# 151.101.1.195
# 151.101.65.195
# 151.101.129.195
# 151.101.193.195
```

### 2. Site Accessibility
- [ ] https://typhoonhub.ca loads
- [ ] https://www.typhoonhub.ca loads
- [ ] SSL certificate is valid (green lock icon)
- [ ] No redirect loops

### 3. Feature Testing
- [ ] Homepage loads with newsletter section
- [ ] Browse page shows all films
- [ ] Click film card → browse page works
- [ ] Click video card → watch page works
- [ ] YouTube videos play
- [ ] Firebase Storage videos play (Legends of Legacy)
- [ ] TyphoonPod page loads (/typhoonhubpods)
- [ ] Mobile responsive design works

---

## 🎯 Current DNS Configuration

### What You Have Now (Squarespace):

```
HOST        TYPE    VALUE                                STATUS
─────────────────────────────────────────────────────────────────
@           A       216.198.7.91                         ⚠️  OLD
www         CNAME   eq31feedc46dd489f.vercel-dns.com    ⚠️  VERCEL
_domainkey  TXT     v=DKIM1; p=...                       ✅ KEEP
_dmarc      TXT     v=DMARC1; p=reject...                ✅ KEEP
@           TXT     v=spf1 -all                          ✅ KEEP
@           TXT     fsh-claim=002-02...                  ✅ KEEP
```

### What You Need (Firebase Hosting):

```
HOST        TYPE    VALUE                                ACTION
─────────────────────────────────────────────────────────────────
@           TXT     firebase=typhoon-indie-stream-...    ✅ ADD (from Firebase)
@           A       151.101.1.195                        ✅ ADD (from Firebase)
@           A       151.101.65.195                       ✅ ADD (from Firebase)
@           A       151.101.129.195                      ✅ ADD (from Firebase)
@           A       151.101.193.195                      ✅ ADD (from Firebase)
www         CNAME   typhoonhub.ca                        ✅ CHANGE
_domainkey  TXT     v=DKIM1; p=...                       ✅ KEEP
_dmarc      TXT     v=DMARC1; p=reject...                ✅ KEEP
@           TXT     v=spf1 -all                          ✅ KEEP
@           TXT     fsh-claim=002-02...                  ✅ KEEP
```

---

## 🆘 Troubleshooting

### Issue: TXT Record Not Verifying

**Solution:**
1. Double-check TXT value matches exactly (copy-paste from Firebase)
2. Ensure Host is `@` not blank
3. Wait 15-30 minutes for DNS propagation
4. Try DNS flush: `ipconfig /flushdns` (Windows) or `sudo dscacheutil -flushcache` (Mac)

### Issue: Site Not Loading After DNS Update

**Possible Causes:**
1. DNS not propagated yet → Wait 1-2 hours
2. Wrong A record IPs → Verify IPs from Firebase Console
3. www CNAME incorrect → Ensure points to apex domain or Firebase

**Check DNS:**
```bash
# Check current DNS
nslookup typhoonhub.ca

# Check with different DNS server
nslookup typhoonhub.ca 8.8.8.8
```

### Issue: SSL Certificate Error

**Solution:**
- Firebase auto-provisions SSL after domain verification
- Takes 15-60 minutes
- If longer, check Firebase Console → Hosting → Domain status

### Issue: Redirect Loop

**Solution:**
1. Check Firebase hosting configuration
2. Ensure no conflicting redirects in `firebase.json`
3. Clear browser cache and cookies

---

## 📚 Additional Resources

### Firebase Hosting Docs:
- Custom Domain Setup: https://firebase.google.com/docs/hosting/custom-domain
- DNS Configuration: https://firebase.google.com/docs/hosting/custom-domain#set-up-your-custom-domain

### Squarespace DNS:
- DNS Settings Guide: https://support.squarespace.com/hc/en-us/articles/205812378-Connecting-a-domain-to-your-site
- Advanced DNS: https://support.squarespace.com/hc/en-us/articles/360002101888

### DNS Propagation Check:
- https://www.whatsmydns.net
- https://dnschecker.org

---

## 🎬 Step-by-Step Video Tutorial (Conceptual)

1. **Firebase Console** (2 minutes)
   - Navigate to Hosting section
   - Click "Add custom domain"
   - Enter typhoonhub.ca
   - Copy TXT and A records

2. **Squarespace DNS** (3 minutes)
   - Login to Squarespace
   - Go to Domains → typhoonhub.ca → DNS Settings
   - Add TXT record (verification)
   - Replace A records with Firebase IPs
   - Update www CNAME

3. **Verification** (15 minutes)
   - Wait for DNS propagation
   - Verify in Firebase Console
   - Test https://typhoonhub.ca
   - Confirm SSL certificate

---

## 🎯 Quick Reference

### Firebase Hosting URLs (Currently Working):
- ✅ https://typhoon-indie-stream.web.app
- ✅ https://typhoon-indie-stream.firebaseapp.com

### Custom Domain (After DNS Setup):
- ⏳ https://typhoonhub.ca (pending DNS)
- ⏳ https://www.typhoonhub.ca (pending DNS)

### Firebase Console:
- Project: https://console.firebase.google.com/project/typhoon-indie-stream
- Hosting: https://console.firebase.google.com/project/typhoon-indie-stream/hosting

### GitHub:
- Repository: https://github.com/Selorm4321/typhoonhub
- Actions: https://github.com/Selorm4321/typhoonhub/actions
- Last Deploy: https://github.com/Selorm4321/typhoonhub/actions/runs/19706269274

---

## 🎉 What's Been Accomplished

✅ **Code Development:**
- Homepage redesigned with newsletter section
- Login requirement removed
- Film navigation: homepage → browse → watch
- TyphoonPod page created
- Firebase Storage videos integrated
- All video URLs working

✅ **Deployment:**
- PR #10 merged to main
- GitHub Actions workflow executed
- Site deployed to Firebase Hosting
- Production build successful (43 pages)
- HTTPS enabled with SSL

⏳ **Pending:**
- Connect typhoonhub.ca domain (waiting for DNS setup)
- Upload podcast audio to Firebase Storage

---

## 📞 Need Help?

If you encounter issues:

1. **Check Firebase Console:**
   - Hosting section shows domain status
   - SSL certificate provisioning status
   - Deployment history

2. **Verify DNS:**
   - Use whatsmydns.net to check propagation
   - Ensure A records point to Firebase IPs
   - Verify TXT record exists

3. **Test Locally:**
   - Firebase URLs work: https://typhoon-indie-stream.web.app
   - If yes, issue is DNS configuration
   - If no, check Firebase deployment

---

**Ready to connect your domain! Follow the steps above.** 🚀

**Your TyphoonHub is deployed and waiting at:**
- https://typhoon-indie-stream.web.app
- https://typhoon-indie-stream.firebaseapp.com

**After DNS setup, it will be at:**
- https://typhoonhub.ca 🎬
