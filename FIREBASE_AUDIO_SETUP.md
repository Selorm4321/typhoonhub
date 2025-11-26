# 🎧 Firebase Audio Setup Guide

## Issue: Podcast Audio Not Playing

The Global Cinema podcast shows a player but the audio doesn't play because the Firebase Storage URL returns a 404 error.

---

## 🔧 How to Fix

### Step 1: Upload Audio to Firebase Storage

1. Go to Firebase Console: https://console.firebase.google.com/project/typhoon-indie-stream/storage
2. Navigate to or create folder: `podcasts/` or `audio/`
3. Upload your MP3 file: `Global Cinema_ Filming Around the World_2025_07_29 (2).mp3`
4. After upload, click on the file
5. Click "Get download URL" or copy the access token URL

### Step 2: Update the Audio URL in Code

Edit `/src/lib/data.ts`:

```typescript
export const podcastEpisodes: PodcastEpisode[] = [
  {
    id: 1,
    title: 'Global Cinema: Filming Around the World',
    audioUrl: 'YOUR_NEW_FIREBASE_URL_HERE', // Replace this
    coverUrl: 'https://firebasestorage.googleapis.com/v0/b/typhoon-indie-stream.firebasestorage.app/o/Global%20cinema%20cover.png?alt=media&token=04f7a39d-18c7-4bcf-890b-b80be847fc54',
    showNotes: 'In our inaugural episode, we discuss the resurgence of independent cinema...',
    durationMinutes: 45,
  }
];
```

### Step 3: Firebase Storage URL Format

The correct URL format should be:
```
https://firebasestorage.googleapis.com/v0/b/typhoon-indie-stream.firebasestorage.app/o/FOLDER%2FFILENAME.mp3?alt=media&token=YOUR_TOKEN
```

**Example:**
```
https://firebasestorage.googleapis.com/v0/b/typhoon-indie-stream.firebasestorage.app/o/podcasts%2FGlobal_Cinema_Filming_Around_the_World.mp3?alt=media&token=abc123xyz
```

---

## 🔑 Firebase Storage Rules

Make sure your storage rules allow public read access for audio files:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Allow public read access to podcasts
    match /podcasts/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Allow public read access to videos
    match /videos episodes/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

To update:
1. Go to Firebase Console → Storage → Rules
2. Add the rules above
3. Click "Publish"

---

## 🎯 Alternative: Use External Audio Hosting

If Firebase Storage is giving issues, you can use:

### Option 1: SoundCloud
1. Upload to SoundCloud
2. Get embed URL
3. Use in podcast player

### Option 2: Anchor/Spotify for Podcasters
1. Upload to Anchor.fm
2. Get RSS feed or direct MP3 URL
3. Use in your app

### Option 3: Amazon S3 / Cloudflare R2
1. Upload to S3 bucket
2. Make file public
3. Copy public URL
4. Use in podcast data

---

## 📝 Quick Test

To test if your new URL works, try loading it in browser:

```bash
# Should download or play the audio file
curl -I "YOUR_FIREBASE_URL_HERE"
```

Expected response: `HTTP/2 200` (not 404)

---

## 🔍 Troubleshooting

### Error: 404 Not Found
- File doesn't exist at that path
- Token expired
- File was deleted or moved
- Wrong bucket name

**Fix**: Re-upload file and get new URL

### Error: 403 Forbidden
- Storage rules don't allow public access
- Token invalid

**Fix**: Update storage rules (see above)

### Error: CORS Issues
- Browser blocking cross-origin request

**Fix**: Add CORS configuration in Firebase Storage:
```json
[
  {
    "origin": ["*"],
    "method": ["GET"],
    "maxAgeSeconds": 3600
  }
]
```

---

## ✅ Verification Checklist

After updating the audio URL:

- [ ] File uploaded to Firebase Storage
- [ ] File is accessible (test URL in browser)
- [ ] Storage rules allow public read
- [ ] URL copied correctly to `data.ts`
- [ ] No spaces or special characters in filename
- [ ] Token included in URL
- [ ] File format is MP3 (or supported format)
- [ ] File size is reasonable (< 100MB)
- [ ] CORS configured if needed

---

## 📂 Current File Structure

Based on your Firebase Storage:

```
typhoon-indie-stream.firebasestorage.app/
├── videos episodes/
│   ├── Legends of Legacy/
│   │   ├── Ignatius Sancho/
│   │   ├── Matilda G. Evans.../
│   │   └── The Real McCoy/
│   └── Typhoonhub Film/
│       └── ...
└── podcasts/ (CREATE THIS)
    └── Global_Cinema_Filming_Around_the_World.mp3
```

**Recommendation**: Create a `podcasts` folder for audio files separate from videos.

---

## 🚀 Once Fixed

After updating the audio URL and verifying it works:

1. Test locally at: http://localhost:9002/global-cinema
2. Commit changes: `git add src/lib/data.ts && git commit -m "fix: update podcast audio URL"`
3. Push: `git push origin genspark_ai_developer`
4. Deploy to typhoonhub.ca

---

**Need Help?** Check the Firebase Console Storage section to see your actual file structure and get the correct URLs.
