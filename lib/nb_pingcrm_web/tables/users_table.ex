defmodule NbPingcrmWeb.Tables.UsersTable do
  @moduledoc """
  Table DSL definition for the Users table.
  """
  use NbFlop.Table

  alias NbPingcrm.Accounts
  alias NbPingcrm.Accounts.User

  resource(User)
  repo(NbPingcrm.Repo)

  config do
    name("users")
    default_sort({:last_name, :asc})
    default_per_page(10)
    per_page_options([10, 25, 50, 100])
    searchable([:first_name, :last_name, :email])
    search_placeholder("Search users...")
  end

  columns do
    image_column(:photo, label: "", width: 40, height: 40, rounded: true)
    # Note: name is computed from first_name + last_name, sorting not supported yet
    text_column(:name, sortable: false, searchable: false)
    text_column(:email, sortable: true)

    badge_column(:owner,
      label: "Role",
      colors: %{"Owner" => :primary, "User" => :default},
      map_as: fn owner -> if owner, do: "Owner", else: "User" end
    )

    text_column(:deleted_at,
      label: "",
      visible: false,
      map_as: fn deleted_at -> if deleted_at, do: "Deleted", else: nil end
    )

    action_column()
  end

  filters do
    text_filter(:name, label: "Name", clauses: [:contains, :starts_with, :equals])
    text_filter(:email, label: "Email", clauses: [:contains, :equals])

    set_filter(:owner,
      label: "Role",
      options: [{"true", "Owner"}, {"false", "User"}]
    )
  end

  actions do
    action(:edit,
      url: fn user -> "/users/#{user.id}/edit" end,
      icon: "PencilIcon"
    )

    action(:delete,
      handle: fn user -> Accounts.soft_delete_user(user) end,
      icon: "TrashIcon",
      variant: :danger,
      hidden: fn user -> not is_nil(user.deleted_at) end,
      confirmation: %{
        title: "Delete User",
        message: "Are you sure you want to delete this user?"
      }
    )

    action(:restore,
      handle: fn user -> Accounts.restore_user(user) end,
      icon: "ArrowPathIcon",
      hidden: fn user -> is_nil(user.deleted_at) end,
      confirmation: %{
        title: "Restore User",
        message: "Are you sure you want to restore this user?"
      }
    )
  end

  bulk_actions do
    bulk_action(:delete,
      handle: fn users -> Enum.each(users, &Accounts.soft_delete_user/1) end,
      variant: :danger,
      confirmation: %{
        title: "Delete Users",
        message: "Are you sure you want to delete {count} users?"
      }
    )
  end

  empty_state do
    title("No users found")
    message("Get started by creating your first user.")
    icon("UsersIcon")
    action_button("Create User", "/users/create")
  end

  # Custom row transformation to add computed fields
  def transform_row(row, data, _conn) do
    data
    |> Map.put(:id, row.id)
    |> Map.put(:name, "#{row.first_name} #{row.last_name}")
    |> Map.put(:photo, row.photo_path)
  end
end
