import { Text, Button, Card, Grid, Group, Pill, Image } from '@mantine/core';
import { useDeleteProducts } from '../hooks/useDeleteProducts';
import type { ProductCardProps } from '../types/components';

export const ProductCard = ({ product }: ProductCardProps) => {
  const { title, image, isAvailable, price, description } = product;
  const { deleteProduct, isDeleted } = useDeleteProducts({});

  if (isDeleted) {
    return <></>;
  }

  return (
    <Grid.Col style={{ height: '100%' }}>
      <Card
        shadow="sm"
        padding="0"
        radius="md"
        withBorder
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          transition: 'transform 160ms ease, box-shadow 160ms ease',
        }}
      >
        <Card.Section style={{ position: 'relative' }}>
          <Image
            src={image}
            height={150}
            alt={title}
            fit="cover"
            fallbackSrc="https://placehold.co/800x600?text=Product"
          />
          <div
            style={{
              position: 'absolute',
              top: 12,
              insetInlineStart: 12,
            }}
          >
            {isAvailable ? (
              <Pill size="sm">Available</Pill>
            ) : (
              <Pill size="sm" style={{ opacity: 0.7 }}>
                Not Available
              </Pill>
            )}
          </div>
        </Card.Section>

        <Group
          justify="flex-start"
          mt="md"
          align="flex-start"
          gap="xs"
          style={{
            backgroundColor: '#383838ff',
            margin: '0.25rem',
            padding: '0.5rem',
            borderRadius: '0.375rem',
          }}
        >
          <Text fw={600} lineClamp={1} c="#f5f5f5" ta="left">
            {product.title}
          </Text>

          <Text size="sm" c="#959595" mt={6} lineClamp={2} ta="left">
            {description}
          </Text>

          {'price' in product && typeof price === 'number' ? (
            <Text fw={700} c="#f5f5f5">
              ${price.toFixed(2)}
            </Text>
          ) : null}
          <Button
            fullWidth
            mt="md"
            radius="md"
            disabled={!isAvailable}
            style={{ marginTop: 'auto' }}
          >
            {isAvailable ? 'Order Now' : 'Out of stock'}
          </Button>

          <Button
            fullWidth
            color="red"
            mt="md"
            radius="md"
            disabled={!product.isAvailable}
            style={{ marginTop: 'auto' }}
            onClick={() => deleteProduct(product.id)}
          >
            Delete
          </Button>
        </Group>
      </Card>
    </Grid.Col>
  );
};
