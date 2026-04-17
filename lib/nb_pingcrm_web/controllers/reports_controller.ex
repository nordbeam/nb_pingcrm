defmodule NbPingcrmWeb.ReportsController do
  use NbPingcrmWeb, :controller
  use NbInertia.Controller

  alias NbPingcrm.{Accounts, CRM}
  alias NbPingcrmWeb.InertiaShared.Auth

  # Shared props merged into all pages in this controller
  inertia_shared(Auth)

  # Reports page
  inertia_page :reports_index do
    prop(:totals, :map)
    prop(:contacts_by_organization, list: :map)
    prop(:contacts_by_country, list: :map)
    prop(:organizations_by_country, list: :map)
    prop(:contacts_over_time, list: :map)
    prop(:recent_activity, :map)
    prop(:trashed, :map)
  end

  def index(conn, _params) do
    account_id = conn.assigns.current_scope.user.account_id

    # Aggregate totals
    totals = %{
      contacts: CRM.count_contacts(account_id),
      organizations: CRM.count_organizations(account_id),
      users: Accounts.count_users(account_id)
    }

    render_inertia(conn, :reports_index,
      totals: totals,
      contacts_by_organization: CRM.contacts_by_organization(account_id, 5),
      contacts_by_country: CRM.contacts_by_country(account_id),
      organizations_by_country: CRM.organizations_by_country(account_id),
      contacts_over_time: CRM.contacts_over_time(account_id, 6),
      recent_activity: CRM.recent_activity(account_id, 30),
      trashed: CRM.count_trashed(account_id)
    )
  end
end
