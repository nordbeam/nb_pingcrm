import { usePage, Head, Link } from "@/lib/inertia";
import { socket, useChannelProps, usePresence } from "@/lib/socket";
import { contacts, organizations, users } from "@/routes";
import type { DashboardProps, Activity } from "@/types";
import {
  Users,
  Building2,
  User,
  TrendingUp,
  Clock,
  Plus,
  type LucideIcon,
  CircleDot,
  UserPlus,
  Pencil,
  Trash2,
  RotateCcw,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

// Channel event types
interface CrmEvents {
  stats_updated: Record<string, never>;
  activity_created: { activity: Activity };
}

export default function Dashboard() {
  const { props: serverProps } = usePage<DashboardProps>();

  // Real-time props with automatic updates
  const { props } = useChannelProps<DashboardProps, CrmEvents>(
    socket,
    "crm:lobby",
    {
      // Reload stats from server when stats_updated event is received
      stats_updated: {
        prop: "stats",
        strategy: "reload",
      },
      // Prepend new activities to the list
      activity_created: {
        prop: "activities",
        strategy: "prepend",
        transform: (event) => event.activity,
      },
    },
    { initialProps: serverProps }
  );

  // Online users presence
  const presence = usePresence<{
    user_id: number;
    name: string;
    email: string;
    online_at: number;
  }>(socket, "crm:lobby");

  const onlineUsers = presence.list();
  const { user, stats, activities } = props;

  return (
    <>
      <Head title="Dashboard" />

      <div className="px-6 py-6">
        <div className="mx-auto max-w-5xl">
          {/* Page Header */}
          <div className="mb-8 flex items-start justify-between">
            <div>
              <h1 className="text-xl font-semibold text-foreground">
                Good {getGreeting()}
                {user?.firstName ? `, ${user.firstName}` : ""}
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Here's what's happening with your CRM today.
              </p>
            </div>
            {/* Online Users Indicator */}
            {onlineUsers.length > 0 && (
              <OnlineUsersIndicator users={onlineUsers} />
            )}
          </div>

          {/* Stats Grid */}
          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Contacts"
              value={stats?.contacts ?? 0}
              href={contacts.index.url()}
              icon={Users}
            />
            <StatCard
              title="Organizations"
              value={stats?.organizations ?? 0}
              href={organizations.index.url()}
              icon={Building2}
            />
            <StatCard
              title="Users"
              value={stats?.users ?? 0}
              href={users.index.url()}
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
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <CircleDot className="h-2 w-2 animate-pulse text-green-500" />
                      Live
                    </span>
                    <Link
                      href="/reports"
                      className="text-xs font-medium text-primary hover:text-primary/80 transition-colors"
                    >
                      View all
                    </Link>
                  </div>
                </div>
                <div className="p-5">
                  {activities && activities.length > 0 ? (
                    <ActivityFeed activities={activities} />
                  ) : (
                    <EmptyState
                      icon={Clock}
                      title="No recent activity"
                      description="Activity will appear here as you create and update records."
                    />
                  )}
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
                    href={organizations.new.url()}
                    icon={Plus}
                    title="New organization"
                    description="Add a company to manage"
                  />
                  <QuickAction
                    href={contacts.new.url()}
                    icon={Plus}
                    title="New contact"
                    description="Add a person to your CRM"
                  />
                  <QuickAction
                    href={users.new.url()}
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

// Online Users Indicator
interface OnlineUsersIndicatorProps {
  users: Array<{ metas: Array<{ name: string; email: string }> }>;
}

function OnlineUsersIndicator({ users }: OnlineUsersIndicatorProps) {
  const allUsers = users.flatMap((u) => u.metas);
  const displayLimit = 3;
  const displayUsers = allUsers.slice(0, displayLimit);
  const remainingCount = allUsers.length - displayLimit;

  return (
    <div className="flex items-center gap-2">
      <div className="flex -space-x-2">
        {displayUsers.map((user, i) => (
          <div
            key={i}
            className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-primary/10 text-xs font-medium text-primary"
            title={user.name}
          >
            {user.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()}
            <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-background bg-green-500" />
          </div>
        ))}
        {remainingCount > 0 && (
          <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-muted text-xs font-medium text-muted-foreground">
            +{remainingCount}
          </div>
        )}
      </div>
      <span className="text-xs text-muted-foreground">
        {allUsers.length} online
      </span>
    </div>
  );
}

// Stat Card Component
interface StatCardProps {
  title: string;
  value: number | string;
  href: string;
  icon: LucideIcon;
  isMonetary?: boolean;
}

function StatCard({
  title,
  value,
  href,
  icon: Icon,
  isMonetary,
}: StatCardProps) {
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
            {isMonetary ? value : typeof value === "number" ? value.toLocaleString() : value}
          </p>
        </div>
        <div className="rounded-md bg-primary/5 p-2 transition-colors group-hover:bg-primary/10">
          <Icon className="h-4 w-4 text-primary" />
        </div>
      </div>
    </Link>
  );
}

// Activity Feed Component
interface ActivityFeedProps {
  activities: Activity[];
}

function ActivityFeed({ activities }: ActivityFeedProps) {
  return (
    <div className="space-y-3">
      {activities.map((activity) => (
        <ActivityItem key={activity.id} activity={activity} />
      ))}
    </div>
  );
}

// Activity Item Component
interface ActivityItemProps {
  activity: Activity;
}

function ActivityItem({ activity }: ActivityItemProps) {
  const ActionIcon = getActionIcon(activity.action);
  const actionColor = getActionColor(activity.action);

  return (
    <div className="flex items-start gap-3 rounded-md px-2 py-2 transition-colors hover:bg-accent/50">
      <div
        className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${actionColor}`}
      >
        <ActionIcon className="h-3.5 w-3.5" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm text-foreground">
          <span className="font-medium">{activity.userName || "System"}</span>{" "}
          {getActionVerb(activity.action)}{" "}
          <span className="font-medium">{activity.resourceName}</span>
          <span className="text-muted-foreground">
            {" "}
            ({activity.resourceType})
          </span>
        </p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {formatDistanceToNow(new Date(activity.insertedAt), {
            addSuffix: true,
          })}
        </p>
      </div>
    </div>
  );
}

function getActionIcon(action: string): LucideIcon {
  switch (action) {
    case "created":
      return UserPlus;
    case "updated":
      return Pencil;
    case "deleted":
      return Trash2;
    case "restored":
      return RotateCcw;
    default:
      return Clock;
  }
}

function getActionColor(action: string): string {
  switch (action) {
    case "created":
      return "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400";
    case "updated":
      return "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400";
    case "deleted":
      return "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400";
    case "restored":
      return "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400";
    default:
      return "bg-muted text-muted-foreground";
  }
}

function getActionVerb(action: string): string {
  switch (action) {
    case "created":
      return "created";
    case "updated":
      return "updated";
    case "deleted":
      return "deleted";
    case "restored":
      return "restored";
    default:
      return action;
  }
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
