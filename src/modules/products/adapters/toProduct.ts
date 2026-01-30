import type { ProductDTO } from "../types/dto";
import type { Product } from "../types/entities";

type MaybeArray<T> = T | T[];

export const toProduct = (input: MaybeArray<Partial<ProductDTO>>): Product[] => {
  const products = Array.isArray(input) ? input : [input];

  return products.map((product) => {
    const reviews = Array.isArray(product.reviews) ? product.reviews : [];

    return {
      id: String(product.id ?? ""),
      title: product.title ?? "",
      description: product.description ?? "",
      category: product.category ?? "",
      image: product.thumbnail ?? "",
      price: product.price ?? 0,

      // ✅ fallback لو stock مش موجود بالـ update response
      isAvailable: (product.stock ?? 0) > 0,

      // ✅ fallback لو discountPercentage مش موجود
      discountPercentage: product.discountPercentage ?? 0,
      hasDiscounts: (product.discountPercentage ?? 0) > 0,

      // ✅ fallback لو reviews مش موجودة
      reviews: reviews.map((review) => ({
        rating: review.rating,
        comment: review.comment,
        date: review.date,
        reviewer: {
          name: review.reviewerName,
          email: review.reviewerEmail,
        },
      })),
    };
  });
};
