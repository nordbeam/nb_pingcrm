defmodule NbPingcrmWeb.PageController do
  use NbPingcrmWeb, :controller
  use NbInertia.Controller

  alias NbPingcrm.{Accounts, Activities, CRM}
  alias NbPingcrmWeb.InertiaShared.Auth
  alias NbPingcrmWeb.Serializers.ActivitySerializer

  # Shared props merged into all pages in this controller
  inertia_shared(Auth)

  # Dashboard stats
  inertia_page :dashboard do
    prop(:stats, :map)
    prop(:activities, list: ActivitySerializer)
  end

  def home(conn, _params) do
    account_id = conn.assigns.current_scope.user.account_id

    stats = %{
      contacts: CRM.count_contacts(account_id),
      organizations: CRM.count_organizations(account_id),
      users: Accounts.count_users(account_id)
    }

    activities = Activities.list_recent_activities(account_id, 10)

    render_inertia(conn, :dashboard,
      stats: stats,
      activities: activities
    )
  end
end
