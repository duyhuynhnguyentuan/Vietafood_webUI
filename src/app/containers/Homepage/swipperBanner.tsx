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
    color: #E5BC69;
  }
`;

const slides = [
  {
    imageUrl: fruit1,
    text: "Các sản phẩm của Vietafood đã có mặt trên nền tảng Shopee!",
    buttonText: "Đến trang của Shopee",
    externalUrl: 'https://vn.shp.ee/ChacKa9'
  },
  {
    imageUrl: fruit2,
    text: "Trái cây tốt cho sức khỏe giá tốt tại Vietafood",
    buttonText: "Hãy mua ngay",
    externalUrl: '/products'
  },
  {
    imageUrl: fruit3,
    text: "Hãy bấm mua ngay",
    buttonText: "Đặt mua ngay",
    externalUrl: "https://shopee.vn/-E-voucher-D%E1%BB%8Bch-v%E1%BB%A5-D%E1%BB%8Bch-v%E1%BB%A5-ph%C3%A1t-h%C3%A0nh-th%E1%BA%BB-MB-Hi-Visa-Collection-B%E1%BB%99-s%C6%B0u-t%E1%BA%ADp-ACE-Ph%C3%A1t-S%C3%A1ng-i.867040476.21189355634?publish_id=&sp_atk=3e53dc84-de21-47a6-a8ed-dcaeb9ff4a80&xptdk=3e53dc84-de21-47a6-a8ed-dcaeb9ff4a80"
  },
];

export function SwipperBanner() {
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
                <h1 className="mb-4 text-3xl md:text-5xl font-bold drop-shadow-xl">
                  {slide.text}
                </h1>
                <Button text={slide.buttonText} externalUrl={slide.externalUrl} />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </StyledSwiper>
    </BannerContainer>
  );
}
