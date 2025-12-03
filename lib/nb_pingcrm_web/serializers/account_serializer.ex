defmodule NbPingcrmWeb.Serializers.AccountSerializer do
  @moduledoc false
  use NbSerializer.Serializer

  schema do
    field(:id, :number)
    field(:name, :string)
  end
end
