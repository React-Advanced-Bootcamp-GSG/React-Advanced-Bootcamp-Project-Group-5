import {  useQuery } from "@tanstack/react-query";
import { useProductRepository } from "../context/ProductRepositoryContext";


export const useGetProductById=(productId:string )=>{

    const {getById}=useProductRepository();
    // const queryClient = useQueryClient();

    return useQuery({
        queryKey: ['product', productId,],
        queryFn : ()=> getById(productId),
        staleTime: 1000 * 60 ,
        // initialData: () => {  
        //     const productsData = queryClient.getQueryData<{ products: Product[] }>(['products', currentPage]); 
        //     if (productsData) {
        //       const product = productsData?.products.find((p: Product) => Number(p.id) === Number(productId));     
        //         return {product:product} ;
        //     } 
        // }
    })
  
}

