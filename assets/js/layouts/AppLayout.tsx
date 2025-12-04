import { useState, useEffect } from "react";
import { Link, usePage } from "@/lib/inertia";
import type { AuthProps } from "@/types";
import { LogoIcon } from "@/components/Logo";
import { AppSidebar } from "@/components/AppSidebar";
import {
  CheckCircle,
  XCircle,
  Info,
  AlertTriangle,
  X,
} from "lucide-react";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";

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

export default function AppLayout({ children }: AppLayoutProps) {
  const { props } = usePage<AuthProps>();
  const { flash } = props;

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* Mobile Header Only */}
        <header className="flex h-12 items-center gap-2 border-b border-border bg-background px-4 md:hidden">
          <SidebarTrigger className="-ml-1" />
          <div className="h-4 w-px bg-border" />
          <Link href="/" className="flex items-center">
            <LogoIcon className="h-5 w-5 text-primary" />
          </Link>
        </header>

        {/* Flash Messages */}
        <FlashMessages flash={flash} />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

// Flash Messages Component
function FlashMessages({ flash }: { flash: Flash }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (flash && Object.keys(flash).length > 0) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [flash]);

  if (!flash || Object.keys(flash).length === 0 || !visible) return null;

  return (
    <div className="px-6 pt-4">
      <div className="mx-auto max-w-5xl space-y-2">
        {flash.success && (
          <div className="flex items-center gap-3 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
            <CheckCircle className="h-4 w-4 shrink-0 text-emerald-500" />
            <span className="flex-1">{flash.success}</span>
            <button
              onClick={() => setVisible(false)}
              className="text-emerald-600 hover:text-emerald-800"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
        {flash.error && (
          <div className="flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            <XCircle className="h-4 w-4 shrink-0 text-red-500" />
            <span className="flex-1">{flash.error}</span>
            <button
              onClick={() => setVisible(false)}
              className="text-red-600 hover:text-red-800"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
        {flash.info && (
          <div className="flex items-center gap-3 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800">
            <Info className="h-4 w-4 shrink-0 text-blue-500" />
            <span className="flex-1">{flash.info}</span>
            <button
              onClick={() => setVisible(false)}
              className="text-blue-600 hover:text-blue-800"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
        {flash.warning && (
          <div className="flex items-center gap-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            <AlertTriangle className="h-4 w-4 shrink-0 text-amber-500" />
            <span className="flex-1">{flash.warning}</span>
            <button
              onClick={() => setVisible(false)}
              className="text-amber-600 hover:text-amber-800"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
