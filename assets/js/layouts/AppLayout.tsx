import { useState } from "react";
import { Link, usePage } from "@/lib/inertia";
import type { AuthProps } from "@/types";
import { cn } from "@/lib/utils";
import { user_session_delete_path } from "@/routes";
import { Logo } from "@/components/Logo";

interface AppLayoutProps {
  children: React.ReactNode;
}

// Flash message type
interface Flash {
  success?: string;
  error?: string;
  info?: string;
  warning?: string;
}

// Navigation items
const mainNav = [
  { name: "Dashboard", href: "/", icon: DashboardIcon },
  { name: "Organizations", href: "/organizations", icon: OrganizationIcon },
  { name: "Contacts", href: "/contacts", icon: ContactIcon },
  { name: "Users", href: "/users", icon: UserIcon },
  { name: "Reports", href: "/reports", icon: ReportIcon },
];

export default function AppLayout({ children }: AppLayoutProps) {
  const { props, url } = usePage<AuthProps>();
  const { user, account, flash } = props;
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      {/* Header */}
      <header className="bg-indigo-900">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center text-white">
            <Logo variant="dark" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center space-x-4 md:flex">
            {mainNav.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  url.startsWith(item.href) && item.href !== "/"
                    ? "bg-indigo-800 text-white"
                    : url === "/" && item.href === "/"
                      ? "bg-indigo-800 text-white"
                      : "text-indigo-300 hover:bg-indigo-800 hover:text-white"
                )}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.name}
              </Link>
            ))}
          </nav>

          {/* User Menu */}
          <div className="flex items-center">
            {user && (
              <div className="relative">
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-indigo-300 transition-colors hover:bg-indigo-800 hover:text-white"
                >
                  {user.photo ? (
                    <img
                      src={user.photo}
                      alt=""
                      className="mr-2 h-8 w-8 rounded-full"
                    />
                  ) : (
                    <span className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-700 text-white">
                      {user.firstName?.[0]}
                      {user.lastName?.[0]}
                    </span>
                  )}
                  <span className="hidden md:inline">{user.name}</span>
                  <ChevronDownIcon className="ml-1 h-4 w-4" />
                </button>

                {menuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setMenuOpen(false)}
                    />
                    <div className="absolute right-0 z-20 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                      <Link
                        href="/users/settings"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setMenuOpen(false)}
                      >
                        My Profile
                      </Link>
                      <Link
                        href="/users"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setMenuOpen(false)}
                      >
                        Manage Users
                      </Link>
                      <hr className="my-1" />
                      <Link
                        href={user_session_delete_path.delete()}
                        className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </Link>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="ml-4 rounded-md p-2 text-indigo-300 hover:bg-indigo-800 hover:text-white md:hidden"
            >
              <MenuIcon className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <nav className="border-t border-indigo-800 md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {mainNav.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center rounded-md px-3 py-2 text-base font-medium",
                    url.startsWith(item.href) && item.href !== "/"
                      ? "bg-indigo-800 text-white"
                      : url === "/" && item.href === "/"
                        ? "bg-indigo-800 text-white"
                        : "text-indigo-300 hover:bg-indigo-800 hover:text-white"
                  )}
                  onClick={() => setMenuOpen(false)}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </header>

      {/* Flash Messages */}
      <FlashMessages flash={flash} />

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="border-t bg-white py-4 text-center text-sm text-gray-500">
        <span className="text-gray-400">
          {account?.name && (
            <span className="mr-2">{account?.name}</span>
          )}
        </span>
        <span>Powered by nb_pingcrm</span>
      </footer>
    </div>
  );
}

// Flash Messages Component
function FlashMessages({ flash }: { flash: Flash }) {
  if (!flash || Object.keys(flash).length === 0) return null;

  return (
    <div className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
      {flash.success && (
        <div className="mb-4 rounded-md bg-green-50 p-4">
          <div className="flex">
            <CheckCircleIcon className="h-5 w-5 text-green-400" />
            <p className="ml-3 text-sm font-medium text-green-800">
              {flash.success}
            </p>
          </div>
        </div>
      )}
      {flash.error && (
        <div className="mb-4 rounded-md bg-red-50 p-4">
          <div className="flex">
            <XCircleIcon className="h-5 w-5 text-red-400" />
            <p className="ml-3 text-sm font-medium text-red-800">
              {flash.error}
            </p>
          </div>
        </div>
      )}
      {flash.info && (
        <div className="mb-4 rounded-md bg-blue-50 p-4">
          <div className="flex">
            <InfoIcon className="h-5 w-5 text-blue-400" />
            <p className="ml-3 text-sm font-medium text-blue-800">
              {flash.info}
            </p>
          </div>
        </div>
      )}
      {flash.warning && (
        <div className="mb-4 rounded-md bg-yellow-50 p-4">
          <div className="flex">
            <WarningIcon className="h-5 w-5 text-yellow-400" />
            <p className="ml-3 text-sm font-medium text-yellow-800">
              {flash.warning}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// Icons
function DashboardIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  );
}

function OrganizationIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  );
}

function ContactIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  );
}

function ReportIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  );
}

function UserIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  );
}

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}

function CheckCircleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
  );
}

function XCircleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
    </svg>
  );
}

function InfoIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
    </svg>
  );
}

function WarningIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
    </svg>
  );
}
