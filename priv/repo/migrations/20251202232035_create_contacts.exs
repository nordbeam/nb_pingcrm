defmodule NbPingcrm.Repo.Migrations.CreateContacts do
  use Ecto.Migration

  def change do
    create table(:contacts) do
      add :first_name, :string, null: false
      add :last_name, :string, null: false
      add :email, :string
      add :phone, :string
      add :address, :string
      add :city, :string
      add :region, :string
      add :country, :string, default: "US"
      add :postal_code, :string
      add :deleted_at, :utc_datetime

      add :account_id, references(:accounts, on_delete: :delete_all), null: false
      add :organization_id, references(:organizations, on_delete: :nilify_all)

      timestamps(type: :utc_datetime)
    end

    create index(:contacts, [:account_id])
    create index(:contacts, [:organization_id])
    create index(:contacts, [:last_name, :first_name])
  end
end
