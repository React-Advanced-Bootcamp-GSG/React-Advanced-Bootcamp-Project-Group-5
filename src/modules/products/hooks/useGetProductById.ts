import {  useQuery, useQueryClient } from "@tanstack/react-query";
import { restProducts } from "../repository/restProducts";
import type { Product } from "../types/entities";


export const useGetProductById=(productId:string , currentPage:number)=>{

    const {getById}=restProducts();
    const queryClient = useQueryClient();

    return useQuery({
        queryKey: ['product', productId,],
        queryFn : ()=> getById(productId),
        staleTime: 1000 * 60 ,
        initialData: () => {  
            const productsData = queryClient.getQueryData<{ products: Product[] }>(['products', currentPage]); 
            if (productsData) {
              const product = productsData?.products.find((p: Product) => Number(p.id) === Number(productId));     
                return {product:product} ;
            } 
        }
    })
  
}

