import { Grid } from "@mantine/core";
import { useGetAllProducts } from "../hooks/useGetAllProducts";
import ProductsContainer from "./ProductsContainer";
import { groupProductsByCategory } from "../../../utilities/groupProductsByCategory";

export default function Products() {
  const {
    allProducts,
    // productsWithDiscountHigherThan10,
    // productsWithDiscountLowerThan10,
    isLoading,
  } = useGetAllProducts();


  if ( isLoading ) {
    return <div>Loading...</div>;
  }


  console.log({ allProducts });
  const productsByCategory = groupProductsByCategory(allProducts);

  return (
      <Grid gutter="xs">
        {Object.keys(productsByCategory).map((category) => (
          <Grid.Col key={category} span={12} p={0} mb={"lg"}>
              <ProductsContainer
                key={category}
                category={category}
                products={productsByCategory[category]}
              />
          </Grid.Col>
        ))}
    </Grid>
  );
}
