import React from "react";
import { Box } from "@mantine/core";
import ProductForm from "../components/ProductForm";

const AddProduct: React.FC = () => {
  return (
    <Box bg="#fff" p={"lg"} bdrs={"sm"}>
      <h1>Add New Product</h1>
      <ProductForm />
    </Box>
  );
};

export default AddProduct;
