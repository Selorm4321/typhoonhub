# 🎙️ Podcast Audio Not Playing - Fix Required

## ❌ Problem Identified

The podcast audio file is **not uploaded to Firebase Storage**. The audio URL in the code returns **HTTP 404**.

**Current URL (NOT WORKING):**
```
https://firebasestorage.googleapis.com/v0/b/typhoon-indie-stream.firebasestorage.app/o/Global%20Cinema_%20Filming%20Around%20the%20World_2025_07_29%20(2).mp3?alt=media&token=9f44f211-fa8d-4b93-b307-270456028874
```

**Error:** `HTTP/2 404` - File does not exist

**Storage Status:**
- ✅ Folder exists: `audio episodes`
- ❌ Folder is empty: No files inside
- ❌ Audio file not found anywhere in storage

---

## ✅ Solution: Upload Audio File to Firebase Storage

### Method 1: Firebase Console (Easiest)

1. **Go to Firebase Storage Console:**
   - URL: https://console.firebase.google.com/project/typhoon-indie-stream/storage
   - Navigate to: **Storage** → **Files**

2. **Navigate to Audio Folder:**
   - Click on: `audio episodes` folder
   - If it doesn't exist, create it:
     - Click "Create folder"
     - Name: `audio episodes`

3. **Upload Audio File:**
   - Click **"Upload file"** button
   - Select your podcast audio file:
     - Recommended name: `Global Cinema_ Filming Around the World.mp3`
     - Or: `global-cinema-episode-1.mp3`
   - Wait for upload to complete

4. **Get Download URL:**
   - Click on the uploaded file
   - Click **"Get download URL"** or the link icon
   - Copy the complete URL (includes `?alt=media&token=...`)

5. **Update Code:**
   - Open: `/home/user/webapp/src/lib/data.ts`
   - Find line 207: `audioUrl: '...'`
   - Replace with your new URL
   - Commit and push changes
   - GitHub Actions will auto-deploy

---

### Method 2: Firebase CLI (Command Line)

```bash
# Navigate to project
cd /home/user/webapp

# Upload audio file (replace path with your actual file)
npx firebase storage:upload /path/to/your/podcast.mp3 \
  "audio episodes/Global Cinema_ Filming Around the World.mp3"

# Get the download URL
node scripts/list-firebase-storage.mjs "audio episodes"
```

**Then copy the URL and update `src/lib/data.ts`**

---

### Method 3: gsutil (Google Cloud SDK)

```bash
# Upload to Firebase Storage bucket
gsutil cp /path/to/your/podcast.mp3 \
  gs://typhoon-indie-stream.firebasestorage.app/audio\ episodes/Global\ Cinema_\ Filming\ Around\ the\ World.mp3

# Make it publicly accessible
gsutil acl ch -u AllUsers:R \
  gs://typhoon-indie-stream.firebasestorage.app/audio\ episodes/Global\ Cinema_\ Filming\ Around\ the\ World.mp3
```

---

## 🔧 Quick Fix: Use Placeholder Audio (Temporary)

If you don't have the podcast audio file yet, you can use a placeholder or disable the player:

### Option A: Disable Podcast Player (Temporary)

Edit `/src/lib/data.ts`:

```typescript
export const podcastEpisodes: PodcastEpisode[] = [
  // Commented out until audio is uploaded
  // {
  //   id: 1,
  //   title: 'Global Cinema: Filming Around the World',
  //   audioUrl: 'https://...',
  //   coverUrl: 'https://...',
  //   showNotes: '...',
  //   durationMinutes: 45,
  // }
];
```

**Result:** Global Cinema page shows "No podcast episodes available at the moment."

### Option B: Add "Coming Soon" Message

Edit `/src/app/global-cinema/page.tsx`:

Add this before the audio player:

```typescript
{!activeEpisode.audioUrl || activeEpisode.audioUrl.includes('placeholder') ? (
  <div className="bg-yellow-500/20 border border-yellow-500 rounded-lg p-4 mb-4">
    <p className="text-yellow-200 font-semibold">
      🎙️ Audio Coming Soon! We're preparing this episode for you.
    </p>
  </div>
) : (
  <audio controls className="w-full" key={activeEpisode.id} src={activeEpisode.audioUrl}>
    Your browser does not support the audio element.
  </audio>
)}
```

---

## 📋 File Requirements

When uploading the podcast audio file:

### File Format:
- **Recommended:** MP3 (best compatibility)
- **Alternative:** M4A, WAV, OGG

### File Size:
- **Recommended:** Under 50 MB
- **Maximum:** 100 MB (Firebase free tier limit)

