defmodule NbPingcrmWeb.Tables.ExampleTable do
  @moduledoc """
  Example table module demonstrating the NbFlop Table DSL.

  Use this as a template for your own tables.
  """

  use NbFlop.Table

  resource(NbPingcrm.Examples.Item)
  repo(NbPingcrm.Repo)

  config do
    name("example")
    default_sort({:inserted_at, :desc})
    default_per_page(25)
    per_page_options([10, 25, 50, 100])
  end

  columns do
    text_column(:name, sortable: true, searchable: true)
    text_column(:email, sortable: true)
    badge_column(:status, colors: %{"active" => :success, "inactive" => :danger})
    date_column(:inserted_at, label: "Created", sortable: true)
    action_column()
  end

  filters do
    text_filter(:name, clauses: [:contains, :starts_with, :equals])
    set_filter(:status, options: [{"active", "Active"}, {"inactive", "Inactive"}])
  end

  actions do
    action(:edit,
      url: fn row -> "/example/#{row.id}/edit" end,
      icon: "PencilIcon"
    )

    action(:delete,
      handle: fn _row -> :ok end,
      icon: "TrashIcon",
      variant: :danger,
      confirmation: %{
        title: "Delete Item",
        message: "Are you sure you want to delete this item?"
      }
    )
  end

  bulk_actions do
    bulk_action(:delete,
      handle: fn rows -> Enum.each(rows, fn _row -> :ok end) end,
      variant: :danger,
      confirmation: %{
        title: "Delete Items",
        message: "Are you sure you want to delete {count} items?"
      }
    )
  end
end
