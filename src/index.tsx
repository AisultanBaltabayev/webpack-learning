import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "@/components/App/App";
import { AboutPageLazy } from "@/pages/about";
import { StorePageLazy } from "@/pages/shop";

const root = document.getElementById("root");

if (!root) {
  throw new Error("root not found!");
}

const container = createRoot(root);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/about", element: <AboutPageLazy /> },
      { path: "/store", element: <StorePageLazy /> },
    ],
  },
]);

container.render(
  <React.StrictMode>
    <Suspense fallback={"Loading..."}>
      <RouterProvider router={router} />
    </Suspense>
  </React.StrictMode>,
);
