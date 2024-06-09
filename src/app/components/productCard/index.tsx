import { IProduct } from "../../../../types/product";
import React from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import tw from 'twin.macro';

interface IProductProps extends IProduct {
  isTopProduct?: boolean;
}

const formatPrice = (price: number ): string => {
  return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
};

const Card = styled.div<{ isTopProduct: boolean }>`
  ${tw`bg-white rounded-[2rem] overflow-hidden shadow-lg max-w-sm ring-4 ring-opacity-60`}
  ${({ isTopProduct }) => isTopProduct ? tw`ring-secondary` : tw`ring-gray-100`}
`;

const ImageContainer = styled.div`
  ${tw`relative`}
`;

const Image = styled.img`
  ${tw`w-full`}
`;

const SaleBadge = styled.div`
  ${tw`absolute top-0 right-0 bg-red-500 text-white px-2 py-1 m-4 rounded-md text-sm font-medium`}
`;

const Content = styled.div`
  ${tw`p-4`}
`;

const Title = styled.h3`
  ${tw`text-lg text-primary font-extrabold mb-2`}
`;

const Description = styled.p`
  ${tw`text-gray-600 text-sm mb-4`}
`;

const Price = styled.span`
  ${tw`font-bold text-lg text-primary`}
`;

const BuyButton = styled.button`
  ${tw`bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded`}
`;

const FlexContainer = styled.div`
  ${tw`flex items-center justify-between`}
`;

const ProductCard: React.FC<IProductProps> = (props) => {
  const {
    productKey,
    name,
    price,
    weight,
    imageUrl,
    isTopProduct = false,
  } = props;

  return (
    <Card isTopProduct={isTopProduct}>
      <ImageContainer>
        <Link to={`/product/${productKey}`}>
          <Image src={imageUrl} alt={name} />
        </Link>
        {isTopProduct && <SaleBadge>MỚI</SaleBadge>}
      </ImageContainer>
      <Content>
        <Link to={`/product/${productKey}`}>
          <Title>{name}</Title>
        </Link>
        <Description>{weight}</Description>
        <FlexContainer>
          <Price>{formatPrice(price!)}</Price>
          <Link to={`/product/${productKey}`}>
            <BuyButton>Mua ngay</BuyButton>
          </Link>
        </FlexContainer>
      </Content>
    </Card>
  );
}

export default ProductCard;
