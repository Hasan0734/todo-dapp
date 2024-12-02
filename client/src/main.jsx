import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Provider from "./components/Provider";
import "@rainbow-me/rainbowkit/styles.css";
import  { Toaster } from 'react-hot-toast';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider>
      <App />
      <Toaster/>
    </Provider>
  </StrictMode>
);
