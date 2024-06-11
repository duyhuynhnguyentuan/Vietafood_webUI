import styled from "styled-components";
import { Logo } from "../logo";
import tw from "twin.macro";
import { Facebook, Instagram, MailOutline, Phone } from "@mui/icons-material";

const Container = styled.div`
  display: flex;
  ${tw`
  max-w-screen-2xl
  flex-col
  md:flex-row
  bg-primary
  text-white
  `}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Right = styled.div`
 display: flex;
  flex-direction: column;
  padding: 20px;
  flex: 1;
`;

const Desc = styled.p`
  ${tw`
    py-5
  `}
`;

const SocialContainer = styled.div`
  ${tw`
    flex
  `}
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${props => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const Title = styled.h3`
  margin-bottom: 30px;
  ${tw`
   font-semibold
   text-3xl
  `}
`;

export function Footer() {
  return (
    <Container>
      <Left>
        <Logo />
        <Desc>
        VietaFood mong muốn mang hình ảnh tươi đẹp của trái cây Việt Nam vươn ra thế giới. Chúng tôi tự hào khi được góp một phần quảng bá nông sản Việt, từ những trang trại xanh tươi đến bàn ăn ấm cúng của mọi gia đình, chia sẻ sự phong phú và tinh túy của nền nông nghiệp quê hương.
        </Desc>
        <SocialContainer>
          <a href="https://www.facebook.com/VietaFood" target="_blank" rel="noopener noreferrer">
            <SocialIcon color="3B5999">
              <Facebook />
            </SocialIcon>
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <SocialIcon color="E4405F">
              <Instagram />
            </SocialIcon>
          </a>
        </SocialContainer>
      </Left>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <Phone style={{ marginRight: "10px" }} />
          <a href="tel:0858731831" style={{ textDecoration: 'underline' }}>0858 731 831</a>
        </ContactItem>
        <ContactItem>
          <MailOutline style={{ marginRight: "10px" }} />
          <a href="mailto:vietafood.shop@gmail.com" style={{ textDecoration: 'underline' }}>vietafood.shop@gmail.com</a>
        </ContactItem>
      </Right>
    </Container>
  );
}
