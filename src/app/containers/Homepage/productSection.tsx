import styled from "styled-components";
import tw from "twin.macro";
import ProductCard from "../../components/productCard";
import { IProduct } from "../../../../types/product";
import { Reveal } from "../../components/animation/Reveal";
import loading from "../../../assets/loading.json";
import { useEffect, useState } from "react";
import axios from "axios";
import Lottie from "lottie-react";
const PageContainer = styled.div`
  ${tw` w-full max-w-screen-2xl flex flex-col`}
`;
const SectionContainer = styled.div`
  ${tw` mx-10`}
`;
const LoadingContainer = styled.div`
  ${tw`flex justify-center items-center w-full h-full`}
`;
const Title = styled.p`
  ${tw`
    text-primary text-xl md:text-2xl lg:text-3xl font-medium mb-4 text-center md:text-start 
    `}
`;
const ProductContainer = styled.div`
  ${tw`
    grid grid-cols-1 gap-y-6 md:grid-cols-2 lg:grid-cols-3 justify-items-center md:gap-x-6 lg:gap-x-8 md:gap-y-10 lg:gap-y-12 
  `}
`;

export function ProductSection() {
  const [products, setProducts] = useState<IProduct[]>([]);
  useEffect(() => {
    let apiUrl =
      "https://vietafoodtrial.somee.com/api/product?SortOption=price&isSortDesc=true";
    axios
      .get(apiUrl)
      .then((response) => {
        if (response.data && response.data.data && response.data.data.items) {
          const fetchedProducts = response.data.data.items.map((item: any) => ({
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
          }));
          setProducts(fetchedProducts);
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  });
  const isEmptyTopProducts = !products || products.length === 0;

  let productsList: JSX.Element[] = [];
  productsList = products.map((product) => (
    <Reveal>
      <ProductCard isTopProduct={false} {...product} />
    </Reveal>
  ));
  return (
    <PageContainer>
      <SectionContainer>
        <Title>Danh sách sản phẩm</Title>
        {!isEmptyTopProducts ? (
          <ProductContainer>{productsList}</ProductContainer>
        ) : (
          <LoadingContainer>
            <Lottie animationData={loading} loop={true} />
          </LoadingContainer>
        )}
      </SectionContainer>
    </PageContainer>
  );
}
