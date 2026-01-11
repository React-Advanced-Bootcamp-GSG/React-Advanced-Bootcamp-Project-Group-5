export type Product = {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  image: string;
  isAvailable: boolean;
  hasDiscounts: boolean;
  discountPercentage: number;
  reviews: Review[];
};

export type Review = {
  rating: number;
  comment: string;
  date: string;
  reviewer: {
    name: string;
    email: string;
  };
};
