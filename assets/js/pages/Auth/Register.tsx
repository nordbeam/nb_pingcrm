import React from "react";
import { Head, Link, useForm, usePage } from "@/lib/inertia";
import type { AuthRegisterProps } from "@/types";
import { Logo } from "@/components/Logo";

export default function Register() {
  const { props } = usePage<AuthRegisterProps>();
  const { flash, errors } = props;

  const form = useForm({
    email: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    form.post("/users/register");
  };

  return (
    <>
      <Head title="Create Account" />

      <div className="flex min-h-screen">
        {/* Left Panel - Decorative */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-indigo-950 via-indigo-900 to-slate-900">
          {/* Abstract mesh gradient overlay */}
          <div className="absolute inset-0 opacity-40">
            <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-emerald-500 rounded-full blur-3xl animate-pulse" />
            <div
              className="absolute top-1/4 right-0 w-80 h-80 bg-violet-600 rounded-full blur-3xl animate-pulse"
              style={{ animationDelay: "1s" }}
            />
            <div
              className="absolute top-1/2 left-1/2 w-64 h-64 bg-indigo-400 rounded-full blur-3xl animate-pulse"
              style={{ animationDelay: "2s" }}
            />
          </div>

          {/* Grid pattern overlay */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />

          {/* Content */}
          <div className="relative z-10 flex flex-col justify-between p-12 text-white">
            {/* Logo */}
            <div>
              <Link href="/">
                <Logo variant="dark" />
              </Link>
            </div>

            {/* Tagline */}
            <div className="max-w-md">
              <h1
                className="text-4xl font-light leading-tight tracking-tight mb-6"
                style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
              >
                Start building better relationships today
              </h1>
              <p className="text-indigo-200 text-lg leading-relaxed">
                Join thousands of teams using PingCRM to manage contacts,
                organizations, and grow their business.
              </p>

              {/* Features */}
              <div className="mt-10 space-y-4">
                {[
                  "Unlimited contacts & organizations",
                  "Team collaboration built-in",
                  "Reports & analytics",
                ].map((feature, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <svg
                        className="w-3 h-3 text-emerald-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-indigo-100">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Decorative footer */}
            <div className="flex items-center space-x-4 text-sm text-indigo-300">
              <span className="w-12 h-px bg-indigo-500" />
              <span>Free to get started</span>
            </div>
          </div>
        </div>

        {/* Right Panel - Form */}
        <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-20 bg-white">
          <div className="mx-auto w-full max-w-2xl">
            {/* Mobile Logo */}
            <div className="lg:hidden mb-10">
              <Link href="/" className="text-indigo-900">
                <Logo variant="light" />
              </Link>
            </div>

            {/* Header */}
            <div className="mb-10">
              <h2 className="text-3xl font-semibold text-gray-900 tracking-tight">
                Create your account
              </h2>
              <p className="mt-2 text-gray-500">
                Already have an account?{" "}
                <Link
                  href="/users/log-in"
                  className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </div>

            {/* Flash Messages */}
            {flash?.info && (
              <div className="mb-6 p-4 bg-blue-50 border border-blue-100 rounded-xl text-sm text-blue-700">
                {flash.info}
              </div>
            )}
            {flash?.error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl text-sm text-red-700">
                {flash.error}
              </div>
            )}

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={form.data.email}
                  onChange={(e) => form.setData("email", e.target.value)}
                  className="block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="you@example.com"
                />
                {(form.errors.email || errors?.email) && (
                  <p className="mt-2 text-sm text-red-600">
                    {form.errors.email || errors?.email}
                  </p>
                )}
              </div>

              <p className="text-sm text-gray-500">
                We'll send you a confirmation link to verify your email address.
              </p>

              <button
                type="submit"
                disabled={form.processing}
                className="w-full py-3.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30"
              >
                {form.processing ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Creating account...
                  </span>
                ) : (
                  "Create account"
                )}
              </button>

              <p className="text-xs text-gray-400 text-center">
                By creating an account, you agree to our{" "}
                <a href="#" className="text-indigo-600 hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-indigo-600 hover:underline">
                  Privacy Policy
                </a>
              </p>
            </form>

            {/* Footer */}
            <p className="mt-10 text-center text-sm text-gray-400">
              Secure registration powered by PingCRM
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
