import { usePageProps, Head, Link } from '@/lib/inertia';
import {
  Users,
  Building2,
  User,
  TrendingUp,
  Trash2,
  Calendar,
  MapPin,
  BarChart3,
  ArrowUpRight,
  type LucideIcon,
} from 'lucide-react';

// Country code to name mapping
const COUNTRY_NAMES: Record<string, string> = {
  US: 'United States',
  CA: 'Canada',
  MX: 'Mexico',
  GB: 'United Kingdom',
  DE: 'Germany',
  FR: 'France',
  AU: 'Australia',
};

export default function ReportsIndex() {
  const props = usePageProps('Reports/Index');
  const {
    totals,
    contactsByOrganization,
    contactsByCountry,
    organizationsByCountry,
    contactsOverTime,
    recentActivity,
    trashed,
  } = props;

  return (
    <>
      <Head title="Reports" />

      <div className="px-6 py-6">
        <div className="mx-auto max-w-6xl">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-foreground">Reports</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Overview and analytics for your CRM data.
            </p>
          </div>

          {/* Overview Stats */}
          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Total Contacts"
              value={totals?.contacts ?? 0}
              icon={Users}
              href="/contacts"
            />
            <StatCard
              title="Total Organizations"
              value={totals?.organizations ?? 0}
              icon={Building2}
              href="/organizations"
            />
            <StatCard title="Team Members" value={totals?.users ?? 0} icon={User} href="/users" />
            <StatCard
              title="Trashed Items"
              value={(trashed?.contacts ?? 0) + (trashed?.organizations ?? 0)}
              icon={Trash2}
              description={`${trashed?.contacts ?? 0} contacts, ${trashed?.organizations ?? 0} orgs`}
            />
          </div>

          {/* Recent Activity Banner */}
          {recentActivity && (recentActivity.contacts > 0 || recentActivity.organizations > 0) && (
            <div className="mb-8 rounded-lg border border-primary/20 bg-primary/5 p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-md bg-primary/10 p-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Last {recentActivity.days} days activity
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {recentActivity.contacts} new contact{recentActivity.contacts !== 1 ? 's' : ''},{' '}
                    {recentActivity.organizations} new organization
                    {recentActivity.organizations !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Main Content Grid */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Contacts by Organization */}
            <div className="rounded-lg border border-border bg-card">
              <div className="flex items-center justify-between border-b border-border px-5 py-4">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                  <h2 className="text-sm font-medium text-foreground">Contacts by Organization</h2>
                </div>
                <Link
                  href="/contacts"
                  className="text-xs font-medium text-primary hover:text-primary/80"
                >
                  View all
                </Link>
              </div>
              <div className="p-5">
                {contactsByOrganization && contactsByOrganization.length > 0 ? (
                  <div className="space-y-4">
                    {contactsByOrganization.map((org) => (
                      <BarRow
                        key={org.id}
                        label={org.name}
                        value={org.count}
                        maxValue={contactsByOrganization[0]?.count ?? 1}
                        href={`/organizations/${org.id}/edit`}
                      />
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    icon={Building2}
                    title="No data yet"
                    description="Add contacts to organizations to see this report."
                  />
                )}
              </div>
            </div>

            {/* Contacts Over Time */}
            <div className="rounded-lg border border-border bg-card">
              <div className="flex items-center justify-between border-b border-border px-5 py-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <h2 className="text-sm font-medium text-foreground">Contacts Over Time</h2>
                </div>
              </div>
              <div className="p-5">
                {contactsOverTime && contactsOverTime.length > 0 ? (
                  <div className="space-y-4">
                    {contactsOverTime.map((item, index) => (
                      <BarRow
                        key={index}
                        label={item.month}
                        value={item.count}
                        maxValue={Math.max(...contactsOverTime.map((i) => i.count), 1)}
                      />
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    icon={Calendar}
                    title="No data yet"
                    description="Contacts added over time will appear here."
                  />
                )}
              </div>
            </div>

            {/* Contacts by Country */}
            <div className="rounded-lg border border-border bg-card">
              <div className="flex items-center justify-between border-b border-border px-5 py-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <h2 className="text-sm font-medium text-foreground">Contacts by Country</h2>
                </div>
              </div>
              <div className="p-5">
                {contactsByCountry && contactsByCountry.length > 0 ? (
                  <div className="space-y-4">
                    {contactsByCountry.slice(0, 5).map((item, index) => (
                      <BarRow
                        key={index}
                        label={COUNTRY_NAMES[item.country] || item.country}
                        value={item.count}
                        maxValue={contactsByCountry[0]?.count ?? 1}
                      />
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    icon={MapPin}
                    title="No data yet"
                    description="Add country information to contacts to see this report."
                  />
                )}
              </div>
            </div>

            {/* Organizations by Country */}
            <div className="rounded-lg border border-border bg-card">
              <div className="flex items-center justify-between border-b border-border px-5 py-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <h2 className="text-sm font-medium text-foreground">Organizations by Country</h2>
                </div>
              </div>
              <div className="p-5">
                {organizationsByCountry && organizationsByCountry.length > 0 ? (
                  <div className="space-y-4">
                    {organizationsByCountry.slice(0, 5).map((item, index) => (
                      <BarRow
                        key={index}
                        label={COUNTRY_NAMES[item.country] || item.country}
                        value={item.count}
                        maxValue={organizationsByCountry[0]?.count ?? 1}
                      />
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    icon={MapPin}
                    title="No data yet"
                    description="Add country information to organizations to see this report."
                  />
                )}
              </div>
            </div>
          </div>

          {/* Trashed Items Section */}
          {(trashed?.contacts > 0 || trashed?.organizations > 0) && (
            <div className="mt-8">
              <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-900/50 dark:bg-yellow-900/10">
                <div className="flex items-start gap-3">
                  <div className="rounded-md bg-yellow-100 p-2 dark:bg-yellow-900/30">
                    <Trash2 className="h-5 w-5 text-yellow-600 dark:text-yellow-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                      Trashed Items
                    </p>
                    <p className="mt-1 text-sm text-yellow-700 dark:text-yellow-300">
                      You have {trashed.contacts} trashed contact{trashed.contacts !== 1 ? 's' : ''}{' '}
                      and {trashed.organizations} trashed organization
                      {trashed.organizations !== 1 ? 's' : ''}. You can restore them from the
                      respective lists by filtering for trashed items.
                    </p>
                    <div className="mt-3 flex gap-3">
                      {trashed.contacts > 0 && (
                        <Link
                          href="/contacts?trashed=only"
                          className="text-sm font-medium text-yellow-700 hover:text-yellow-800 dark:text-yellow-400 dark:hover:text-yellow-300"
                        >
                          View trashed contacts
                        </Link>
                      )}
                      {trashed.organizations > 0 && (
                        <Link
                          href="/organizations?trashed=only"
                          className="text-sm font-medium text-yellow-700 hover:text-yellow-800 dark:text-yellow-400 dark:hover:text-yellow-300"
                        >
                          View trashed organizations
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// Stat Card Component
interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  href?: string;
  description?: string;
}

function StatCard({ title, value, icon: Icon, href, description }: StatCardProps) {
  const content = (
    <div className="rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary/20 hover:bg-accent/50">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {title}
          </p>
          <p className="mt-2 text-2xl font-semibold tabular-nums text-foreground">
            {value.toLocaleString()}
          </p>
          {description && <p className="mt-1 text-xs text-muted-foreground">{description}</p>}
        </div>
        <div className="rounded-md bg-primary/5 p-2">
          <Icon className="h-4 w-4 text-primary" />
        </div>
      </div>
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}

// Bar Row Component for charts
interface BarRowProps {
  label: string;
  value: number;
  maxValue: number;
  href?: string;
}

function BarRow({ label, value, maxValue, href }: BarRowProps) {
  const percentage = maxValue > 0 ? (value / maxValue) * 100 : 0;

  const content = (
    <div className="group">
      <div className="flex items-center justify-between text-sm">
        <span className="truncate text-foreground group-hover:text-primary transition-colors">
          {label}
        </span>
        <div className="flex items-center gap-1.5">
          <span className="tabular-nums text-muted-foreground">{value}</span>
          {href && (
            <ArrowUpRight className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
          )}
        </div>
      </div>
      <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {content}
      </Link>
    );
  }

  return content;
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
