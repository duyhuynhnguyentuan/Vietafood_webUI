import styled from "styled-components";
import tw from "twin.macro";
import ProductCard from "../../components/productCard";
import { IProduct } from "../../../../types/product";


const PageContainer = styled.div`
${tw` w-full max-w-screen-2xl flex flex-col`}
`
const SectionContainer = styled.div`
    ${tw`mx-10`}
`

const Title = styled.p`
    ${tw`
    text-primary text-xl md:text-2xl lg:text-3xl font-medium mb-4 text-center md:text-start 
    `}
`
const ProductContainer = styled.div`
    ${tw`
        grid grid-cols-1 justify-items-center gap-y-6 md:grid-cols-3 md:gap-x-10 md:gap-y-12
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
        imageURL: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
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
        imageURL: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
      };
    
      const topProducts = [testProduct, testProduct2, testProduct, testProduct2, testProduct, testProduct2];
      const isEmptyTopProducts = !topProducts || topProducts.length === 0;
      let products: JSX.Element[] = [];
      const Allproducts = topProducts;
      products = Allproducts.map((product) => (
          <ProductCard isTopProduct={false} {...product} />
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