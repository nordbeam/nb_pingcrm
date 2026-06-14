defmodule NbPingcrmWeb.ContactsFeatureTest do
  use NbPingcrmWeb.FeatureCase, async: false

  @moduletag :feature

  feature "user can create a contact from the modal workflow", %{
    session: session
  } do
    user = user_with_password_fixture()
    first_name = "Ada#{System.unique_integer([:positive])}"
    last_name = "Lovelace"

    session
    |> log_in_user(user)
    |> inertia_visit("/contacts")
    |> assert_inertia_component("Contacts/Index")
    |> click(button("New contact"))
    |> assert_path("/contacts/create")
    |> assert_modal_open()
    |> assert_modal_text("Create Contact")
    |> fill_inertia_form(
      first_name: first_name,
      last_name: last_name,
      email: "ada#{System.unique_integer([:positive])}@example.com",
      city: "Casablanca"
    )
    |> submit_form(button("Create Contact"))
    |> assert_path("/contacts")
    |> refute_modal_open()
    |> assert_inertia_component("Contacts/Index")
    |> assert_inertia_flash("success", "Contact created.")
    |> assert_text("#{first_name} #{last_name}")
  end

  feature "user can update a contact from the modal workflow", %{
    session: session
  } do
    user = user_with_password_fixture()

    contact =
      contact_fixture(user.account_id, %{
        first_name: "Before",
        last_name: "Person#{System.unique_integer([:positive])}",
        city: "Casablanca"
      })

    updated_first_name = "After#{System.unique_integer([:positive])}"

    session
    |> log_in_user(user)
    |> inertia_visit("/contacts?search=#{URI.encode_www_form(contact.email)}")
    |> assert_inertia_component("Contacts/Index")
    |> assert_text("#{contact.first_name} #{contact.last_name}")
    |> click(css("tbody tr"))
    |> assert_path("/contacts/#{contact.id}/edit")
    |> assert_modal_open()
    |> assert_modal_text("Edit #{contact.first_name} #{contact.last_name}")
    |> fill_inertia_form(
      first_name: updated_first_name,
      email: "after#{System.unique_integer([:positive])}@example.com",
      city: "Rabat"
    )
    |> submit_form(button("Save Changes"))
    |> assert_path("/contacts")
    |> refute_modal_open()
    |> assert_inertia_component("Contacts/Index")
    |> assert_inertia_flash("success", "Contact updated.")
    |> assert_text("#{updated_first_name} #{contact.last_name}")
  end

  feature "user can delete and restore a contact from the modal workflow", %{
    session: session
  } do
    user = user_with_password_fixture()

    contact =
      contact_fixture(user.account_id, %{
        first_name: "Delete",
        last_name: "Me#{System.unique_integer([:positive])}"
      })

    full_name = "#{contact.first_name} #{contact.last_name}"

    session
    |> log_in_user(user)
    |> inertia_visit("/contacts/#{contact.id}/edit")
    |> assert_path("/contacts/#{contact.id}/edit")
    |> assert_modal_open()
    |> accept_modal_confirm("Delete", "Are you sure you want to delete #{full_name}?")
    |> assert_path("/contacts")
    |> refute_modal_open()
    |> assert_inertia_component("Contacts/Index")
    |> assert_inertia_flash("success", "Contact deleted.")

    session
    |> inertia_visit("/contacts/#{contact.id}/edit")
    |> assert_path("/contacts/#{contact.id}/edit")
    |> assert_modal_open()
    |> assert_modal_text("This contact has been deleted")
    |> click(button("Restore contact"))
    |> assert_path("/contacts")
    |> refute_modal_open()
    |> assert_inertia_component("Contacts/Index")
    |> assert_inertia_flash("success", "Contact restored.")
    |> assert_text(full_name)
  end
end
