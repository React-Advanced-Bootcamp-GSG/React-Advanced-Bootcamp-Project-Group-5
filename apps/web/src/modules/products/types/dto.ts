export type ProductDTO = {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  thumbnail: string;
  stock: number;
  reviews: ReviewDTO[];
  discountPercentage: number;
};

export type ReviewDTO = {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
};
