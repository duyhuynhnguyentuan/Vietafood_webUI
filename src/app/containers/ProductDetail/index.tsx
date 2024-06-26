import styled from "styled-components";
import tw from "twin.macro";
import { IProduct } from "../../../../types/product";
import ProductDetailCell from "./ProductDetailCell";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Marginer } from "../../components/marginer";
import { Reveal } from "../../components/animation/Reveal";
import Lottie from "lottie-react";
import loading from "../../../assets/loading.json";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoadingContainer = styled.div`
  ${tw`flex justify-center items-center mt-[100px] md:mt-0 w-full h-full`}
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
    const navigate = useNavigate();
    useEffect(() => {
        window.scrollTo(0, 0); 
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
            const id = toast.error("Không thể tìm thấy sản phẩm, đang quay về trang chủ...");
            setTimeout(() => {
                navigate("/")
                toast.update(id, {render: "Đã quay về Trang chủ", type: "success", isLoading: false});
            }, 3000); //
          });
      }, []);
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
