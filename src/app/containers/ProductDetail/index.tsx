import styled from "styled-components";
import tw from "twin.macro";
import { IProduct } from "../../../../types/product";
import ProductDetailCell from "./ProductDetailCell";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Marginer } from "../../components/marginer";
import { Reveal } from "../../components/animation/Reveal";
import Lottie from "lottie-react";
import loading from "../../../assets/loading.json";
const LoadingContainer = styled.div`
  ${tw`flex justify-center items-center w-full h-full`}
`;
const PageContainer = styled.div`
   ${tw`
    flex
    flex-col
    w-full
    h-full
    mt-[68px]
    items-center
   `}
`;

const ProductDetailContainer = styled.div`
  ${tw`
    mt-[68px]
    w-full 
    max-w-screen-2xl
    flex 
    flex-col
  `}
`;


export default function ProductDetail() {
    const { id } = useParams<{ id: string }>(); 
    const [product, setProduct] = useState<IProduct>()
    useEffect(() => {
        const apiUrl = `https://vietafoodtrial.somee.com/api/product/${id}`;
        console.log(apiUrl);
        axios.get(apiUrl)
          .then(response => {
            const item = response.data.data; 
            if (item) {
              const fetchedProduct: IProduct = {
                productKey: item.productKey,
                name: item.name,
                description: item.description,
                guideToUsing: item.guildToUsing,
                weight: item.weight,
                expiryDay: item.expiryDay,
                imageUrl: item.imageUrl,
                quantity: item.quantity,
                status: item.status,
                price: item.price,
              };
              setProduct(fetchedProduct);
            }
          })
          .catch(error => {
            console.error("Error fetching product:", error);
            
          });
      }, [id]);
      const isEmptyProduct = !product
      return(
         <PageContainer>
            <ProductDetailContainer>
                {isEmptyProduct? (
                   <LoadingContainer>
                   <Lottie animationData={loading} loop={true} />
                 </LoadingContainer> 
                ) :
                (           
                <Reveal width="100%">
                <ProductDetailCell {...product} />
                </Reveal>
            )
                }
                <Marginer margin="5em" direction="vertical"/>
            </ProductDetailContainer>
         </PageContainer>
      )
}
