
import { storage } from '@/lib/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

class PodcastUploader {
  private storage;

  constructor() {
    this.storage = storage;
  }

  async uploadPodcast(file: File, metadata: Record<string, string> = {}) {
    try {
      // Create a unique filename
      const timestamp = Date.now();
      const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const fileName = `podcasts/${timestamp}_${sanitizedName}`;
      
      // Create storage reference
      const storageRef = ref(this.storage, fileName);
      
      // Create upload task with resumable upload
      const uploadTask = uploadBytesResumable(storageRef, file, {
        contentType: 'audio/mpeg',
        customMetadata: {
          originalName: file.name,
          uploadDate: new Date().toISOString(),
          ...metadata
        }
      });

      return new Promise((resolve, reject) => {
        // Track upload progress
        uploadTask.on('state_changed', 
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress.toFixed(2)}% done`);
            
            // Update UI progress bar if you have one
            this.updateProgressBar(progress);
            
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
            }
          }, 
          (error) => {
            console.error('Upload failed:', error);
            reject(error);
          }, 
          async () => {
            // Upload completed successfully
            try {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              console.log('File available at:', downloadURL);
              
              const result = {
                downloadURL,
                fileName,
                size: file.size,
                type: file.type,
                uploadDate: new Date().toISOString()
              };
              
              resolve(result);
            } catch (error) {
              reject(error);
            }
          }
        );
      });
    } catch (error) {
      console.error('Error initiating upload:', error);
      throw error;
    }
  }

  updateProgressBar(progress: number) {
    if (typeof document === 'undefined') return;
    const progressBar = document.getElementById('upload-progress');
    if (progressBar) {
      progressBar.style.width = `${progress}%`;
      progressBar.textContent = `${progress.toFixed(1)}%`;
    }
  }
}

export default PodcastUploader;
