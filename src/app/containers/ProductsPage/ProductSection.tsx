import styled from "styled-components";
import tw
 from "twin.macro";
import SingleProduct from "./SingleProduct";
import { IProduct } from "../../../../types/product";
import mit from '../../../assets/mit.png';
import thom from '../../../assets/thom.png';
import { Reveal } from "../../components/animation/Reveal";
import { CategoryFilter } from "../../components/categoryFilter/categoryFilter";
const ProductSectionContainer = styled.div`
  ${tw`
    w-full 
    max-w-screen-2xl
    flex 
    flex-col
  `}
`;

const ProductCardContainer = styled.section`
  ${tw`
  w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-28 mt-10 mb-5
  `}
`
const Heading = styled.h1`
  ${tw`p-2 md:p-4 text-4xl md:text-5xl font-black text-primary`}
`;

const HeaderContainer = styled.section`
     ${tw`
   flex flex-col  items-center md:flex-row md:mx-[10rem] md:justify-between
  `}
  `

export function ProductSection(){
  const testProduct: IProduct = {
    productId: '1',
    name: 'Thơm sấy dẻo, bịch, 250 gram',
    category: 'Trái cây sấy',
    price: 50000,
    quantityInStock: 4,
    description:
      'Thơm (dứa) là một loại trái cây tốt cho sức khỏe được sấy dẻo tự nhiên không đường, chứa nhiều Vitamin và dưỡng chất chống oxy hóa, hỗ trợ sức khỏe tim mạch, hỗ trợ đường tiêu hóa.',
    guideToUsing:
      'Có thể dùng ăn trực tiếp hoặc ngâm trà detox. Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp.',
    weight: '250 gram',
    expiryDay: '6 tháng ngày sản xuất',
    discount: 50,
    dateCreated: '2023-09-02',
    imageURL: thom,
  };

  const testProduct2: IProduct = {
    productId: '2',
    name: 'Mit sấy dẻo, bịch, 250 gram',
    category: 'Trái cây sấy',
    price: 50000,
    quantityInStock: 4,
    description:
      'Mit là một loại trái cây tốt cho sức khỏe được sấy dẻo tự nhiên không đường, chứa nhiều Vitamin và dưỡng chất chống oxy hóa, hỗ trợ sức khỏe tim mạch, hỗ trợ đường tiêu hóa.',
    guideToUsing:
      'Có thể dùng ăn trực tiếp hoặc ngâm trà detox. Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp.',
    weight: '250 gram',
    expiryDay: '6 tháng ngày sản xuất',
    discount: 50,
    dateCreated: '2023-09-02',
    imageURL: mit,
  };

  const products = [testProduct, testProduct2, testProduct, testProduct2, testProduct, testProduct2];

    return(
        <ProductSectionContainer>
          <HeaderContainer>
            <Heading>SẢN PHẨM</Heading>
            <CategoryFilter/>
          </HeaderContainer>
          <ProductCardContainer>
          {products.map((product) => {
            return (
              <Reveal>
              <SingleProduct {...product} />
              </Reveal>
            )
          })}
          </ProductCardContainer>
        </ProductSectionContainer>
    )
}