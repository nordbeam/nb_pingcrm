defmodule NbPingcrmWeb.Serializers.UserSerializer do
  @moduledoc false
  use NbSerializer.Serializer

  alias NbPingcrm.Accounts.User

  schema do
    field(:id, :number)
    field(:first_name, :string)
    field(:last_name, :string)
    field(:name, :string, compute: :compute_name)
    field(:email, :string)
    field(:owner, :boolean)
    field(:photo, :string, compute: :compute_photo, nullable: true)
    field(:deleted_at, :datetime, nullable: true)
  end

  def compute_name(user, _opts) do
    User.name(user)
  end

  def compute_photo(user, _opts) do
    case user.photo_path do
      nil -> nil
      path -> "/storage/#{path}"
    end
  end
end
