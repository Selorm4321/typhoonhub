# 🔗 Get Firebase Storage URLs - Step by Step

## The Problem

The video files exist in Firebase Storage, but we need the correct public URLs with access tokens to play them on the website.

---

## ✅ How to Get the Correct URLs

### Step 1: Open Firebase Console

Go to: https://console.firebase.google.com/project/typhoon-indie-stream/storage

### Step 2: Navigate to Each Video

Click through the folders:
```
videos episodes → Legends of Legacy → [Episode Folder] → [Video File]
```

### Step 3: Get Download URL

For each video file:

1. **Click on the video file** (e.g., "Typhoonhub Presents_ Ignatius Sancho_2025_11_16(1).mp4")
2. In the right panel, look for **"Download URL"** or click the **"Get download URL"** button
3. **Copy the entire URL** (it will include `?alt=media&token=...`)
4. This is your public playback URL!

### Step 4: Update the Code

Once you have all 3 URLs, update `/src/lib/data.ts`:

```typescript
const legendsOfLegacyEpisodes: Film[] = [
  {
    id: 101,
    title: 'Ignatius Sancho',
    // ... other fields ...
    firebaseVideoUrl: 'PASTE_IGNATIUS_URL_HERE', // ← Update this
    videoType: 'firebase' as const,
  },
  {
    id: 102,
    title: 'Matilda C. Evans...',
    // ... other fields ...
    firebaseVideoUrl: 'PASTE_MATILDA_URL_HERE', // ← Update this
    videoType: 'firebase' as const,
  },
  {
    id: 103,
    title: 'The Real McCoy',
    // ... other fields ...
    firebaseVideoUrl: 'PASTE_MCCOY_URL_HERE', // ← Update this
    videoType: 'firebase' as const,
  }
];
```

---

## 📋 Video Files to Get URLs For:

### 1. Ignatius Sancho
- **Path**: `videos episodes/Legends of Legacy/Ignatius Sancho/`
- **File**: `Typhoonhub Presents_ Ignatius Sancho_2025_11_16(1).mp4`
- **Size**: 58 MB
- **URL needed**: ✅

### 2. Matilda C. Evans  
- **Path**: `videos episodes/Legends of Legacy/Matilda C. Evans - Healing, Advancing, Inspiring/`
- **File**: `Matilda C. Evans – Healing, Advancing, Inspiring..mov`
- **Size**: 301 MB
- **URL needed**: ✅

### 3. The Real McCoy
- **Path**: `videos episodes/Legends of Legacy/The Real McCoy/`
- **File**: `The-RealMcCoy-Web1080p.mp4`
- **Size**: 107 MB
- **URL needed**: ✅

---

## 🔒 Check Firebase Storage Rules

Make sure your storage rules allow public read access:

1. Go to Firebase Console → Storage → **Rules** tab
2. Check if you have something like:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true;  // ← This allows public access
      allow write: if request.auth != null;
    }
  }
}
```

3. If not, update the rules and click **"Publish"**

---

## ⚠️ Important Notes

### The URL Format Should Look Like:

```
https://firebasestorage.googleapis.com/v0/b/typhoon-indie-stream.firebasestorage.app/o/videos%20episodes%2FLegends%20of%20Legacy%2FIgnatius%20Sancho%2FTyphoonhub%20Presents_%20Ignatius%20Sancho_2025_11_16(1).mp4?alt=media&token=ABC123XYZ789
```

**Key parts**:
- Spaces encoded as `%20`
- Special characters encoded (e.g., `–` becomes `%E2%80%93`)
- **Must include `?alt=media&token=...`** at the end
- Token is required for access

### If You Can't Find "Download URL" Button:

1. Click on the file
2. Look for three dots menu (⋮)
3. Select "Get download URL" or "Copy download URL"
4. OR right-click the file → "Get download URL"

---

## 🧪 Test the URLs

After getting the URLs, test them in your browser:

1. **Paste the URL** in browser address bar
2. **Press Enter**
3. **Video should start downloading or playing**

If you get a 404 or 403 error, the URL is wrong or storage rules need updating.

---

## 🚀 After Getting URLs

1. Update `/src/lib/data.ts` with the new URLs
2. Save the file
3. The dev server will auto-reload
4. Test at: http://localhost:9002/browse
5. Click on Legends of Legacy episodes (IDs 11, 12, 13)
6. Videos should play!

---

## 📝 Quick Checklist

- [ ] Open Firebase Console Storage
- [ ] Navigate to Ignatius Sancho video
- [ ] Copy download URL with token
- [ ] Navigate to Matilda Evans video  
- [ ] Copy download URL with token
- [ ] Navigate to Real McCoy video
- [ ] Copy download URL with token
- [ ] Update all 3 URLs in data.ts
- [ ] Save file
- [ ] Test videos on site
- [ ] Commit and push changes

---

## 💡 Alternative: Use Firebase Admin SDK

If you have trouble getting public URLs, you can also:

1. Use Firebase Admin SDK to generate signed URLs
2. Set up Cloud Functions to serve videos
3. Use Firebase CDN with proper CORS

But the simplest solution is to get the download URLs from the Console!

---

**Once you have the 3 URLs, paste them here and I'll update the code for you!** 🎬
