import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { saasConfig } from "@/saas.config";
import { LandingHeader } from "@/components/layout/landing-header";
import {
  ArrowRight,
  Zap,
  Shield,
  Rocket,
  Code,
  Database,
  CreditCard,
  Check
} from "lucide-react";

export default function LandingPage() {
  const plans = saasConfig.billing.plans;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Session-aware header (server component) */}
      <LandingHeader />

      {/* Hero Section */}
      <section className="container flex flex-col items-center justify-center gap-8 py-24 md:py-32">
        <Badge variant="secondary" className="text-sm">
          Ship SaaS products in 14-day sprints
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight text-center sm:text-5xl md:text-6xl lg:text-7xl max-w-4xl">
          The SaaS Factory for
          <span className="text-primary"> Indie Hackers</span>
        </h1>
        <p className="text-xl text-muted-foreground text-center max-w-2xl">
          {saasConfig.metadata.description}. Authentication, billing, AI, and infrastructure - ready to go.
        </p>
        <div className="flex gap-4 mt-4">
          <Link href="/login">
            <Button size="lg" className="gap-2">
              Start Building Free <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <a href="#features">
            <Button size="lg" variant="outline">
              See Features
            </Button>
          </a>
        </div>
        <p className="text-sm text-muted-foreground">
          No credit card required • Free tier available
        </p>
      </section>

      {/* Features Section */}
      <section id="features" className="container py-24 bg-muted/30">
        <div className="flex flex-col items-center gap-4 mb-16">
          <Badge variant="outline">Features</Badge>
          <h2 className="text-3xl font-bold text-center sm:text-4xl">
            Everything you need to launch fast
          </h2>
          <p className="text-lg text-muted-foreground text-center max-w-2xl">
            Built-in infrastructure so you can focus on what makes your product unique
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <Shield className="h-10 w-10 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Authentication</h3>
            <p className="text-muted-foreground">
              Magic link and OAuth ready. Sessions, RBAC, and multi-tenancy built-in.
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <CreditCard className="h-10 w-10 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Billing & Credits</h3>
            <p className="text-muted-foreground">
              Stripe integration with subscriptions and credit system. Webhooks handled.
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <Zap className="h-10 w-10 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">AI Integration</h3>
            <p className="text-muted-foreground">
              OpenAI SDK with credit tracking. Streaming support and usage monitoring.
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <Database className="h-10 w-10 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Database Ready</h3>
            <p className="text-muted-foreground">
              PostgreSQL with Drizzle ORM. Type-safe queries and migrations included.
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <Code className="h-10 w-10 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">GraphQL API</h3>
            <p className="text-muted-foreground">
              Type-safe API with Pothos. React Query hooks auto-generated.
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <Rocket className="h-10 w-10 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Production Ready</h3>
            <p className="text-muted-foreground">
              Sentry error tracking, PostHog analytics, and rate limiting configured.
            </p>
          </Card>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="container py-24">
        <div className="flex flex-col items-center gap-4 mb-16">
          <Badge variant="outline">Pricing</Badge>
          <h2 className="text-3xl font-bold text-center sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="text-lg text-muted-foreground text-center max-w-2xl">
            Start free, scale as you grow
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Free Plan */}
          <Card className="p-8 flex flex-col">
            <h3 className="text-2xl font-bold mb-2">{plans.free.name}</h3>
            <p className="text-muted-foreground mb-6">{plans.free.description}</p>
            <div className="mb-6">
              <span className="text-4xl font-bold">${plans.free.priceMonthly}</span>
              <span className="text-muted-foreground">/month</span>
            </div>
            <Link href="/login" className="mb-6">
              <Button variant="outline" className="w-full">Get Started</Button>
            </Link>
            <div className="space-y-3 flex-grow">
              {plans.free.features.map((feature, i) => (
                <div key={i} className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Pro Plan */}
          <Card className="p-8 flex flex-col border-primary shadow-lg relative">
            <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">Popular</Badge>
            <h3 className="text-2xl font-bold mb-2">{plans.pro.name}</h3>
            <p className="text-muted-foreground mb-6">{plans.pro.description}</p>
            <div className="mb-6">
              <span className="text-4xl font-bold">${plans.pro.priceMonthly}</span>
              <span className="text-muted-foreground">/month</span>
            </div>
            <Link href="/login" className="mb-6">
              <Button className="w-full">Get Started</Button>
            </Link>
            <div className="space-y-3 flex-grow">
              {plans.pro.features.map((feature, i) => (
                <div key={i} className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Enterprise Plan */}
          <Card className="p-8 flex flex-col">
            <h3 className="text-2xl font-bold mb-2">{plans.enterprise.name}</h3>
            <p className="text-muted-foreground mb-6">{plans.enterprise.description}</p>
            <div className="mb-6">
              <span className="text-4xl font-bold">${plans.enterprise.priceMonthly}</span>
              <span className="text-muted-foreground">/month</span>
            </div>
            <Link href="/login" className="mb-6">
              <Button variant="outline" className="w-full">Get Started</Button>
            </Link>
            <div className="space-y-3 flex-grow">
              {plans.enterprise.features.map((feature, i) => (
                <div key={i} className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-24 bg-muted/30">
        <div className="flex flex-col items-center gap-6 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Ready to ship your SaaS?
          </h2>
          <p className="text-lg text-muted-foreground">
            Join indie hackers building products in 14-day sprints. No credit card required.
          </p>
          <Link href="/login">
            <Button size="lg" className="gap-2">
              Start Building Free <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 mt-auto">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            <span className="font-semibold">{saasConfig.metadata.name}</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2025 {saasConfig.metadata.name}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
