import { useLoaderData } from "@tanstack/react-router";
import { productRoute } from "../../../routes";
import { useGetProductById } from "../hooks/useGetProductById";
import styles from "../style/ProductDetails.module.css";

export const ProductDetails = () => {
  const { productId } = useLoaderData({ from: productRoute.id });
  const { data: product, isError, isLoading } = useGetProductById(productId);

  if (isLoading) {
    return <div className={styles.loading}>Loading product details...</div>;
  }

  if (isError) {
    return <div className={styles.error}>Something went wrong</div>;
  }

  return (
    <div className={styles.container}>
      <img
        src={product?.product?.image}
        alt={product?.product?.title}
        className={styles.image}
      />

      <div className={styles.details}>
        <h1 className={styles.title}>{product?.product?.title}</h1>
        <p className={styles.description}>
          {product?.product?.description}
        </p>

        <p className={styles.meta}>
          category: {product?.product.category}
        </p>
        <p className={styles.meta}>
          Price: {product?.product.price}$
        </p>
        <p className={styles.meta}>
          {product?.product.isAvailable ? "In Stock" : "Out of Stock"}
        </p>
        <p className={styles.meta}>
          {product?.product.reviews.length} Reviews
        </p>

        <button className={styles.button}>Add to Cart</button>
      </div>
    </div>
  );
};
