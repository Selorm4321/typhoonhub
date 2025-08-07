
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Clapperboard } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { db } from '@/lib/firebase';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';

const productionFormSchema = z.object({
  title: z.string().min(2, { message: 'Title must be at least 2 characters.' }),
  description: z.string().min(20, { message: 'Description must be at least 20 characters.' }),
  fundingGoal: z.coerce.number().min(1, { message: 'Funding goal must be a positive number.' }),
  minimumInvestment: z.coerce.number().min(1, { message: 'Minimum investment must be a positive number.' }),
  category: z.string(),
  imageUrl: z.string().url({ message: 'Please enter a valid URL.' }).optional().or(z.literal('')),
  expectedROI: z.string().optional(),
  productionTimeline: z.string().optional(),
});

export default function AddProductionPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const form = useForm<z.infer<typeof productionFormSchema>>({
    resolver: zodResolver(productionFormSchema),
    defaultValues: {
      title: '',
      description: '',
      fundingGoal: 0,
      minimumInvestment: 100,
      category: 'feature',
      imageUrl: '',
      expectedROI: '',
      productionTimeline: '',
    },
  });

  async function onSubmit(values: z.infer<typeof productionFormSchema>) {
    setIsLoading(true);
    try {
      await addDoc(collection(db, 'productions'), {
        ...values,
        fundingGoal: values.fundingGoal * 100,
        minimumInvestment: values.minimumInvestment * 100,
        currentFunding: 0,
        investors: 0,
        status: 'active',
        createdAt: serverTimestamp(),
      });
      toast({
        title: 'Production Added!',
        description: `"${values.title}" has been successfully added.`,
      });
      form.reset();
      router.push('/invest');
    } catch (error) {
      console.error('Error adding production:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to add production. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  if (authLoading) {
    return <div className="flex justify-center items-center h-screen"><Loader2 className="h-16 w-16 animate-spin"/></div>
  }
  
  if (!user) {
    router.push('/login');
    return null;
  }

  return (
    <div className="container mx-auto py-12">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <div className="flex items-center gap-4">
            <Clapperboard className="h-8 w-8 text-primary" />
            <div>
              <CardTitle>Add New Production</CardTitle>
              <CardDescription>Fill in the details for the new investment opportunity.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField control={form.control} name="title" render={({ field }) => (
                <FormItem>
                  <FormLabel>Production Title</FormLabel>
                  <FormControl><Input placeholder="e.g., Cleaning House" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="description" render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl><Textarea placeholder="A brief synopsis of the film..." {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField control={form.control} name="fundingGoal" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Funding Goal ($)</FormLabel>
                    <FormControl><Input type="number" placeholder="15000" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="minimumInvestment" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Minimum Investment ($)</FormLabel>
                    <FormControl><Input type="number" placeholder="100" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
              <FormField control={form.control} name="category" render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger><SelectValue placeholder="Select a category" /></SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="feature">Feature Film</SelectItem>
                      <SelectItem value="short">Short Film</SelectItem>
                      <SelectItem value="documentary">Documentary</SelectItem>
                      <SelectItem value="series">Series</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="expectedROI" render={({ field }) => (
                <FormItem>
                  <FormLabel>Expected ROI</FormLabel>
                  <FormControl><Input placeholder="e.g., 15-25%" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="productionTimeline" render={({ field }) => (
                <FormItem>
                  <FormLabel>Production Timeline</FormLabel>
                  <FormControl><Input placeholder="e.g., 6 months" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="imageUrl" render={({ field }) => (
                <FormItem>
                  <FormLabel>Poster Image URL</FormLabel>
                  <FormControl><Input type="url" placeholder="https://placehold.co/600x900.png" {...field} /></FormControl>
                  <FormDescription>A direct link to the poster image.</FormDescription>
                  <FormMessage />
                </FormItem>
              )} />
              <Button type="submit" disabled={isLoading} className="w-full" size="lg">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Adding...
                  </>
                ) : (
                  'Add Production'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
