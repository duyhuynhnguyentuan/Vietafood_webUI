import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import tw from "twin.macro";
import SingleProduct from "./SingleProduct";
import { IProduct } from "../../../../types/product";
import { Reveal } from "../../components/animation/Reveal";
import { CategoryFilter } from "../../components/categoryFilter/categoryFilter";
import loading from "../../../assets/loading.json";
import notFound from "../../../assets/notFound.json";
import Lottie from "lottie-react";

const ProductSectionContainer = styled.div`
  ${tw`
    w-full 
    max-w-screen-2xl
    flex 
    flex-col
  `}
`;
const LoadingContainer = styled.div`
  ${tw`flex justify-center items-center w-full h-full`}
`;
const ProductCardContainer = styled.section`
  ${tw`
    w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-28 mt-10 mb-5
  `}
`;

const Heading = styled.h1`
  ${tw`p-2 md:p-4 text-4xl md:text-5xl font-black text-primary`}
`;

const HeaderContainer = styled.section`
  ${tw`
    flex flex-col items-center md:flex-row md:mx-[10rem] md:justify-between
  `}
`;

const ErrorContainer = styled.div`
  ${tw`flex flex-col justify-center items-center w-full h-full`}
`;

const ErrorMessage = styled.div`
  ${tw`text-primary text-2xl md:text-4xl font-black mt-4`}
`;

export function ProductSection() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [currentFilter, setCurrentFilter] = useState<string>("Tất cả");

  const getQueryParams = () => {
    return new URLSearchParams(location.search);
  };

  useEffect(() => {
    const queryParams = getQueryParams();
    const productName = queryParams.get("Name");
    const sortOption = queryParams.get("SortOption");
    const isSortDesc = queryParams.get("isSortDesc");

    let apiUrl = "https://vietafoodtrial.somee.com/api/product";
    const params = [];

    if (productName) {
      params.push(`Name=${encodeURIComponent(productName)}`);
    }
    if (sortOption) {
      params.push(`SortOption=${encodeURIComponent(sortOption)}`);
      setCurrentFilter("A-Z");
    }
    if (isSortDesc !== null) {
      params.push(`isSortDesc=${encodeURIComponent(isSortDesc)}`);
      if (isSortDesc === 'true') {
        setCurrentFilter('Giá: Cao đến thấp');
      } else if (isSortDesc === 'false') {
        setCurrentFilter('Giá: Thấp đến cao');
      }
    }

    if (params.length > 0) {
      apiUrl += "?" + params.join("&");
    }
    console.log(apiUrl);
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
          setErrorMessage(null); // Clear any previous error message
        } else {
          setErrorMessage(`Không tìm thấy kết quả cho "${productName}"`);
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        if (error.response && error.response.status === 404) {
          setErrorMessage(`Không tìm thấy kết quả cho "${productName}"`);
        } else {
          setErrorMessage("Đã xảy ra lỗi khi tải sản phẩm.");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [location.search]);

  return (
    <ProductSectionContainer>
      <HeaderContainer>
        <Heading>SẢN PHẨM</Heading>
        <CategoryFilter currentFilter={currentFilter} />
      </HeaderContainer>

      {isLoading ? (
        <LoadingContainer>
          <Lottie animationData={loading} loop={true} />
        </LoadingContainer>
      ) : errorMessage ? (
        <ErrorContainer>
          <Lottie animationData={notFound} loop={true} />
          <ErrorMessage>{errorMessage}</ErrorMessage>
        </ErrorContainer>
      ) : (
        <ProductCardContainer>
          {products.map((product) => (
            <Reveal>
              <SingleProduct {...product} />
            </Reveal>
          ))}
        </ProductCardContainer>
      )}
    </ProductSectionContainer>
  );
}
