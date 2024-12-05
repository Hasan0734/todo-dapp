import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "@rainbow-me/rainbowkit/styles.css";
import { Toaster } from "react-hot-toast";
import AuthProvider from "./components/AuthProvider";
import Provider from "./components/Provider";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import ContextProvider from "./components/ContextProvider";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <Provider>
    <ContextProvider>
      <RainbowKitProvider>
        <App />
        <Toaster />
      </RainbowKitProvider>
    </ContextProvider>
  </Provider>
  // </StrictMode>
);
