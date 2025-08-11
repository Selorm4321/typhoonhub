
"use client";

import * as React from "react";
import Image from "next/image";
import type { Production } from "@/lib/types";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Loader2 } from "lucide-react";

type Props = { project: Production };

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
});


export default function InvestmentProjectCard({ project }: Props) {
  const [amount, setAmount] = React.useState<string>("");
  const [loading, setLoading] = React.useState(false);
  
  const min = (project.minInvestment ?? 2500) / 100;
  const goal = (project.goal ?? 0) / 100;
  const raised = (project.raised ?? 0) / 100;
  const fundingPercentage = goal > 0 ? (raised / goal) * 100 : 0;

  async function handleInvest(e: React.FormEvent) {
    e.preventDefault();
    const dollars = parseFloat(amount);
    if (Number.isNaN(dollars) || dollars <= 0) {
      alert("Enter a valid amount.");
      return;
    }
    if (dollars < min) {
      alert(`Minimum investment is $${min.toFixed(2)}`);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/invest/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId: project.id,
          projectTitle: project.title,
          amountCents: Math.round(dollars * 100),
        }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Checkout failed");
      }
      const { url } = await res.json();
      window.location.href = url;
    } catch (err: any) {
      console.error(err);
      alert(`Could not start checkout: ${err.message}. Please try again.`);
    } finally {
      setLoading(false);
    }
  }

  return (
     <Card className="overflow-hidden shadow-2xl shadow-primary/10">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="relative min-h-[300px] md:min-h-full">
            <Image
                src={project.heroImage || 'https://placehold.co/600x900.png'}
                alt={project.title}
                fill
                className="object-cover"
                data-ai-hint="movie poster"
            />
        </div>

        <div className="flex flex-col p-6">
          <CardHeader className="p-0 mb-4">
            <CardTitle className="font-headline text-3xl">{project.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-0 flex-grow">
            {project.summary ? <p className="text-sm text-muted-foreground">{project.summary}</p> : null}
            
            <div className="space-y-2">
              <h3 className="font-semibold">Funding Status</h3>
              <Progress value={fundingPercentage} aria-label={`${fundingPercentage.toFixed(0)}% funded`} />
              <div className="flex justify-between items-center text-sm font-medium">
                <span className="text-primary">{formatter.format(raised)} raised</span>
                <span className="text-muted-foreground">Goal: {formatter.format(goal)}</span>
              </div>
            </div>

            <form onSubmit={handleInvest} className="space-y-3">
              <label className="font-semibold">Invest Now</label>
              <div className="flex items-center gap-2">
                  <span className="text-xl font-bold">$</span>
                  <Input
                    type="number"
                    inputMode="decimal"
                    min={min}
                    step="0.01"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="text-lg font-bold"
                    placeholder={min.toFixed(2)}
                  />
              </div>
               <Button
                type="submit"
                disabled={loading}
                className="w-full"
                size="lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Invest'
                )}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="bg-secondary/30 p-4 -mx-6 -mb-6 mt-6">
             <p className="text-xs text-muted-foreground text-center w-full">
               Minimum Investment: ${min.toFixed(2)}. Investments are subject to terms and conditions.
            </p>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
}
