import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "@mantine/core/styles.css";
import App from "./App.tsx";
import { MantineProvider } from "@mantine/core";
import { createProductModules } from "./modules/products/index.tsx";

const {Provider:ProductProviders}=createProductModules();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider>
      <ProductProviders>
           <App />
      </ProductProviders>
   
    </MantineProvider>
  </StrictMode>
);
