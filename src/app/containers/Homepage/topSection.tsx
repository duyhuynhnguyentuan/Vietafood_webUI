import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import styled from "styled-components";
import tw from "twin.macro";
import { IProduct } from "../../../../types/product";
import ProductCard from "../../components/productCard";
import "./index.css";
import Fire from "../../../assets/Fire.json";
import Lottie from "lottie-react";
import { Reveal } from "../../components/animation/Reveal";
import loading from "../../../assets/loading.json";
import { useEffect, useState } from "react";
import axios from "axios";

const HeadingContainer = styled.div`
  ${tw`flex items-center justify-center`}
`;
const LoadingContainer = styled.div`
  ${tw`flex justify-center items-center w-full h-full`}
`;
const Container = styled.div`
  ${tw`w-full max-w-screen-2xl flex flex-col`}
`;

const Heading = styled.h1`
  ${tw`p-2 md:p-4 text-2xl md:text-4xl font-black text-primary`}
`;

const StyledSwiper = styled(Swiper)`
  height: 41rem;
  padding: 0 0 2rem 0;
  position: relative;

  .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 30rem;
    height: 33rem;
    position: relative;
  }

  @media (max-width: 500px) {
    height: 41rem;
    .swiper-slide {
      width: 20rem !important;
      height: 33rem !important;
    }
    .swiper-slide img {
      width: 20rem !important;
      height: 20rem !important;
    }
  }

  .swiper-slide img {
    width: 35rem;
    height: 20rem;
    border-radius: 2rem;
    object-fit: cover;
  }

  .swiper-slide-shadow-left,
  .swiper-slide-shadow-right {
    display: none;
  }

  .slider-controler {
    position: absolute;
    bottom: 7rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .slider-arrow {
    background: var(--white);
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 50%;
    margin: 0 1rem;
    filter: drop-shadow(0px 8px 24px rgba(255, 227, 17, 0.1));
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .slider-arrow .ion-icon {
    font-size: 2rem;
    color: #e3c715;
  }

  .slider-arrow::after {
    content: "";
  }

  .swiper-pagination {
    position: relative;
    width: 15rem !important;
    bottom: 1rem;
  }

  .swiper-pagination .swiper-pagination-bullet {
    filter: drop-shadow(0px 8px 24px rgba(254, 254, 0, 0.1));
  }

  .swiper-pagination .swiper-pagination-bullet-active {
    background: var(--primary);
  }
`;

const LottieWrapper = styled.div`
  ${tw`flex items-center md:w-[2rem]`}
  width: 1.5rem;
  height: 1.5rem;
`;

export function TopSection() {
  const [products, setProducts] = useState<IProduct[]>([]);
  
  useEffect(() => {
    let apiUrl = "https://vietafoodtrial.somee.com/api/product?SortOption=price&isSortDesc=true";
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
          // Duplicate products if there are less than 10
          const duplicatedProducts = [...fetchedProducts];
          while (duplicatedProducts.length < 10) {
            duplicatedProducts.push(...fetchedProducts);
          }
          setProducts(duplicatedProducts.slice(0, 10)); // Limit to 10 products
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const isEmptyTopProducts = !products || products.length === 0;
  let productSlides: JSX.Element[] = [];
  productSlides = products.map((product) => (
    <SwiperSlide >
      <ProductCard isTopProduct={true} {...product} />
    </SwiperSlide>
  ));

  return (
    <Container>
      <HeadingContainer>
        <Heading>Top sản phẩm bán chạy</Heading>
        <LottieWrapper>
          <Lottie animationData={Fire} loop={true} />
        </LottieWrapper>
      </HeadingContainer>
      {!isEmptyTopProducts ? (
        <Reveal width="100%">
          <StyledSwiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            loop={true}
            slidesPerView={"auto"}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
            }}
            pagination={{ el: ".swiper-pagination", clickable: true }}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            modules={[EffectCoverflow, Pagination, Navigation]}
          >
            {productSlides}
            <div className="slider-controler">
              <div className="swiper-button-prev slider-arrow">
                <ArrowCircleLeftOutlinedIcon
                  className="ion-icon"
                  fontSize="large"
                />
              </div>
              <div className="swiper-button-next slider-arrow">
                <ArrowCircleRightOutlinedIcon
                  className="ion-icon"
                  fontSize="large"
                />
              </div>
              <div className="swiper-pagination"></div>
            </div>
          </StyledSwiper>
        </Reveal>
      ) : (
        <LoadingContainer>
          <Lottie animationData={loading} loop={true} />
        </LoadingContainer>
      )}
    </Container>
  );
}
