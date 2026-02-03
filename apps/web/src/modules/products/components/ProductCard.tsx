import {
  Badge,
  Button,
  Card,
  Grid,
  Group,
  Image,
  Rating,
  Stack,
  Text,
} from "@mantine/core";
import { MdDeleteOutline, MdShoppingCart } from "react-icons/md";
import { Link } from "@tanstack/react-router";
import type { Product } from "../types/entities";
import styles from "./ProductCard.module.css";
import { createApiProductRepository } from "../repository/ApiProductRepository";

export default function ProductCard({ product }: { product: Product }) {
  const {
    title,
    image,
    isAvailable,
    price,
    description,
    discountPercentage,
    reviews,
    hasDiscounts,
  } = product;

  const { delete: deleteProduct } = createApiProductRepository();

  const discountedPrice = hasDiscounts
    ? price * (1 - discountPercentage / 100)
    : price;

  const avgRating =
    reviews && reviews.length > 0
      ? (
          reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        ).toFixed(1)
      : 0;

  return (
    <Grid.Col style={{ height: "100%" }}>
      <Card
        className={styles.card}
        shadow="0"
        padding="0"
        radius="lg"
        withBorder={false}
      >
        {/* Image Section */}
        <Card.Section className={styles.imageContainer}>
          <div className={styles.imageWrapper}>
            <Image
              className={styles.image}
              src={image}
              height={200}
              alt={title}
              fit="cover"
              fallbackSrc="https://placehold.co/800x600?text=Product"
            />
            {/* Overlay */}
            <div className={styles.overlay}>
              <Link
                to="/product/$productId"
                params={{ productId: product.id }}
                style={{ textDecoration: "none" }}
              >
                <Group
                  justify="space-between"
                  gap={"xs"}
                  p={"xs"}
                  className={styles.quickViewBtn}
                  bdrs={"sm"}
                >
                  <MdShoppingCart size={16} />
                  <Text size="xs">Quick View</Text>
                </Group>
              </Link>
            </div>
          </div>

          {/* Badges */}
          <div className={styles.badgesContainer}>
            {!isAvailable && (
              <Badge className={styles.badge + " " + styles.outOfStock}>
                Out of Stock
              </Badge>
            )}
            {hasDiscounts && (
              <Badge className={styles.badge + " " + styles.discount}>
                -{discountPercentage}%
              </Badge>
            )}
            {isAvailable && (
              <Badge className={styles.badge + " " + styles.available}>
                In Stock
              </Badge>
            )}
          </div>
        </Card.Section>

        {/* Content Section */}
        <Stack gap="sm" p="lg" className={styles.content}>
          {/* Title */}
          <Text fw={700} size="sm" lineClamp={2} className={styles.title}>
            {title}
          </Text>

          {/* Rating */}
          {reviews && reviews.length > 0 && (
            <Group gap="xs">
              <Rating
                value={Math.round(Number(avgRating))}
                readOnly
                size="xs"
              />
              <Text size="xs" c="dimmed">
                {avgRating} ({reviews.length})
              </Text>
            </Group>
          )}

          {/* Description */}
          <Text
            size="xs"
            c="dimmed"
            lineClamp={2}
            className={styles.description}
          >
            {description}
          </Text>

          {/* Price Section */}
          <Group justify="space-between" align="flex-end" mt="auto">
            <div>
              {hasDiscounts ? (
                <>
                  <Text size="xs" c="dimmed" td="line-through">
                    ${price.toFixed(2)}
                  </Text>
                  <Text fw={700} size="lg" c="var(--primary-color)">
                    ${discountedPrice.toFixed(2)}
                  </Text>
                </>
              ) : (
                <Text fw={700} size="lg" c="#2d3748">
                  ${price.toFixed(2)}
                </Text>
              )}
            </div>
            {hasDiscounts && (
              <Badge size="sm" color="red" variant="light">
                Save ${(price - discountedPrice).toFixed(2)}
              </Badge>
            )}
          </Group>

          {/* Action Buttons */}
          <Group grow gap="xs" mt="lg">
            <Button
              fullWidth
              className={styles.orderBtn}
              disabled={!isAvailable}
              radius="md"
              size="sm"
              // leftSection={<IconShoppingCart size={14} />}
            >
              {isAvailable ? "Add to Cart" : "Unavailable"}
            </Button>
            <Button
              fullWidth
              className={styles.deleteBtn}
              radius="md"
              size="sm"
              leftSection={<MdDeleteOutline size={14} />}
              onClick={() => deleteProduct(product.id)}
            >
              Delete
            </Button>
          </Group>
        </Stack>
      </Card>
    </Grid.Col>
  );
}
