import React, { useState } from "react";
import { Head, Link, useForm, usePage } from "@/lib/inertia";
import type { AuthLoginProps } from "@/types";
import { Logo } from "@/components/Logo";
import { user_session_create_path } from "@/routes";

export default function Login() {
  const { props } = usePage<AuthLoginProps>();
  const { flash } = props;
  const [loginMethod, setLoginMethod] = useState<"password" | "magic">(
    "password",
  );

  const passwordForm = useForm(
    {
      email: "",
      password: "",
      remember: false,
    },
    user_session_create_path.post()
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

      <div className="flex min-h-screen">
        {/* Left Panel - Decorative */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-indigo-950 via-indigo-900 to-slate-900">
          {/* Abstract mesh gradient overlay */}
          <div className="absolute inset-0 opacity-40">
            <div className="absolute top-1/4 -left-20 w-96 h-96 bg-indigo-500 rounded-full blur-3xl animate-pulse" />
            <div
              className="absolute bottom-1/4 right-0 w-80 h-80 bg-violet-600 rounded-full blur-3xl animate-pulse"
              style={{ animationDelay: "1s" }}
            />
            <div
              className="absolute top-1/2 left-1/3 w-64 h-64 bg-cyan-500 rounded-full blur-3xl animate-pulse"
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
                Manage your relationships with clarity
              </h1>
              <p className="text-indigo-200 text-lg leading-relaxed">
                A simple CRM built for teams who value simplicity without
                sacrificing power.
              </p>
            </div>

            {/* Decorative footer */}
            <div className="flex items-center space-x-4 text-sm text-indigo-300">
              <span className="w-12 h-px bg-indigo-500" />
              <span>Trusted by growing teams</span>
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
                Welcome back
              </h2>
              <p className="mt-2 text-gray-500">
                Don't have an account?{" "}
                <Link
                  href="/users/register"
                  className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
                >
                  Create one now
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
            {flash?.success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-100 rounded-xl text-sm text-green-700">
                {flash.success}
              </div>
            )}

            {/* Method Toggle */}
            <div className="flex bg-gray-100 p-1 rounded-xl mb-8">
              <button
                type="button"
                onClick={() => setLoginMethod("password")}
                className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all ${
                  loginMethod === "password"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Password
              </button>
              <button
                type="button"
                onClick={() => setLoginMethod("magic")}
                className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all ${
                  loginMethod === "magic"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Magic Link
              </button>
            </div>

            {/* Password Login Form */}
            {loginMethod === "password" && (
              <form onSubmit={handlePasswordSubmit} className="space-y-5">
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
                    value={passwordForm.data.email}
                    onChange={(e) =>
                      passwordForm.setData("email", e.target.value)
                    }
                    className="block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    placeholder="you@example.com"
                  />
                  {passwordForm.errors.email && (
                    <p className="mt-2 text-sm text-red-600">
                      {passwordForm.errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={passwordForm.data.password}
                    onChange={(e) =>
                      passwordForm.setData("password", e.target.value)
                    }
                    className="block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    placeholder="Enter your password"
                  />
                  {passwordForm.errors.password && (
                    <p className="mt-2 text-sm text-red-600">
                      {passwordForm.errors.password}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={passwordForm.data.remember}
                      onChange={(e) =>
                        passwordForm.setData("remember", e.target.checked)
                      }
                      className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="ml-2 text-sm text-gray-600">
                      Remember me
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={passwordForm.processing}
                  className="w-full py-3.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30"
                >
                  {passwordForm.processing ? (
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
                      Signing in...
                    </span>
                  ) : (
                    "Sign in"
                  )}
                </button>
              </form>
            )}

            {/* Magic Link Form */}
            {loginMethod === "magic" && (
              <form onSubmit={handleMagicSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="magic-email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email address
                  </label>
                  <input
                    id="magic-email"
                    type="email"
                    autoComplete="email"
                    required
                    value={magicForm.data.email}
                    onChange={(e) => magicForm.setData("email", e.target.value)}
                    className="block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    placeholder="you@example.com"
                  />
                  {magicForm.errors.email && (
                    <p className="mt-2 text-sm text-red-600">
                      {magicForm.errors.email}
                    </p>
                  )}
                </div>

                <p className="text-sm text-gray-500">
                  We'll send you a secure link to sign in without a password.
                </p>

                <button
                  type="submit"
                  disabled={magicForm.processing}
                  className="w-full py-3.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30"
                >
                  {magicForm.processing ? (
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
                      Sending link...
                    </span>
                  ) : (
                    "Send magic link"
                  )}
                </button>
              </form>
            )}

            {/* Footer */}
            <p className="mt-10 text-center text-sm text-gray-400">
              Secure login powered by PingCRM
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
