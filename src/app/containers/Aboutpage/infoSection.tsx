import styled from "styled-components";
import tw from "twin.macro";
import aboutImage from '../../../assets/aboutImage.jpeg';
import { SlideReveal } from "../../components/animation/SlideReveal";
import { Reveal } from "../../components/animation/Reveal";
const SectionContainer = styled.div`
  ${tw`
    px-7
     md:px-14
     lg:px-[6rem]
    w-full 
    max-w-screen-2xl
    flex-col
    
   
    justify-center
  `}
`;
const ParaImageContainer = styled.div`
    ${tw`
    grid items-center grid-cols-1 md:grid-cols-2
    md:gap-16
    `}
`
const ParagraphContainer = styled.div`
${tw`
mt-6 md:mt-0
flex
flex-col
`}
`
const Paragraph = styled.p`
${tw`
     mt-3 text-xl font-light leading-relaxed text-gray-600 md:mt-8 
`}
`
const ImageContainer = styled.div`
  ${tw`
  
  relative
  mt-8
  `}
`;
const Title = styled.h1`
${tw`
    text-3xl font-mono  text-center leading-tight text-black sm:text-4xl lg:text-5xl
`}
`

const Image = styled.img`
  ${tw`w-full
 
  `}
`;

export function InfoSection(){
    return(
        <SectionContainer>
            <Title>About Us</Title>
            <ParaImageContainer>

            <SlideReveal>
            <ImageContainer>
                <Image src={aboutImage} alt="aboutUs"/>
            </ImageContainer>
            </SlideReveal>
            <ParagraphContainer>
            <Reveal>
          <Paragraph>     
            VietaFood ra đời vào năm 2023, với sứ mệnh tạo ra những sản phẩm trái cây sấy dẻo tinh khiết và ngon miệng, giúp mọi người dễ dàng tích hợp thêm loại thực phẩm giàu dinh dưỡng vào chế độ ăn hàng ngày. Chúng tôi cam kết sử dụng nguồn nguyên liệu tươi ngon nhất, đảm bảo quy trình sản xuất an toàn và hiện đại để giữ nguyên hương vị và giá trị dinh dưỡng tối đa.
            </Paragraph>
            </Reveal>
            <Reveal>
            <Paragraph>
Tại VietaFood, chúng tôi không chỉ là những người làm kinh doanh, mà còn là những người đam mê về sức khỏe và dinh dưỡng. Chúng tôi tin rằng việc thực hiện chế độ ăn giàu trái cây có thể mang lại nhiều lợi ích cho sức khỏe, và đó chính là động lực để chúng tôi không ngừng nỗ lực hơn nữa.
Hãy cùng VietaFood hướng đến một cuộc sống khỏe mạnh hơn, với những sản phẩm trái cây sấy dẻo độc đáo và hấp dẫn. Xin chân thành cảm ơn bạn đã đồng hành và ủng hộ chúng tôi trên hành trình chăm sóc sức khỏe của cộng đồng!
            </Paragraph>
            </Reveal>
            </ParagraphContainer>
            </ParaImageContainer>
        </SectionContainer>
    )
}