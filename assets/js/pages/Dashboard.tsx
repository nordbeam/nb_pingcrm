import { usePage, Head, Link } from "@/lib/inertia";
import type { DashboardProps } from "@/types";
import {
  Users,
  Building2,
  User,
  TrendingUp,
  Clock,
  Plus,
  type LucideIcon,
} from "lucide-react";

export default function Dashboard() {
  const { props } = usePage<DashboardProps>();
  const { user, stats } = props;

  return (
    <>
      <Head title="Dashboard" />

      <div className="px-6 py-6">
        <div className="mx-auto max-w-5xl">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-xl font-semibold text-foreground">
              Good {getGreeting()}{user?.firstName ? `, ${user.firstName}` : ""}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Here's what's happening with your CRM today.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Contacts"
              value={stats?.contacts ?? 0}
              href="/contacts"
              icon={Users}
            />
            <StatCard
              title="Organizations"
              value={stats?.organizations ?? 0}
              href="/organizations"
              icon={Building2}
            />
            <StatCard
              title="Users"
              value={stats?.users ?? 0}
              href="/users"
              icon={User}
            />
            <StatCard
              title="Revenue"
              value="$0"
              href="/reports"
              icon={TrendingUp}
              isMonetary
            />
          </div>

          {/* Content Grid */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Recent Activity */}
            <div className="lg:col-span-2">
              <div className="rounded-lg border border-border bg-card">
                <div className="flex items-center justify-between border-b border-border px-5 py-4">
                  <h2 className="text-sm font-medium text-foreground">
                    Recent Activity
                  </h2>
                  <Link
                    href="/reports"
                    className="text-xs font-medium text-primary hover:text-primary/80 transition-colors"
                  >
                    View all
                  </Link>
                </div>
                <div className="p-5">
                  <EmptyState
                    icon={Clock}
                    title="No recent activity"
                    description="Activity will appear here as you create and update records."
                  />
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <div className="rounded-lg border border-border bg-card">
                <div className="border-b border-border px-5 py-4">
                  <h2 className="text-sm font-medium text-foreground">
                    Quick Actions
                  </h2>
                </div>
                <div className="p-2">
                  <QuickAction
                    href="/organizations/new"
                    icon={Plus}
                    title="New organization"
                    description="Add a company to manage"
                  />
                  <QuickAction
                    href="/contacts/new"
                    icon={Plus}
                    title="New contact"
                    description="Add a person to your CRM"
                  />
                  <QuickAction
                    href="/users/new"
                    icon={Plus}
                    title="Invite user"
                    description="Add a team member"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Get time-based greeting
function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "morning";
  if (hour < 18) return "afternoon";
  return "evening";
}

// Stat Card Component
interface StatCardProps {
  title: string;
  value: number | string;
  href: string;
  icon: LucideIcon;
  isMonetary?: boolean;
}

function StatCard({ title, value, href, icon: Icon, isMonetary }: StatCardProps) {
  return (
    <Link
      href={href}
      className="group rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary/20 hover:bg-accent/50"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {title}
          </p>
          <p className="mt-2 text-2xl font-semibold tabular-nums text-foreground">
            {isMonetary ? value : value.toLocaleString()}
          </p>
        </div>
        <div className="rounded-md bg-primary/5 p-2 transition-colors group-hover:bg-primary/10">
          <Icon className="h-4 w-4 text-primary" />
        </div>
      </div>
    </Link>
  );
}

// Quick Action Component
interface QuickActionProps {
  href: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

function QuickAction({ href, icon: Icon, title, description }: QuickActionProps) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-md px-3 py-2.5 transition-colors hover:bg-accent"
    >
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/5">
        <Icon className="h-4 w-4 text-primary" />
      </div>
      <div className="min-w-0">
        <p className="text-sm font-medium text-foreground">{title}</p>
        <p className="truncate text-xs text-muted-foreground">{description}</p>
      </div>
    </Link>
  );
}

// Empty State Component
interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

function EmptyState({ icon: Icon, title, description }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <div className="rounded-full bg-muted p-3">
        <Icon className="h-5 w-5 text-muted-foreground" />
      </div>
      <h3 className="mt-3 text-sm font-medium text-foreground">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
