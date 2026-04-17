defmodule NbPingcrmWeb.Tables.OrganizationsTable do
  @moduledoc """
  Table DSL definition for the Organizations table.
  """
  use NbFlop.Table

  alias NbPingcrm.CRM
  alias NbPingcrm.CRM.Organization

  resource(Organization)
  repo(NbPingcrm.Repo)

  config do
    name("organizations")
    default_sort({:name, :asc})
    default_per_page(10)
    per_page_options([10, 25, 50, 100])
    searchable([:name, :email, :city, :phone])
    search_placeholder("Search organizations...")
  end

  columns do
    text_column(:name, sortable: true, searchable: true)
    text_column(:city, sortable: true)
    text_column(:phone)
    action_column()
  end

  filters do
    text_filter(:name, label: "Name", clauses: [:contains, :starts_with, :equals])
    text_filter(:city, label: "City", clauses: [:contains, :equals])
    text_filter(:country, label: "Country", clauses: [:contains, :equals])
  end

  actions do
    action(:edit,
      url: fn org -> "/organizations/#{org.id}/edit" end,
      icon: "PencilIcon"
    )

    action(:delete,
      handle: fn org -> CRM.soft_delete_organization(org) end,
      icon: "TrashIcon",
      variant: :danger,
      hidden: fn org -> not is_nil(org.deleted_at) end,
      confirmation: %{
        title: "Delete Organization",
        message: "Are you sure you want to delete this organization?"
      }
    )

    action(:restore,
      handle: fn org -> CRM.restore_organization(org) end,
      icon: "ArrowPathIcon",
      hidden: fn org -> is_nil(org.deleted_at) end,
      confirmation: %{
        title: "Restore Organization",
        message: "Are you sure you want to restore this organization?"
      }
    )
  end

  bulk_actions do
    bulk_action(:delete,
      handle: fn orgs -> Enum.each(orgs, &CRM.soft_delete_organization/1) end,
      variant: :danger,
      confirmation: %{
        title: "Delete Organizations",
        message: "Are you sure you want to delete {count} organizations?"
      }
    )
  end

  empty_state do
    title("No organizations found")
    message("Get started by creating your first organization.")
    icon("BuildingOffice2Icon")
    action_button("Create Organization", "/organizations/create")
  end
end
