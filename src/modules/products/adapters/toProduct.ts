import type { ProductDTO } from '../dto/Product';
import type { Product } from '../entities/Product';

export const toProduct = (products: ProductDTO[]): Product[] => {
  return products.map((product) => {
    return {
      id: product.id,
      title: product.title,
      description: product.description,
      category: product.category,
      image: product.thumbnail,
      isAvailable: product.stock > 0,
      price: product.price,
      reviews: product.reviews.map((review) => {
        return {
          rating: review.rating,
          comment: review.comment,
          date: review.date,
          reviewer: {
            name: review.reviewerName,
            email: review.reviewerEmail,
          },
        };
      }),
    };
  });
};
