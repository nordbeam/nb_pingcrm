import { useState } from "react";
import { Head, Link, useForm, usePage } from "@/lib/inertia";
import type { AuthLoginProps } from "@/types";
import { Logo } from "@/components/Logo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { user_sessions } from "@/routes";
import { Loader2, Mail, Lock, Sparkles } from "lucide-react";

export default function Login() {
  const { props } = usePage<AuthLoginProps>();
  const { flash } = props;
  const [loginMethod, setLoginMethod] = useState<"password" | "magic">("password");

  const passwordForm = useForm(
    {
      email: "",
      password: "",
      remember: false,
    },
    user_sessions.create()
  );

  const magicForm = useForm(
    {
      email: "",
    },
    { url: "/users/magic-link", method: "post" }
  );

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    passwordForm.transform((data) => ({ user: data }));
    passwordForm.submit({
      onFinish: () => passwordForm.reset("password"),
    });
  };

  const handleMagicSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    magicForm.transform((data) => ({ user: data }));
    magicForm.submit();
  };

  return (
    <>
      <Head title="Sign In" />

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
                Manage relationships with clarity
              </h1>
              <p className="text-white/70 leading-relaxed">
                A modern CRM built for teams who value simplicity without sacrificing power.
              </p>
            </div>

            <div className="text-sm text-white/50">
              Trusted by growing teams worldwide
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
                Welcome back
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link
                  href="/users/register"
                  className="font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  Create one
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
            {flash?.success && (
              <div className="mb-6 px-4 py-3 bg-emerald-50 border border-emerald-200 rounded-lg text-sm text-emerald-800">
                {flash.success}
              </div>
            )}

            {/* Method Toggle */}
            <div className="flex bg-secondary p-1 rounded-lg mb-6">
              <button
                type="button"
                onClick={() => setLoginMethod("password")}
                className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-md transition-all ${
                  loginMethod === "password"
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Lock className="h-4 w-4" />
                Password
              </button>
              <button
                type="button"
                onClick={() => setLoginMethod("magic")}
                className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-md transition-all ${
                  loginMethod === "magic"
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Sparkles className="h-4 w-4" />
                Magic Link
              </button>
            </div>

            {/* Password Login Form */}
            {loginMethod === "password" && (
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-foreground mb-1.5"
                  >
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={passwordForm.data.email}
                      onChange={(e) => passwordForm.setData("email", e.target.value)}
                      className="pl-9"
                      placeholder="you@example.com"
                    />
                  </div>
                  {passwordForm.errors.email && (
                    <p className="mt-1.5 text-sm text-destructive">
                      {passwordForm.errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-foreground mb-1.5"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      value={passwordForm.data.password}
                      onChange={(e) => passwordForm.setData("password", e.target.value)}
                      className="pl-9"
                      placeholder="Enter your password"
                    />
                  </div>
                  {passwordForm.errors.password && (
                    <p className="mt-1.5 text-sm text-destructive">
                      {passwordForm.errors.password}
                    </p>
                  )}
                </div>

                <div className="flex items-center">
                  <input
                    id="remember"
                    type="checkbox"
                    checked={passwordForm.data.remember}
                    onChange={(e) => passwordForm.setData("remember", e.target.checked)}
                    className="h-4 w-4 rounded border-border text-primary focus:ring-primary/20"
                  />
                  <label htmlFor="remember" className="ml-2 text-sm text-muted-foreground">
                    Remember me
                  </label>
                </div>

                <Button
                  type="submit"
                  disabled={passwordForm.processing}
                  className="w-full"
                >
                  {passwordForm.processing ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    "Sign in"
                  )}
                </Button>
              </form>
            )}

            {/* Magic Link Form */}
            {loginMethod === "magic" && (
              <form onSubmit={handleMagicSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="magic-email"
                    className="block text-sm font-medium text-foreground mb-1.5"
                  >
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="magic-email"
                      type="email"
                      autoComplete="email"
                      required
                      value={magicForm.data.email}
                      onChange={(e) => magicForm.setData("email", e.target.value)}
                      className="pl-9"
                      placeholder="you@example.com"
                    />
                  </div>
                  {magicForm.errors.email && (
                    <p className="mt-1.5 text-sm text-destructive">
                      {magicForm.errors.email}
                    </p>
                  )}
                </div>

                <p className="text-sm text-muted-foreground">
                  We'll send you a secure link to sign in without a password.
                </p>

                <Button
                  type="submit"
                  disabled={magicForm.processing}
                  className="w-full"
                >
                  {magicForm.processing ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending link...
                    </>
                  ) : (
                    "Send magic link"
                  )}
                </Button>
              </form>
            )}

            {/* Footer */}
            <p className="mt-8 text-center text-xs text-muted-foreground">
              Secure login powered by PingCRM
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
