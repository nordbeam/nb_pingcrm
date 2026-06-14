defmodule NbPingcrmWeb.Router do
  use NbPingcrmWeb, :router
  use NbFlop.Router

  import NbPingcrmWeb.UserAuth

  pipeline :browser do
    plug(:accepts, ["html"])
    plug(:fetch_session)
    plug(:fetch_live_flash)
    plug(:put_root_layout, html: {NbPingcrmWeb.Layouts, :root})
    plug(:protect_from_forgery)
    plug(:put_secure_browser_headers)
    plug(:fetch_current_scope_for_user)
    plug(NbInertia.Plug)
    plug(NbInertia.Plugs.ModalHeaders)
  end

  pipeline :api do
    plug(:accepts, ["json"])
  end

  scope "/", NbPingcrmWeb do
    pipe_through([:browser, :redirect_if_user_is_authenticated])

    get("/users/register", UserRegistrationController, :new)
    post("/users/register", UserRegistrationController, :create)
  end

  scope "/", NbPingcrmWeb do
    pipe_through([:browser, :require_authenticated_user])

    get("/users/settings", UserSettingsController, :edit)
    put("/users/settings", UserSettingsController, :update)
    get("/users/settings/confirm-email/:token", UserSettingsController, :confirm_email)
  end

  scope "/", NbPingcrmWeb do
    pipe_through([:browser])

    get("/users/log-in", UserSessionController, :new)
    get("/users/log-in/:token", UserSessionController, :confirm)
    post("/users/log-in", UserSessionController, :create)
    delete("/users/log-out", UserSessionController, :delete)
  end

  scope "/", NbPingcrmWeb do
    pipe_through([:browser, :require_authenticated_user])

    get("/", PageController, :home)

    # Users CRUD
    get("/users", UsersController, :index)
    get("/users/create", UsersController, :new)
    post("/users", UsersController, :create)
    get("/users/:id/edit", UsersController, :edit)
    put("/users/:id", UsersController, :update)
    patch("/users/:id", UsersController, :update)
    delete("/users/:id", UsersController, :delete)
    put("/users/:id/restore", UsersController, :restore)

    # Organizations CRUD
    get("/organizations", OrganizationsController, :index)
    get("/organizations/create", OrganizationsController, :new)
    post("/organizations", OrganizationsController, :create)
    get("/organizations/:id/edit", OrganizationsController, :edit)
    put("/organizations/:id", OrganizationsController, :update)
    patch("/organizations/:id", OrganizationsController, :update)
    delete("/organizations/:id", OrganizationsController, :delete)
    put("/organizations/:id/restore", OrganizationsController, :restore)

    # Contacts CRUD
    get("/contacts", ContactsController, :index)
    get("/contacts/create", ContactsController, :new)
    post("/contacts", ContactsController, :create)
    get("/contacts/:id/edit", ContactsController, :edit)
    put("/contacts/:id", ContactsController, :update)
    patch("/contacts/:id", ContactsController, :update)
    delete("/contacts/:id", ContactsController, :delete)
    put("/contacts/:id/restore", ContactsController, :restore)

    # Reports
    get("/reports", ReportsController, :index)
  end

  # NbFlop table routes (actions, bulk actions, exports, views)
  # Separate scope without alias so NbFlop.* controllers resolve correctly
  scope "/" do
    pipe_through([:browser, :require_authenticated_user])
    nb_flop_routes()
  end

  # Other scopes may use custom stacks.
  # scope "/api", NbPingcrmWeb do
  #   pipe_through :api
  # end

  # Enable LiveDashboard and Swoosh mailbox preview in development
  if Application.compile_env(:nb_pingcrm, :dev_routes) do
    # If you want to use the LiveDashboard in production, you should put
    # it behind authentication and allow only admins to access it.
    # If your application does not have an admins-only section yet,
    # you can use Plug.BasicAuth to set up some basic authentication
    # as long as you are also using SSL (which you should anyway).
    import Phoenix.LiveDashboard.Router

    scope "/dev" do
      pipe_through(:browser)

      live_dashboard("/dashboard", metrics: NbPingcrmWeb.Telemetry)
      forward("/mailbox", Plug.Swoosh.MailboxPreview)
    end
  end

end
