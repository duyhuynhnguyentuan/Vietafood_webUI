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
import mitsay from '../../../assets/MITSAY.mp4';
import thomsay from '../../../assets/THOMSAY.mp4';
import xoaisay from '../../../assets/XOAISAY.mp4';
import vobuoisay from '../../../assets/VOBUOISAY.mp4';
const getVideo = (name: String) => {
  switch (name) {
    case "MÍT SẤY DẺO":
      return mitsay;
    case "THƠM SẤY DẺO":
      return thomsay;
    case "XOÀI SẤY DẺO":
      return xoaisay;
    case "VỎ BƯỞI SẤY DẺO":
      return vobuoisay;
    default:
      return null;
  }
}

const LoadingContainer = styled.div`
  ${tw`flex justify-center items-center mt-[100px] md:mt-0 w-full h-full`}
`;
const PageContainer = styled.div`
   ${tw`
    flex
    flex-col
    w-full
    h-full
    items-center
   `}
`;

const ProductDetailContainer = styled.div`
  ${tw`
  
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
                <div>
                 <video className="w-full md:h-[32vw] h-[56.25vw] object-cover brightness-[70%] transition duration-500" autoPlay muted loop playsInline src={getVideo(product.name!)!}></video>
                <ProductDetailCell {...product} />
                </div>
                </Reveal>
            )
                }
                <Marginer margin="5em" direction="vertical"/>
             
            </ProductDetailContainer>
         </PageContainer>
      )
}
