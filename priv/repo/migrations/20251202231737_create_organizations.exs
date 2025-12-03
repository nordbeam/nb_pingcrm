defmodule NbPingcrm.Repo.Migrations.CreateOrganizations do
  use Ecto.Migration

  def change do
    create table(:organizations) do
      add :name, :string, null: false
      add :email, :string
      add :phone, :string
      add :address, :string
      add :city, :string
      add :region, :string
      add :country, :string, default: "US"
      add :postal_code, :string
      add :deleted_at, :utc_datetime

      add :account_id, references(:accounts, on_delete: :delete_all), null: false

      timestamps(type: :utc_datetime)
    end

    create index(:organizations, [:account_id])
    create index(:organizations, [:name])
  end
end
