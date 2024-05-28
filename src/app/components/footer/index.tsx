import styled from "styled-components";
import { Logo } from "../logo";
import tw from "twin.macro";
import { Facebook, Instagram, MailOutline, Phone, Room } from "@mui/icons-material";

const Container = styled.div`
  display: flex;
  ${tw`
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
          Nơi mang đến sự tươi mới và dinh dưỡng cho bữa ăn hàng ngày của bạn! Chúng tôi tự hào giới thiệu về mình là đội ngũ chuyên gia hàng đầu trong lĩnh vực trái cây sấy dẻo, cam kết đem lại những sản phẩm chất lượng cao để nâng cao sức khỏe cho cộng đồng người Việt.
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
          <Room style={{ marginRight: "10px" }} />
          64/21 Xuân Diệu, Phường 4, Quận Tân Bình, Tp. HCM, Việt Nam
        </ContactItem>
        <ContactItem>
          <Phone style={{ marginRight: "10px" }} />
          <a href="tel:0858731831">0858 731 831</a>
        </ContactItem>
        <ContactItem>
          <MailOutline style={{ marginRight: "10px" }} />
          <a href="mailto:andyhntd2003@gmail.com">andyhntd2003@gmail.com</a>
        </ContactItem>
      </Right>
    </Container>
  );
}
