'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, FileText, Loader2, LinkIcon } from 'lucide-react';
import { useState } from 'react';

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
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const submissionFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  filmTitle: z.string().min(2, { message: 'Film title must be at least 2 characters.' }),
  synopsis: z.string().min(20, { message: 'Synopsis must be at least 20 characters.' }),
  filmLink: z.string().url({ message: 'Please enter a valid URL to your film.' }),
  agreement: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the terms and conditions.',
  }),
});

export default function SubmitClient() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof submissionFormSchema>>({
    resolver: zodResolver(submissionFormSchema),
    defaultValues: {
      name: '',
      email: '',
      filmTitle: '',
      synopsis: '',
      filmLink: '',
      agreement: false,
    },
  });

  async function onSubmit(values: z.infer<typeof submissionFormSchema>) {
    setIsLoading(true);

    const subject = `Film Submission: ${values.filmTitle}`;
    const body = `
      New Film Submission:
      --------------------
      Filmmaker Name: ${values.name}
      Filmmaker Email: ${values.email}
      Film Title: ${values.filmTitle}
      Synopsis: ${values.synopsis}
      Film Link: ${values.filmLink}
      --------------------
      Agreement to terms: ${values.agreement ? 'Yes' : 'No'}
    `;

    const mailtoLink = `mailto:selorm@typhoonentertainment.ca?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    window.location.href = mailtoLink;

    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast({
      title: 'Email client opened',
      description: 'Please complete and send the email in your mail client to submit your film.',
    });
    form.reset();
    setIsLoading(false);
  }

  return (
    <div className="container mx-auto py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <Send className="mx-auto h-12 w-12 text-primary" />
          <h1 className="mt-4 font-headline text-4xl font-bold">Submit Your Film</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Ready to share your work? Submit a link to your film for consideration on Typhoonhub.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Submission Form</CardTitle>
                <CardDescription>
                  Please fill out the details below to submit your film for consideration.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input placeholder="you@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="filmTitle"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Film Title</FormLabel>
                          <FormControl>
                            <Input placeholder="My Awesome Film" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="synopsis"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Synopsis</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="A brief summary of your film..."
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="filmLink"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Film URL</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                              <Input placeholder="https://youtube.com/watch?v=..." {...field} className="pl-10" />
                            </div>
                          </FormControl>
                          <FormDescription>
                            Please provide a link to your film on a platform like YouTube or Vimeo. We do not accept direct file uploads at this time.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="agreement"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>
                              I confirm I have the rights to submit this film.
                            </FormLabel>
                            <FormDescription>
                              You agree to our terms of submission and distribution.
                            </FormDescription>
                             <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />
                    <Button type="submit" disabled={isLoading} className="w-full" size="lg">
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        'Submit Film'
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <FileText className="h-6 w-6 text-primary" />
                  <CardTitle>Legal Considerations</CardTitle>
                </div>
                <CardDescription>
                  Important information before you submit.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-muted-foreground">
                <p>
                  Before your film can be featured on Typhoonhub, you must ensure you have all the necessary legal rights and permissions. This is crucial to protect both you as a filmmaker and our platform.
                </p>
                <ul className="list-disc space-y-2 pl-5">
                  <li>
                    <strong>Copyright Clearance:</strong> You must own or have cleared the rights for all content in your film, including script, video footage, and sound recordings.
                  </li>
                  <li>
                    <strong>Music Licensing:</strong> All music must be original, in the public domain, or properly licensed. Using copyrighted music without permission is a common issue.
                  </li>
                  <li>
                    <strong>Talent Releases:</strong> You need signed release forms from all actors and individuals appearing in your film.
                  </li>
                   <li>
                    <strong>Location Releases:</strong> If you filmed on private property, you should have a location release form.
                  </li>
                </ul>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </div>
  );
}