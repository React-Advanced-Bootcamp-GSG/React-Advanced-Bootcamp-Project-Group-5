import { Carousel } from '@mantine/carousel';
import type { Product } from '../types/entities';
import ProductCard from './ProductCard';

function ProductsCarousel({ products }: { products: Product[] }) {
  return (
    <Carousel
      type="container"
      slideSize={{ base: '25%', 'sm': '50%', md: '33.3333%' }}
      slideGap={{ base: 'xs', sm: 2 }}
      emblaOptions={{ loop: true, align: 'start', slidesToScroll: 1 }}
      withKeyboardEvents
    >
      {products.map((item) => (
        <Carousel.Slide key={item.id}>
          <ProductCard product={item} />
        </Carousel.Slide>
      ))}
    </Carousel>
  );
}

export default ProductsCarousel;