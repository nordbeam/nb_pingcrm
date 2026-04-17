defmodule NbPingcrmWeb.Serializers.ActivitySerializer do
  @moduledoc false
  use NbSerializer.Serializer

  alias NbPingcrm.Accounts.User

  schema do
    field(:id, :number)
    field(:action, :string)
    field(:resource_type, :string)
    field(:resource_id, :number)
    field(:resource_name, :string, nullable: true)
    field(:user_name, :string, compute: :compute_user_name, nullable: true)
    field(:inserted_at, :datetime)
  end

  def compute_user_name(%{user: %User{} = user}, _opts) do
    "#{user.first_name} #{user.last_name}"
  end

  def compute_user_name(_, _opts), do: nil
end
