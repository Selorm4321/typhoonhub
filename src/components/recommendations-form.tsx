'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Film, Loader2, Sparkles } from 'lucide-react';

import { generateFilmRecommendations } from '@/ai/flows/generate-film-recommendations';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from './ui/card';

const formSchema = z.object({
  viewingHistory: z.string().min(10, {
    message: 'Please enter at least one movie title.',
  }),
});

export default function RecommendationsForm() {
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      viewingHistory: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setRecommendations([]);

    try {
      const result = await generateFilmRecommendations({
        viewingHistory: values.viewingHistory,
      });
      const recs = result.recommendations.split(',').map((rec) => rec.trim());
      setRecommendations(recs);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to generate recommendations. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="viewingHistory"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Your Viewing History</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g., The Godfather, Pulp Fiction, Inception, Parasite..."
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Enter a comma-separated list of movies you have watched and liked.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading} size="lg">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Get Recommendations
              </>
            )}
          </Button>
        </form>
      </Form>

      {recommendations.length > 0 && (
        <div>
          <h2 className="font-headline text-2xl font-semibold mb-4">Your Recommended Films</h2>
          <Card>
            <CardContent className="p-6">
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recommendations.map((rec, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <Film className="h-5 w-5 text-primary" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
