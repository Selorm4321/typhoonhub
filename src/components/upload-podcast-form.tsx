
'use client';

import { useState, useRef } from 'react';
import PodcastUploader from '@/lib/podcast-uploader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

type UploadResult = {
  downloadURL: string;
  size: number;
  uploadDate: string;
};

export default function UploadPodcastForm() {
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<UploadResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLTextAreaElement>(null);

  const { toast } = useToast();

  const handleUpload = async () => {
    const file = fileInputRef.current?.files?.[0];
    if (!file) {
      toast({
        variant: 'destructive',
        title: 'No file selected',
        description: 'Please select a podcast file to upload.',
      });
      return;
    }

    setIsLoading(true);
    setProgress(0);
    setResult(null);
    setError(null);

    const uploader = new PodcastUploader();
    const metadata = {
      title: titleInputRef.current?.value || 'Untitled Episode',
      description: descriptionInputRef.current?.value || 'No description provided',
    };

    try {
      const uploadResult = await uploader.uploadPodcast(file, metadata, (p) => {
        setProgress(p);
      });
      setResult(uploadResult);
      toast({
        title: 'Upload Successful!',
        description: 'Your podcast has been uploaded.',
      });
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred.');
      toast({
        variant: 'destructive',
        title: 'Upload Failed',
        description: err.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({ title: 'URL copied to clipboard!' });
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Your Podcast</CardTitle>
        <CardDescription>Select your podcast file to upload to Firebase Storage.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <Input type="file" accept="audio/*" ref={fileInputRef} />
          <Input placeholder="Episode Title" ref={titleInputRef} />
          <Textarea placeholder="Episode Description" ref={descriptionInputRef} />
        </div>
        
        <Button onClick={handleUpload} disabled={isLoading}>
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          {isLoading ? 'Uploading...' : 'Upload Podcast'}
        </Button>

        {isLoading && (
          <div className="space-y-2">
            <p>Upload Progress</p>
            <Progress value={progress} />
            <p className="text-sm text-muted-foreground text-center">{Math.round(progress)}%</p>
          </div>
        )}

        {result && (
          <Card className="bg-secondary/50">
            <CardHeader>
              <CardTitle>✅ Upload Successful!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
                <div>
                    <label className="font-semibold">File URL:</label>
                    <Input value={result.downloadURL} readOnly />
                </div>
                <p><strong>File Size:</strong> {(result.size / 1024 / 1024).toFixed(2)} MB</p>
                <p><strong>Upload Date:</strong> {new Date(result.uploadDate).toLocaleString()}</p>
                <Button onClick={() => copyToClipboard(result.downloadURL)}>Copy URL</Button>
            </CardContent>
          </Card>
        )}

        {error && (
            <Card className="border-destructive bg-destructive/10">
                <CardHeader>
                    <CardTitle className="text-destructive">❌ Upload Failed</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>{error}</p>
                </CardContent>
            </Card>
        )}
      </CardContent>
    </Card>
  );
}
