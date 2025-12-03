import React from "react";
import { usePage, Head } from "@/lib/inertia";
import type { DashboardProps } from "@/types";

// DashboardProps extends AuthProps - shared props are auto-included via inertia_shared(Auth)
export default function Dashboard() {
  const { props } = usePage<DashboardProps>();
  const { user, stats } = props;

  return (
    <>
      <Head title="Dashboard" />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Welcome back{user?.firstName ? `, ${user.firstName}` : ""}!
          </p>
        </div>

        {/* Stats Grid */}
        <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Contacts"
            value={String(stats?.contacts ?? 0)}
            icon={ContactIcon}
            color="indigo"
          />
          <StatCard
            title="Total Organizations"
            value={String(stats?.organizations ?? 0)}
            icon={OrganizationIcon}
            color="green"
          />
          <StatCard
            title="Active Users"
            value={String(stats?.users ?? 0)}
            icon={UserIcon}
            color="blue"
          />
          <StatCard
            title="This Month"
            value="$0"
            icon={ChartIcon}
            color="purple"
          />
        </div>

        {/* Recent Activity */}
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Recent Activity
          </h2>
          <div className="text-center text-gray-500 py-8">
            <p>No recent activity to show.</p>
            <p className="mt-2 text-sm">
              Create organizations and contacts to see activity here.
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <QuickActionCard
            title="Add Organization"
            description="Create a new organization to manage"
            href="/organizations/create"
            icon={PlusIcon}
          />
          <QuickActionCard
            title="Add Contact"
            description="Add a new contact to your CRM"
            href="/contacts/create"
            icon={PlusIcon}
          />
          <QuickActionCard
            title="View Reports"
            description="View analytics and reports"
            href="/reports"
            icon={ChartIcon}
          />
        </div>
      </div>
    </>
  );
}

// Stat Card Component
interface StatCardProps {
  title: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  color: "indigo" | "green" | "blue" | "purple";
}

function StatCard({ title, value, icon: Icon, color }: StatCardProps) {
  const colors = {
    indigo: "bg-indigo-500",
    green: "bg-green-500",
    blue: "bg-blue-500",
    purple: "bg-purple-500",
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <div className="flex items-center">
        <div className={`rounded-lg ${colors[color]} p-3`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );
}

// Quick Action Card Component
interface QuickActionCardProps {
  title: string;
  description: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

function QuickActionCard({ title, description, href, icon: Icon }: QuickActionCardProps) {
  return (
    <a
      href={href}
      className="group flex items-center rounded-lg bg-white p-6 shadow transition hover:shadow-md"
    >
      <div className="rounded-lg bg-gray-100 p-3 transition group-hover:bg-indigo-100">
        <Icon className="h-6 w-6 text-gray-600 transition group-hover:text-indigo-600" />
      </div>
      <div className="ml-4">
        <p className="font-medium text-gray-900 group-hover:text-indigo-600">
          {title}
        </p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </a>
  );
}

// Icons
function ContactIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
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

function UserIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  );
}

function ChartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  );
}

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  );
}
