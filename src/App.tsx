import "./App.css";
import { Typography } from "@mantine/core";
import Products from "./modules/products/views";

function App() {
  return (
    <>
      <Typography __size="xl">Products</Typography>
      <Products />
    </>
  );
}

export default App;
