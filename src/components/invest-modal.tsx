'use client';

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Investment } from '@/lib/types/investment';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  amount: z.coerce.number().min(10, { message: 'Investment must be at least $10.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  paymentMethod: z.enum(['Card', 'PayPal', 'Bank'], {
    required_error: 'Please select a payment method.',
  }),
  terms: z.boolean().refine(val => val === true, {
    message: 'You must accept the terms and conditions.',
  }),
});

type InvestModalProps = {
  investment: Investment;
  isOpen: boolean;
  onClose: () => void;
};

export default function InvestModal({ investment, isOpen, onClose }: InvestModalProps) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 10,
      email: '',
      terms: false,
    },
  });

  const { isSubmitting } = form.formState;

  // TODO: Implement actual Stripe checkout session creation
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log({
      slug: investment.slug,
      ...values,
    });

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast({
      title: 'Submission Received!',
      description: `Thank you for your interest in "${investment.title}". Your investment details have been recorded.`,
    });
    onClose();
    form.reset();
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Invest in {investment.title}</DialogTitle>
          <DialogDescription>
            Complete the form below to proceed with your investment.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount (USD)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="10" {...field} />
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
                    <Input type="email" placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Method</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a method" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {/* TODO: Integrate Stripe Elements for Card */}
                      <SelectItem value="Card">Credit/Debit Card</SelectItem>
                      <SelectItem value="PayPal">PayPal</SelectItem>
                      <SelectItem value="Bank">Bank Transfer</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="terms"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      I agree to the terms and conditions.
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Submit Investment
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