### Audio Quality:
- **Bitrate:** 128 kbps (good quality, smaller file)
- **Sample Rate:** 44.1 kHz
- **Channels:** Stereo or Mono

### File Naming:
- **Good:** `global-cinema-episode-1.mp3`
- **Good:** `Global Cinema_ Filming Around the World.mp3`
- **Avoid:** Special characters, spaces, emojis

---

## 🔍 Verification After Upload

After uploading and updating the URL:

### 1. Test URL Directly:

```bash
# Replace with your actual URL
curl -I "https://firebasestorage.googleapis.com/.../your-file.mp3?alt=media&token=..."

# Should return:
# HTTP/2 200
# content-type: audio/mpeg
```

### 2. Test in Browser:
- Open the download URL in browser
- Audio should play or download
- No 404 error

### 3. Test on Live Site:
- Visit: https://typhoon-indie-stream.web.app/global-cinema
- Audio player should show
- Click play button
- Audio should play

### 4. Test on Mobile:
- Open on mobile device
- Audio player controls visible
- Play/pause works
- Volume control works

---

## 🎯 Where is the Audio File?

### Podcast Source:
The podcast "Global Cinema: Filming Around the World" needs to be:
1. Recorded and edited
2. Exported as MP3 file
3. Uploaded to Firebase Storage

### If You Have the File:
1. Upload to Firebase Storage (Method 1 above)
2. Get download URL
3. Update `src/lib/data.ts` line 207
4. Commit and push
5. Auto-deployment will update live site

### If You Don't Have the File:
1. Record the podcast episode
2. Edit and export as MP3
3. Follow upload steps above

---

## 🛠️ Code Location to Update

**File:** `/src/lib/data.ts`

**Line:** 207

**Current (NOT WORKING):**
```typescript
audioUrl: 'https://firebasestorage.googleapis.com/v0/b/typhoon-indie-stream.firebasestorage.app/o/Global%20Cinema_%20Filming%20Around%20the%20World_2025_07_29%20(2).mp3?alt=media&token=9f44f211-fa8d-4b93-b307-270456028874',
```

**Replace with (AFTER UPLOAD):**
```typescript
audioUrl: 'YOUR_NEW_FIREBASE_STORAGE_URL_WITH_TOKEN',
```

---

## 📱 Alternative: Use External Hosting

If Firebase Storage is problematic, you can host the podcast on:

### Option 1: SoundCloud
1. Upload to SoundCloud
2. Get embed URL
3. Use iframe instead of audio tag

### Option 2: Anchor.fm / Spotify for Podcasters
1. Upload to Anchor
2. Get podcast RSS feed
3. Update to use RSS feed

### Option 3: AWS S3 / CloudFront
1. Upload to S3 bucket
2. Make publicly accessible
3. Use CloudFront URL

### Option 4: Podcast Hosting Service
- Buzzsprout
- Libsyn
- Podbean
- Use their embed player

---

## 🚨 Important Notes

1. **Firebase Storage Rules:**
   - Ensure storage rules allow public read access
   - Check: Firebase Console → Storage → Rules
   - Should allow: `allow read: if true;`

2. **Access Token:**
   - Firebase URLs need access token (`?alt=media&token=...`)
   - Don't remove the token from URL
   - Token is required for public access

3. **CORS Headers:**
   - Firebase Storage auto-configures CORS
   - No additional setup needed
   - Works with HTML5 audio element

4. **File Size Limit:**
   - Free tier: 1 GB storage total
   - File size: Up to 100 MB per file
   - Consider compressing large files

---

## ✅ Checklist After Fix

- [ ] Audio file uploaded to Firebase Storage
- [ ] Download URL retrieved with access token
- [ ] URL updated in `src/lib/data.ts` line 207
- [ ] Code committed and pushed to main
- [ ] GitHub Actions deployment completed
- [ ] Audio URL tested (returns HTTP 200)
- [ ] Live site tested (audio plays)
- [ ] Mobile playback tested

---

## 🎬 Summary

**Problem:** Podcast audio file not uploaded to Firebase Storage  
**Status:** `audio episodes` folder exists but is empty  
**Error:** HTTP 404 on audio URL  

**Solution:** Upload podcast audio file to Firebase Storage and update URL in code

**Temporary Fix:** Comment out podcast episode or add "Coming Soon" message

**Next Step:** Upload your podcast audio file following Method 1 above

---

**Firebase Console:** https://console.firebase.google.com/project/typhoon-indie-stream/storage  
**Code File:** `/src/lib/data.ts` (line 207)  
**Script:** `node scripts/list-firebase-storage.mjs "audio episodes"`

---

**Once uploaded, the podcast will play on the live site!** 🎙️
