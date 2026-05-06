import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router-dom";
import { ToastContainer, Zoom } from "react-toastify";
import AuthProvider from "./context/AuthProvider";
import { TranslationProvider } from "./context/TranslationContext.jsx";
import "./index.css";
import { routes } from "./Routes/Routes";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <TranslationProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <RouterProvider router={routes}></RouterProvider>
            <ToastContainer
              position="top-center"
              autoClose={2000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={false}
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
              transition={Zoom}
            />
          </AuthProvider>
        </QueryClientProvider>
      </TranslationProvider>
    </HelmetProvider>
  </StrictMode>
);
