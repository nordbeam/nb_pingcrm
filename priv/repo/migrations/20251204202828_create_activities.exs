defmodule NbPingcrm.Repo.Migrations.CreateActivities do
  use Ecto.Migration

  def change do
    create table(:activities) do
      add :action, :string, null: false
      add :resource_type, :string, null: false
      add :resource_id, :integer, null: false
      add :resource_name, :string
      add :metadata, :map, default: %{}

      add :user_id, references(:users, on_delete: :nilify_all)
      add :account_id, references(:accounts, on_delete: :delete_all), null: false

      timestamps(updated_at: false)
    end

    create index(:activities, [:account_id])
    create index(:activities, [:user_id])
    create index(:activities, [:resource_type, :resource_id])
    create index(:activities, [:inserted_at])
  end
end
