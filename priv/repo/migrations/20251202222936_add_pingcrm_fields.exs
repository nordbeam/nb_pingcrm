defmodule NbPingcrm.Repo.Migrations.AddPingcrmFields do
  use Ecto.Migration

  def change do
    # Create accounts table
    create table(:accounts) do
      add :name, :string, null: false

      timestamps(type: :utc_datetime)
    end

    # Add PingCRM fields to users
    alter table(:users) do
      add :first_name, :string
      add :last_name, :string
      add :owner, :boolean, default: false, null: false
      add :photo_path, :string
      add :deleted_at, :utc_datetime
      add :account_id, references(:accounts, on_delete: :delete_all)
    end

    create index(:users, [:account_id])
    create index(:users, [:deleted_at])
  end
end
