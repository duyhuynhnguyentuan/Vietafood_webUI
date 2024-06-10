import styled from "styled-components";
import tw from "twin.macro";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import fruit1 from '../../../assets/fruit1.png';
import fruit2 from '../../../assets/fruit2.jpg';
import fruit3 from '../../../assets/fruit3.jpg';
import { Button } from "../../components/button";
import { useMediaQuery } from "react-responsive";
import { SCREENS } from "../../components/responsive";

const BannerContainer = styled.div`
  ${tw`
    w-full 
    max-w-screen-2xl
    flex 
    flex-row
  `}
`;

const StyledSwiper = styled(Swiper)`
  width: 100%;
  height: 100%;

  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .swiper-button-next,
  .swiper-button-prev {
    visibility: hidden;
  }
`;

const slides = [
  {
    imageUrl: fruit1,
    text: "Các sản phẩm của Vietafood đã có mặt ",
    buttonText: "Đến trang của Shopee",
    externalUrl: 'https://vn.shp.ee/ChacKa9',
    text2: "trên nền tảng Shopee!"
  },
  {
    imageUrl: fruit2,
    text: "Trái cây tốt cho sức khỏe giá tốt tại Vietafood!",
    buttonText: "Hãy mua ngay",
    externalUrl: '/products',
    text2: ''
  },
  {
    imageUrl: fruit3,
    text: "Những sản phẩm tốt cho sức khỏe mới",
    buttonText: "Đến trang mua hàng",
    externalUrl: "/products",
    text2: "đã có trên Vietafood!"
  },
];

export function SwipperBanner() {
  const isMobile = useMediaQuery({ maxWidth: SCREENS.md });
  return (
    <BannerContainer>
      <StyledSwiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide>
            <div className="relative w-[100vw] h-[300px] md:h-[500px]">
              <img
                src={slide.imageUrl}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black opacity-70"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 flex-wrap text-white text-center">
                {isMobile ?  <h1 className="text-md md:text-5xl font-bold drop-shadow-xl md:max-w-screen-xl">
                  {slide.text}{slide.text2}
                </h1> :  
                <div>

                <h1 className="text-md md:text-5xl font-bold drop-shadow-xl md:max-w-screen-xl">
                  {slide.text}
                </h1>
                <h1 className="mb-4 text-md md:text-5xl font-bold drop-shadow-xl md:max-w-screen-xl">
                  {slide.text2}
                </h1>
                </div>
                }
                <Button text={slide.buttonText} externalUrl={slide.externalUrl} />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </StyledSwiper>
    </BannerContainer>
  );
}
