import { Head, Link, useForm, usePage } from "@/lib/inertia";
import type { AuthRegisterProps } from "@/types";
import { Logo } from "@/components/Logo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { user_registrations } from "@/routes";
import { Loader2, Mail, Check } from "lucide-react";

export default function Register() {
  const { props } = usePage<AuthRegisterProps>();
  const { flash, errors } = props;

  const form = useForm(
    {
      email: "",
    },
    user_registrations.create()
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    form.submit();
  };

  const features = [
    "Unlimited contacts & organizations",
    "Team collaboration built-in",
    "Reports & analytics",
  ];

  return (
    <>
      <Head title="Create Account" />

      <div className="flex min-h-screen bg-background">
        {/* Left Panel - Decorative */}
        <div className="hidden lg:flex lg:w-[45%] relative overflow-hidden bg-primary">
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/80" />

          {/* Geometric pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-20 w-64 h-64 border border-white/20 rounded-full" />
            <div className="absolute top-40 left-40 w-48 h-48 border border-white/20 rounded-full" />
            <div className="absolute bottom-32 right-20 w-80 h-80 border border-white/20 rounded-full" />
            <div className="absolute bottom-48 right-40 w-56 h-56 border border-white/20 rounded-full" />
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col justify-between p-12 text-white">
            <div>
              <Link href="/">
                <Logo variant="dark" />
              </Link>
            </div>

            <div className="max-w-sm">
              <h1 className="text-3xl font-semibold leading-tight tracking-tight mb-4">
                Start building better relationships
              </h1>
              <p className="text-white/70 leading-relaxed mb-8">
                Join teams using PingCRM to manage contacts, organizations, and grow their business.
              </p>

              {/* Features */}
              <div className="space-y-3">
                {features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                    <span className="text-white/80 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-sm text-white/50">
              Free to get started
            </div>
          </div>
        </div>

        {/* Right Panel - Form */}
        <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-16">
          <div className="mx-auto w-full max-w-sm">
            {/* Mobile Logo */}
            <div className="lg:hidden mb-8">
              <Link href="/">
                <Logo variant="light" />
              </Link>
            </div>

            {/* Header */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-foreground">
                Create your account
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  href="/users/log-in"
                  className="font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </div>

            {/* Flash Messages */}
            {flash?.info && (
              <div className="mb-6 px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
                {flash.info}
              </div>
            )}
            {flash?.error && (
              <div className="mb-6 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-800">
                {flash.error}
              </div>
            )}

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-foreground mb-1.5"
                >
                  Email address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={form.data.email}
                    onChange={(e) => form.setData("email", e.target.value)}
                    className="pl-9"
                    placeholder="you@example.com"
                  />
                </div>
                {(form.errors.email || errors?.email) && (
                  <p className="mt-1.5 text-sm text-destructive">
                    {form.errors.email || errors?.email}
                  </p>
                )}
              </div>

              <p className="text-sm text-muted-foreground">
                We'll send you a confirmation link to verify your email address.
              </p>

              <Button
                type="submit"
                disabled={form.processing}
                className="w-full"
              >
                {form.processing ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "Create account"
                )}
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                By creating an account, you agree to our{" "}
                <a href="#" className="text-primary hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-primary hover:underline">
                  Privacy Policy
                </a>
              </p>
            </form>

            {/* Footer */}
            <p className="mt-8 text-center text-xs text-muted-foreground">
              Secure registration powered by PingCRM
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
