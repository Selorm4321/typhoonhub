import { Mail, Phone, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Facebook, Instagram, Youtube } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="container mx-auto py-12">
      <div className="max-w-3xl mx-auto text-center">
        <Mail className="mx-auto h-12 w-12 text-primary" />
        <h1 className="mt-4 font-headline text-4xl font-bold">Contact Us</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          We'd love to hear from you. Whether you have a question, feedback, or a submission, feel free to reach out.
        </p>
      </div>

      <Card className="max-w-2xl mx-auto mt-12">
        <CardHeader>
          <CardTitle>Get in Touch</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <Mail className="h-6 w-6 text-primary" />
            <div>
              <h3 className="font-semibold">Email</h3>
              <a href="mailto:selorm@typhoonentertainment.ca" className="text-muted-foreground hover:text-primary transition-colors">
                selorm@typhoonentertainment.ca
              </a>
            </div>
          </div>
          
          <div className="border-t pt-6">
            <h3 className="font-semibold mb-4">Follow Us</h3>
            <div className="flex items-center gap-6">
               <Button asChild variant="outline" size="icon">
                  <Link href="https://www.facebook.com/share/1JndZR7e8X/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                    <Facebook className="h-5 w-5" />
                  </Link>
               </Button>
               <Button asChild variant="outline" size="icon">
                 <Link href="https://www.instagram.com/typhoonentertainment/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <Instagram className="h-5 w-5" />
                  </Link>
               </Button>
               <Button asChild variant="outline" size="icon">
                 <Link href="#" aria-label="YouTube">
                    <Youtube className="h-5 w-5" />
                  </Link>
               </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
