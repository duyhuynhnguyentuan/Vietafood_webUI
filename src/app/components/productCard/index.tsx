import { IProduct } from "../../../../types/product";
import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

interface IProductProps extends IProduct {
  isTopProduct?: boolean;
}

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
  ${tw`text-lg font-medium mb-2`}
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
    productId,
    name,
    category,
    price,
    quantityInStock,
    description,
    guideToUsing,
    weight,
    expiryDay,
    discount,
    dateCreated,
    imageURL,
    isTopProduct = false,
  } = props;

  return (
    <Card isTopProduct={isTopProduct}>
      <ImageContainer>
        <Image src={imageURL} alt={name} />
        {isTopProduct && <SaleBadge>MỚI</SaleBadge>}
      </ImageContainer>
      <Content>
        <Title>{name}</Title>
        <Description>{weight}</Description>
        <FlexContainer>
          <Price>₫{price}</Price>
          <BuyButton>Mua ngay</BuyButton>
        </FlexContainer>
      </Content>
    </Card>
  );
}

export default ProductCard;
