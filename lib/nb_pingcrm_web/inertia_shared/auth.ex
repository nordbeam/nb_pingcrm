defmodule NbPingcrmWeb.InertiaShared.Auth do
  @moduledoc """
  Shared props for authentication data.
  These props are available on every Inertia page.
  """
  use NbInertia.SharedProps

  alias NbPingcrmWeb.Serializers.{AccountSerializer, UserSerializer}

  inertia_shared do
    prop(:user, UserSerializer, nullable: true)
    prop(:account, AccountSerializer, nullable: true)
    prop(:flash, :map)
  end

  @impl NbInertia.SharedProps.Behaviour
  def build_props(conn, _opts) do
    scope = conn.assigns[:current_scope]
    flash = Phoenix.Flash.get(conn.assigns, :flash) || %{}

    base_props = %{
      flash: normalize_flash(flash)
    }

    if scope && scope.user do
      user = scope.user |> NbPingcrm.Repo.preload(:account)

      Map.merge(base_props, %{
        user: user,
        account: user.account
      })
    else
      Map.merge(base_props, %{
        user: nil,
        account: nil
      })
    end
  end

  defp normalize_flash(flash) do
    %{
      success: flash["success"] || flash[:success],
      error: flash["error"] || flash[:error],
      info: flash["info"] || flash[:info],
      warning: flash["warning"] || flash[:warning]
    }
    |> Enum.reject(fn {_k, v} -> is_nil(v) end)
    |> Map.new()
  end
end
