defmodule NbPingcrmWeb.OrganizationsFeatureTest do
  use NbPingcrmWeb.FeatureCase, async: false

  @moduletag :feature

  feature "user can create an organization from the modal workflow", %{
    session: session
  } do
    user = user_with_password_fixture()
    organization_name = "Wallaby Labs #{System.unique_integer([:positive])}"

    session
    |> log_in_user(user)
    |> inertia_visit("/organizations")
    |> assert_inertia_component("Organizations/Index")
    |> click(button("New organization"))
    |> assert_path("/organizations/create")
    |> assert_modal_open()
    |> assert_modal_text("Create Organization")
    |> fill_inertia_form(
      name: organization_name,
      email: "ops@example.com",
      city: "Casablanca"
    )
    |> submit_form(button("Create Organization"))
    |> assert_path("/organizations")
    |> refute_modal_open()
    |> assert_inertia_component("Organizations/Index")
    |> assert_inertia_flash("success", "Organization created.")
    |> assert_text(organization_name)
  end

  feature "user can update an organization from the table modal workflow", %{
    session: session
  } do
    user = user_with_password_fixture()

    organization =
      organization_fixture(user.account_id, %{
        name: "Original Org #{System.unique_integer([:positive])}",
        city: "Casablanca"
      })

    updated_name = "Updated Org #{System.unique_integer([:positive])}"

    session
    |> log_in_user(user)
    |> inertia_visit("/organizations")
    |> assert_inertia_component("Organizations/Index")
    |> click(css("tbody td", text: organization.name))
    |> assert_path("/organizations/#{organization.id}/edit")
    |> assert_modal_open()
    |> assert_modal_text("Edit #{organization.name}")
    |> fill_inertia_form(name: updated_name, city: "Rabat")
    |> submit_form(button("Save Changes"))
    |> assert_path("/organizations")
    |> refute_modal_open()
    |> assert_inertia_component("Organizations/Index")
    |> assert_inertia_flash("success", "Organization updated.")
    |> assert_text(updated_name)
  end

  feature "user can delete and restore an organization from the modal workflow", %{
    session: session
  } do
    user = user_with_password_fixture()

    organization =
      organization_fixture(user.account_id, %{
        name: "Delete Me #{System.unique_integer([:positive])}"
      })

    session
    |> log_in_user(user)
    |> inertia_visit("/organizations/#{organization.id}/edit")
    |> assert_path("/organizations/#{organization.id}/edit")
    |> assert_modal_open()
    |> accept_modal_confirm("Delete", "Are you sure you want to delete #{organization.name}?")
    |> assert_path("/organizations")
    |> refute_modal_open()
    |> assert_inertia_component("Organizations/Index")
    |> assert_inertia_flash("success", "Organization deleted.")

    session
    |> inertia_visit("/organizations/#{organization.id}/edit")
    |> assert_path("/organizations/#{organization.id}/edit")
    |> assert_modal_open()
    |> assert_modal_text("This organization has been deleted")
    |> click(button("Restore organization"))
    |> assert_path("/organizations")
    |> refute_modal_open()
    |> assert_inertia_component("Organizations/Index")
    |> assert_inertia_flash("success", "Organization restored.")
    |> assert_text(organization.name)
  end
end
