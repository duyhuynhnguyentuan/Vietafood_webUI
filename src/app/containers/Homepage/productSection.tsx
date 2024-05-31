import styled from "styled-components";
import tw from "twin.macro";
import ProductCard from "../../components/productCard";
import { IProduct } from "../../../../types/product";
import { Reveal } from "../../components/animation/Reveal";
import mit from '../../../assets/mit.png';
import thom from '../../../assets/thom.png';

const PageContainer = styled.div`
${tw` w-full max-w-screen-2xl flex flex-col`}
`
const SectionContainer = styled.div`
    ${tw` mx-10`}
`

const Title = styled.p`
    ${tw`
    text-primary text-xl md:text-2xl lg:text-3xl font-medium mb-4 text-center md:text-start 
    `}
`
const ProductContainer = styled.div`
  ${tw`
    grid grid-cols-1 gap-y-6 md:grid-cols-2 lg:grid-cols-3 justify-items-center md:gap-x-6 lg:gap-x-8 md:gap-y-10 lg:gap-y-12 
  `}
`;

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
    
      const topProducts = [testProduct, testProduct2, testProduct, testProduct2, testProduct, testProduct2];
    //   const isEmptyTopProducts = !topProducts || topProducts.length === 0;
      let products: JSX.Element[] = [];
      const Allproducts = topProducts;
      products = Allproducts.map((product) => (
        <Reveal>
          <ProductCard isTopProduct={false} {...product} />
        </Reveal>
      ));
      return(
    <PageContainer>
        <SectionContainer>
            <Title>Danh sách sản phẩm</Title>
            <ProductContainer>
                {products}
            </ProductContainer>
              
        </SectionContainer>
    </PageContainer>)
}