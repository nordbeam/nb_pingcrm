defmodule NbPingcrm.Serializers.ExampleSerializer do
  @moduledoc """
  Example serializer demonstrating NbSerializer best practices.

  This serializer shows:
  - Basic field definitions
  - Computed fields
  - Conditional fields
  - Field transformations

  ## Usage

      # Serialize a single record
      data = %{
        id: 1,
        title: "Getting Started with NbSerializer",
        body: "This is a comprehensive guide to using NbSerializer in your Elixir application...",
        status: "published",
        author_id: 42,
        published_at: ~U[2024-01-15 10:30:00Z]
      }

      {:ok, result} = NbSerializer.serialize(Elixir.NbPingcrm.Serializers.ExampleSerializer, data)

      # Serialize a list of records
      {:ok, results} = NbSerializer.serialize(Elixir.NbPingcrm.Serializers.ExampleSerializer, [data])

      # With options
      {:ok, result} = NbSerializer.serialize(
        Elixir.NbPingcrm.Serializers.ExampleSerializer,
        data,
        view: :admin,
        current_scope: current_user
      )

  For more information, see: https://hexdocs.pm/nb_serializer
  """

  use NbSerializer.Serializer

  schema do
    # Basic fields - directly map from source data
    field :id, :number
    field :title, :string

    # Computed field - derives value from source data
    # The compute function receives the data and opts
    field :excerpt, :string, compute: :generate_excerpt

    # Conditional field - only included when condition is met
    # Useful for admin-only fields, permission-based data, etc.
    field :author_id, :number, if: :show_author_id?

    # Field with transformation
    # Format DateTime to ISO8601 string
    field :published_at, :datetime, transform: :format_datetime

    # Computed field with pattern matching
    field :status_label, :string, compute: :format_status
  end

  # Computed field function
  # Generates an excerpt from the body text
  def generate_excerpt(%{body: body}, _opts) when is_binary(body) do
    body
    |> String.slice(0, 150)
    |> Kernel.<>("...")
  end

  def generate_excerpt(_data, _opts), do: ""

  # Conditional function
  # Shows author_id only to admin users
  def show_author_id?(_data, opts) do
    case Keyword.get(opts, :view) do
      :admin -> true
      _ -> false
    end
  end

  # Transform function
  # Formats DateTime to ISO8601 string
  def format_datetime(%DateTime{} = dt), do: DateTime.to_iso8601(dt)
  def format_datetime(nil), do: nil
  def format_datetime(value), do: value

  # Computed field with pattern matching
  # Returns user-friendly status labels
  def format_status(%{status: "draft"}, _opts), do: "Draft"
  def format_status(%{status: "published"}, _opts), do: "Published"
  def format_status(%{status: "archived"}, _opts), do: "Archived"
  def format_status(_data, _opts), do: "Unknown"
end
