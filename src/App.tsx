import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { Navbar } from "./app/components/navbar";
import { Footer } from "./app/components/footer";
import { Cart } from "./app/containers/Cart";
import { useSelector } from "react-redux";
import { RootState } from "./app/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet";
// Define the props type for the App component
interface AppProps {
  content: JSX.Element;
  isshowBackground: boolean;
}

const AppContainer = styled.div`
  ${tw`
    w-full
    h-full
    flex
    flex-col
  `};
`;

const PageContainer = styled.div`
  ${tw`
    flex
    flex-col
    h-full
    w-full
    items-center
    overflow-x-hidden
  `}
`;

const App: React.FC<AppProps> = ({ content, isshowBackground }) => {
  const { isOpen } = useSelector((state: RootState) => state.checkout);
  return (
    <div>
     <Helmet>
    <title>VietaFood Shop - Trái cây sấy dẻo</title>
    <meta name="description" content="Chúng tôi, VietaFood, cam kết mang đến cho người tiêu dùng trong và ngoài nước những sản phẩm trái cây sấy dẻo chất lượng cao, đậm đà hương vị thiên nhiên của Việt Nam. Với lòng nhiệt huyết và sự tận tâm của đội ngũ nhân viên, chúng tôi không ngừng nâng cao quy trình sản xuất và tiêu chuẩn chất lượng nhằm đảm bảo mỗi sản phẩm không chỉ giữ nguyên hương vị tự nhiên mà còn an toàn và bổ dưỡng.!"/>
    <meta property="og:title" content="VietaFood Shop"/>
    <meta property="og:description" content="Chúng tôi, VietaFood, cam kết mang đến cho người tiêu dùng trong và ngoài nước những sản phẩm trái cây sấy dẻo chất lượng cao, đậm đà hương vị thiên nhiên của Việt Nam. Với lòng nhiệt huyết và sự tận tâm của đội ngũ nhân viên, chúng tôi không ngừng nâng cao quy trình sản xuất và tiêu chuẩn chất lượng nhằm đảm bảo mỗi sản phẩm không chỉ giữ nguyên hương vị tự nhiên mà còn an toàn và bổ dưỡng!"/>
    <meta property="og:image" content="https://vietafood.shop/assets/logo-lPjZkMnY.png"/>
    <meta property="og:url" content="https://vietafood.shop/"/>
    <meta property="og:type" content="website"/>
    <meta property="twitter:title" content="VietaFood Shop"/>
    <meta property="twitter:description" content="Chúng tôi, VietaFood, cam kết mang đến cho người tiêu dùng trong và ngoài nước những sản phẩm trái cây sấy dẻo chất lượng cao, đậm đà hương vị thiên nhiên của Việt Nam. Với lòng nhiệt huyết và sự tận tâm của đội ngũ nhân viên, chúng tôi không ngừng nâng cao quy trình sản xuất và tiêu chuẩn chất lượng nhằm đảm bảo mỗi sản phẩm không chỉ giữ nguyên hương vị tự nhiên mà còn an toàn và bổ dưỡng!"/>
    <meta property="twitter:image" content="https://vietafood.shop/assets/logo-lPjZkMnY.png"/>
    <meta property="twitter:summary" content="Trái cấy sấy dẻo - Vietafood"/>
      </Helmet>
        <AppContainer>
          <PageContainer>
            <ToastContainer />
            {isOpen && <Cart />}
            <Navbar isshowBackground={isshowBackground} />
            {content}
            <Footer />
          </PageContainer>
        </AppContainer>
    </div>
  );
};

export default App;
