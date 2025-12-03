interface HomeProps {
  greeting?: string;
}

export default function Home({ greeting }: HomeProps) {
  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>{greeting || "Welcome to NbInertia!"}</h1>
      <p>
        This is a sample Inertia.js page component created by the nb_inertia installer.
      </p>
      <p>
        Edit this file at <code>assets/js/pages/Home.jsx</code> to get started.
      </p>

      <div style={{ marginTop: "2rem" }}>
        <h2>Next Steps</h2>
        <ul>
          <li>Create more page components in assets/js/pages/</li>
          <li>Use <code>inertia_page</code> macro to declare pages in your controllers</li>
          <li>Render pages with <code>render_inertia(conn, :page_name, props)</code></li>
        </ul>
      </div>

      <div style={{ marginTop: "2rem", padding: "1rem", background: "#f0f0f0", borderRadius: "0.5rem" }}>
        <h3>Example Controller</h3>
        <pre style={{ background: "white", padding: "1rem", borderRadius: "0.25rem", overflow: "auto" }}>
          {`defmodule MyAppWeb.PageController do
  use MyAppWeb, :controller
  use NbInertia.Controller

  inertia_page :home do
    prop :greeting, :string
  end

  def home(conn, _params) do
    render_inertia(conn, :home,
      greeting: "Hello from NbInertia!"
    )
  end
end`}
        </pre>
      </div>
    </div>
  );
}
