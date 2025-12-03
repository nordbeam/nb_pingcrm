import React from "react";
import axios from "axios";

import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";

// Import layouts
import AppLayout from "./layouts/AppLayout";
import GuestLayout from "./layouts/GuestLayout";

axios.defaults.xsrfHeaderName = "x-csrf-token";

const pages = import.meta.glob("./pages/**/*.tsx");

// Define which pages use which layout
const guestPages = [
  "Auth/Login",
  "Auth/Register",
  "Auth/ForgotPassword",
  "Auth/ResetPassword",
];

createInertiaApp({
  resolve: async (name) => {
    const path = `./pages/${name}.tsx`;
    const resolver = pages[path];
    if (!resolver) {
      throw new Error(`Page not found: ${name}`);
    }

    const module = await resolver() as { default: React.ComponentType & { layout?: (page: React.ReactNode) => React.ReactNode } };
    const page = module.default;

    // Use page-defined layout if available, otherwise determine from path
    if (!page.layout) {
      if (guestPages.includes(name)) {
        page.layout = (page: React.ReactNode) => <GuestLayout>{page}</GuestLayout>;
      } else {
        page.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;
      }
    }

    return module;
  },
  setup({ App, el, props }) {
    createRoot(el).render(<App {...props} />);
  },
});
