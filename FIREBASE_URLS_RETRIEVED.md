# Firebase Storage URLs Successfully Retrieved ✅

## Summary
Successfully retrieved **working Firebase Storage download URLs** with access tokens for all three Legends of Legacy documentary videos using automated scripts.

## Retrieved URLs

### 1. Ignatius Sancho (58 MB)
**File Path:** `videos episodes/Legends of Legacy Episodes/Ignatius Sancho/Typhoonhub Presents_ Ignatius Sancho_2025_11_16(1).mp4`

**Download URL:**
```
https://firebasestorage.googleapis.com/v0/b/typhoon-indie-stream.firebasestorage.app/o/videos%20episodes%2FLegends%20of%20Legacy%20Episodes%2FIgnatius%20Sancho%2FTyphoonhub%20Presents_%20Ignatius%20Sancho_2025_11_16(1).mp4?alt=media&token=3bf95181-4f81-43b6-8857-852df6635cea
```

### 2. Matilda C. Evans (301 MB)
**File Path:** `videos episodes/Legends of Legacy Episodes/Matilda C. Evans First African American Woman Physician in South Carolina/Matilda C. Evans – Healing. Advancing. Inspiring..mov`

**Download URL:**
```
https://firebasestorage.googleapis.com/v0/b/typhoon-indie-stream.firebasestorage.app/o/videos%20episodes%2FLegends%20of%20Legacy%20Episodes%2FMatilda%20C.%20Evans%20First%20African%20American%20Woman%20Physician%20in%20South%20Carolina%2FMatilda%20C.%20Evans%20%E2%80%93%20Healing.%20Advancing.%20Inspiring..mov?alt=media&token=fed0b2b7-b7ed-4eca-96eb-9fe0d0f45eae
```

### 3. The Real McCoy (107 MB)
**File Path:** `videos episodes/Legends of Legacy Episodes/The Real McCoy/The-RealMcCoy-Web1080p.mp4`

**Download URL:**
```
https://firebasestorage.googleapis.com/v0/b/typhoon-indie-stream.firebasestorage.app/o/videos%20episodes%2FLegends%20of%20Legacy%20Episodes%2FThe%20Real%20McCoy%2FThe-RealMcCoy-Web1080p.mp4?alt=media&token=4d840db1-928b-426b-8912-487f7979682f
```

## Method Used

Created automated Node.js scripts using Firebase Client SDK:

### 1. `scripts/list-firebase-storage.mjs`
- Lists all folders and files in Firebase Storage
- Retrieves download URLs programmatically
- Used to discover the correct folder structure

### 2. `scripts/get-firebase-urls.mjs`
- Attempts to fetch download URLs for specific paths
- Tests multiple path variations (URL encoded vs plain)

## Key Discovery

The actual folder name in Firebase Storage was:
- ✅ `Legends of Legacy Episodes` (with "Episodes" plural)
- ❌ NOT `Legends of Legacy` (without "Episodes")

Also, the Matilda Evans folder had the full descriptive name:
- ✅ `Matilda C. Evans First African American Woman Physician in South Carolina`
- ❌ NOT `Matilda C. Evans - Healing, Advancing, Inspiring`

## Files Updated

### `/src/lib/data.ts`
Updated all three `firebaseVideoUrl` fields with working URLs including access tokens:
- Fixed folder path: `Legends of Legacy Episodes` (added "Episodes")
- Fixed Matilda folder: Full descriptive name
- Added access tokens to all URLs

## Build Status

✅ **Production build successful**
- 43 pages generated
- No errors
- Static export ready for deployment

## Testing

✅ **Dev server running successfully** at: https://3001-ibkkvrfppwymw2vbpbw3a-583b4d74.sandbox.novita.ai

You can now:
1. Navigate to any Legends of Legacy episode in browse page
2. Click to watch the video
3. Videos should play directly from Firebase Storage with HTML5 video player

## Podcast Audio Status

⚠️ **Podcast audio not found in Firebase Storage**

The `audio episodes` folder exists but is empty. The podcast file needs to be uploaded:
- Expected path: `audio episodes/Global Cinema/Filming Around the World/Global Cinema_ Filming Around the World.mp3`
- Current status: **File does not exist in Firebase Storage**

**Next Step for Podcasts:** Upload the podcast audio file to Firebase Storage, then retrieve its download URL using the same script method.

## Scripts for Future Use

Both scripts are now available in `/scripts/` directory:

```bash
# List all files in Firebase Storage
node scripts/list-firebase-storage.mjs "folder/path"

# Get download URLs for specific files
node scripts/get-firebase-urls.mjs
```

## Deployment Next Steps

1. ✅ Firebase URLs retrieved and updated
2. ✅ Build tested and successful
3. ⏳ Ready for deployment to typhoonhub.ca
4. ⏳ Upload podcast audio file
5. ⏳ Update podcast URL in data once uploaded

---

**Status:** Ready for production deployment 🚀
**Date:** November 26, 2025
**Firebase Project:** typhoon-indie-stream
