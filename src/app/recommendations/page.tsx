import RecommendationsForm from "@/components/recommendations-form";
import { Sparkles } from "lucide-react";

export default function RecommendationsPage() {
  return (
    <div className="container mx-auto py-12">
      <div className="max-w-3xl mx-auto text-center">
        <Sparkles className="mx-auto h-12 w-12 text-primary" />
        <h1 className="mt-4 font-headline text-4xl font-bold">AI Film Recommendations</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Tell us what movies you've enjoyed, and our AI will find your next favorite film, including hidden gems you might have missed.
        </p>
      </div>

      <div className="max-w-3xl mx-auto mt-10">
        <RecommendationsForm />
      </div>
    </div>
  );
}
