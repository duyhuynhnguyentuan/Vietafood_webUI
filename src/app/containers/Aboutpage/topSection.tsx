import Lottie from "lottie-react";
import styled from "styled-components";
import tw from "twin.macro";
import hello from '../../../assets/hello.json';
import { Reveal } from "../../components/animation/Reveal";
const TopSectionContainer = styled.div`
  ${tw`
    px-7
    w-full 
    max-w-screen-2xl
    flex 
    flex-col-reverse
    md:flex-row
    justify-center

  `}
`;

const LottieWrapper = styled.div`
  ${tw`
  md:ml-24
    flex 
    items-center
    md:order-last // Ensures Lottie container is on the right on larger screens
  `}
`;

export function AboutPageTopSection() {
  return (
    <TopSectionContainer>
      <section className="overflow-hidden md:pt-0 sm:pt-16 2xl:pt-16">
        <div className=" mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid items-center grid-cols-1 md:grid-cols-2">
            <LottieWrapper>
              <Lottie animationData={hello} loop={true}/>
            </LottieWrapper>
            <Reveal>
            <div>
              <h2 className="text-3xl font-bold md:text-start text-center leading-tight text-black sm:text-4xl lg:text-5xl">
                👋 Chào mừng bạn đến  
                <br className="block sm:hidden" />
                 <span className="text-primary">{" "}Vietafood!</span>
              </h2>
              <p className="max-w-lg mt-3 text-xl leading-relaxed text-gray-600 md:mt-8">
              Nơi mang đến sự tươi mới và dinh dưỡng cho bữa ăn hàng ngày của bạn! Chúng tôi tự hào giới thiệu về mình là đội ngũ chuyên gia hàng đầu trong lĩnh vực trái cây sấy dẻo, cam kết đem lại những sản phẩm chất lượng cao để nâng cao sức khỏe cho cộng đồng người Việt.
              </p>
              <p className="mt-4 text-xl text-gray-600 md:mt-8">
                <span className="relative inline-block">
                  <span className="absolute inline-block w-full bottom-0.5 h-2 bg-yellow-300"></span>
                  <span className="relative"> Bạn có câu hỏi?</span>
                </span>
                <br className="block sm:hidden" />
                {" "}Liên hệ chúng tôi qua{" "}
                <a href="https://www.facebook.com/VietaFood" title="" className="transition-all duration-200 text-sky-500 hover:text-sky-600 hover:underline">
                  Facebook
                </a>
              </p>
            </div>
            </Reveal>
          </div>
        </div>
      </section>
    </TopSectionContainer>
  );
}
