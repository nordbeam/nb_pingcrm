defmodule NbPingcrmWeb.UsersFeatureTest do
  use NbPingcrmWeb.FeatureCase, async: false

  @moduletag :feature

  feature "user can create a teammate from the modal workflow", %{
    session: session
  } do
    user = user_with_password_fixture()
    first_name = "Taylor#{System.unique_integer([:positive])}"
    last_name = "Swift"
    email = "taylor#{System.unique_integer([:positive])}@example.com"

    session
    |> log_in_user(user)
    |> inertia_visit("/users")
    |> assert_inertia_component("Users/Index")
    |> click(button("New user"))
    |> assert_path("/users/create")
    |> assert_modal_open()
    |> assert_modal_text("Create User")
    |> fill_inertia_form(
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: browser_test_password()
    )
    |> submit_form(button("Create User"))
    |> assert_path("/users")
    |> refute_modal_open()
    |> assert_inertia_component("Users/Index")
    |> assert_inertia_flash("success", "User created.")
    |> assert_text(email)
  end

  feature "user can update a teammate from the modal workflow", %{
    session: session
  } do
    user = user_with_password_fixture()

    teammate =
      account_user_fixture(user.account_id, %{
        first_name: "Jamie",
        last_name: "Original#{System.unique_integer([:positive])}"
      })

    updated_first_name = "Jordan#{System.unique_integer([:positive])}"
    updated_last_name = "Updated"
    updated_email = "jordan#{System.unique_integer([:positive])}@example.com"

    session
    |> log_in_user(user)
    |> inertia_visit("/users?search=#{URI.encode_www_form(teammate.email)}")
    |> assert_inertia_component("Users/Index")
    |> assert_text(teammate.email)
    |> click(css("tbody tr"))
    |> assert_path("/users/#{teammate.id}/edit")
    |> assert_modal_open()
    |> assert_modal_text("Edit #{teammate.first_name} #{teammate.last_name}")
    |> fill_inertia_form(
      first_name: updated_first_name,
      last_name: updated_last_name,
      email: updated_email
    )
    |> submit_form(button("Save Changes"))
    |> assert_path("/users")
    |> refute_modal_open()
    |> assert_inertia_component("Users/Index")
    |> assert_inertia_flash("success", "User updated.")
    |> assert_text(updated_email)
  end

  feature "user can delete and restore a teammate from the modal workflow", %{
    session: session
  } do
    user = user_with_password_fixture()

    teammate =
      account_user_fixture(user.account_id, %{
        first_name: "Delete",
        last_name: "Me#{System.unique_integer([:positive])}"
      })

    full_name = "#{teammate.first_name} #{teammate.last_name}"

    session
    |> log_in_user(user)
    |> inertia_visit("/users/#{teammate.id}/edit")
    |> assert_path("/users/#{teammate.id}/edit")
    |> assert_modal_open()
    |> accept_modal_confirm("Delete", "Are you sure you want to delete #{full_name}?")
    |> assert_path("/users")
    |> refute_modal_open()
    |> assert_inertia_component("Users/Index")
    |> assert_inertia_flash("success", "User deleted.")

    session
    |> inertia_visit("/users/#{teammate.id}/edit")
    |> assert_path("/users/#{teammate.id}/edit")
    |> assert_modal_open()
    |> assert_modal_text("This user has been deleted")
    |> click(button("Restore user"))
    |> assert_path("/users")
    |> refute_modal_open()
    |> assert_inertia_component("Users/Index")
    |> assert_inertia_flash("success", "User restored.")
    |> assert_text(teammate.email)
  end
end
