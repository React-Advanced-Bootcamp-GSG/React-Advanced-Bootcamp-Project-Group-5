import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "@mantine/core/styles.css";
import App from "./App.tsx";
import { MantineProvider } from "@mantine/core";
import { ProductProviders } from "./modules/products/index.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider>
      <ProductProviders value="Sample Product Value">
           <App />
      </ProductProviders>
   
    </MantineProvider>
  </StrictMode>
);
