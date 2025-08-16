'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  amount: z.coerce.number().min(10, { message: 'Investment amount must be at least $10.' }),
  message: z.string().optional(),
});

type InvestModalProps = {
  isOpen: boolean;
  onClose: () => void;
  preselectedAmount?: number;
};

export function InvestModal({ isOpen, onClose, preselectedAmount }: InvestModalProps) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      amount: preselectedAmount || 100,
      message: '',
    },
  });
  
  // Update form when preselected amount changes
  React.useEffect(() => {
    if (preselectedAmount) {
      form.setValue('amount', preselectedAmount);
    }
  }, [preselectedAmount, form]);

  const { isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // Store lead information
      const docRef = await addDoc(collection(db, 'invest_leads'), {
        slug: 'mary-and-rose',
        ...values,
        createdAt: serverTimestamp(),
      });
      console.log('Lead document written with ID: ', docRef.id);

      // Create Stripe checkout session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tierName: values.amount >= 1500 ? 'Gold' : values.amount >= 500 ? 'Silver' : 'Bronze',
          tierAmount: values.amount,
          projectName: 'Mary and Rose',
          userEmail: values.email,
          userName: values.name,
          userId: docRef.id, // Use the document ID as user ID
          productionId: 'mary-and-rose',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { url } = await response.json();
      
      if (url) {
        // Close modal and redirect to Stripe Checkout
        form.reset();
        onClose();
        window.location.href = url;
      } else {
        throw new Error('No checkout URL received');
      }
      
    } catch (error) {
      console.error('Error processing investment:', error);
      toast({
        variant: 'destructive',
        title: 'Processing Failed',
        description: 'There was an error processing your investment. Please try again.',
      });
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Register Your Interest</DialogTitle>
          <DialogDescription>
            Provide your details below, and we'll contact you with the prospectus and next steps.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
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
                  <FormControl><Input type="email" placeholder="you@example.com" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Intended Investment Amount (USD)</FormLabel>
                  <FormControl><Input type="number" placeholder="100" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message (Optional)</FormLabel>
                  <FormControl><Textarea placeholder="Any questions you have..." {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Submit
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
