import { useLoaderData } from "@tanstack/react-router";
import { productRoute } from "../../../routes";
import { useGetProductById } from "../hooks/useGetProductById";
import { useProducts } from "..";


export const ProductDetails = () => {

   const {productId} = useLoaderData({from: productRoute.id});
   const {currentPage} = useProducts();
   const product= useGetProductById(productId ,currentPage); 

  return (
    <div className="max-w-5xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
      <img
        src={product.data?.product?.image}
        alt=""
        className="rounded-2xl shadow-md"
      />

      <div className="space-y-4">
        <h1 className="text-3xl font-bold">{product.data?.product?.title}</h1>
        <p className="text-gray-600">{product.data?.product?.description}</p>

        <div className="flex items-center gap-4">
          <span className="text-2xl font-semibold text-green-600">
      
          </span>
          <span className="text-sm text-gray-400">
            Stock: {productId}
          </span>
            <span className="text-sm text-gray-400">
            CurrentPage: {currentPage}
          </span>
        </div>

        <button className="px-6 py-3 bg-black text-white rounded-xl hover:opacity-90 transition">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

