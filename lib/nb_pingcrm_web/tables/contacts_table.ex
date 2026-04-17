defmodule NbPingcrmWeb.Tables.ContactsTable do
  @moduledoc """
  Table DSL definition for the Contacts table.
  """
  use NbFlop.Table

  alias NbPingcrm.CRM
  alias NbPingcrm.CRM.Contact

  resource(Contact)
  repo(NbPingcrm.Repo)

  config do
    name("contacts")
    default_sort({:last_name, :asc})
    default_per_page(10)
    per_page_options([10, 25, 50, 100])
    searchable([:first_name, :last_name, :email, :phone, :city])
    search_placeholder("Search contacts...")
  end

  columns do
    text_column(:name,
      sortable: false,
      searchable: false,
      compute: fn row -> "#{row.first_name} #{row.last_name}" end
    )

    text_column(:organization_name,
      label: "Organization",
      sortable: false,
      preload: :organization,
      compute: fn row -> row.organization && row.organization.name end
    )

    text_column(:city, sortable: true)
    text_column(:phone)
    action_column()
  end

  filters do
    text_filter(:first_name,
      label: "First Name",
      clauses: [:contains, :starts_with, :equals],
      placeholder: "Search by first name..."
    )

    text_filter(:last_name,
      label: "Last Name",
      clauses: [:contains, :starts_with, :equals],
      placeholder: "Search by last name..."
    )

    text_filter(:email,
      label: "Email",
      clauses: [:contains, :equals],
      placeholder: "Enter email..."
    )

    text_filter(:city,
      label: "City",
      clauses: [:contains, :equals],
      placeholder: "Enter city..."
    )

    set_filter(:country,
      label: "Country",
      options: [
        {"US", "United States"},
        {"CA", "Canada"},
        {"MX", "Mexico"},
        {"GB", "United Kingdom"},
        {"DE", "Germany"},
        {"FR", "France"},
        {"AU", "Australia"}
      ]
    )
  end

  actions do
    action(:edit,
      url: fn contact -> "/contacts/#{contact.id}/edit" end,
      icon: "PencilIcon"
    )

    action(:delete,
      handle: fn contact -> CRM.soft_delete_contact(contact) end,
      icon: "TrashIcon",
      variant: :danger,
      hidden: fn contact -> not is_nil(contact.deleted_at) end,
      confirmation: %{
        title: "Delete Contact",
        message: "Are you sure you want to delete this contact?"
      }
    )

    action(:restore,
      handle: fn contact -> CRM.restore_contact(contact) end,
      icon: "ArrowPathIcon",
      hidden: fn contact -> is_nil(contact.deleted_at) end,
      confirmation: %{
        title: "Restore Contact",
        message: "Are you sure you want to restore this contact?"
      }
    )
  end

  bulk_actions do
    bulk_action(:delete,
      handle: fn contacts -> Enum.each(contacts, &CRM.soft_delete_contact/1) end,
      variant: :danger,
      confirmation: %{
        title: "Delete Contacts",
        message: "Are you sure you want to delete {count} contacts?"
      }
    )
  end

  empty_state do
    title("No contacts found")
    message("Get started by creating your first contact.")
    icon("UserGroupIcon")
    action_button("Create Contact", "/contacts/create")
  end
end
