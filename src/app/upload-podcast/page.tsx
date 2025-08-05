import UploadPodcastForm from "@/components/upload-podcast-form";
import { UploadCloud } from "lucide-react";

export default function UploadPodcastPage() {
  return (
    <div className="container mx-auto py-12">
      <div className="max-w-3xl mx-auto text-center">
        <UploadCloud className="mx-auto h-12 w-12 text-primary" />
        <h1 className="mt-4 font-headline text-4xl font-bold">Upload Podcast</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Upload your latest episode to the Global Cinema Podcast.
        </p>
      </div>

      <div className="max-w-3xl mx-auto mt-10">
        <UploadPodcastForm />
      </div>
    </div>
  );
}
