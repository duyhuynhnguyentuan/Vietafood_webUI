import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import tw from 'twin.macro';
import SingleProduct from './SingleProduct';
import { IProduct } from '../../../../types/product';
import { Reveal } from '../../components/animation/Reveal';
import { CategoryFilter } from '../../components/categoryFilter/categoryFilter';

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
`;

const Heading = styled.h1`
  ${tw`p-2 md:p-4 text-4xl md:text-5xl font-black text-primary`}
`;

const HeaderContainer = styled.section`
  ${tw`
    flex flex-col items-center md:flex-row md:mx-[10rem] md:justify-between
  `}
`;

export function ProductSection() {
  const location = useLocation();
  const [products, setProducts] = useState<IProduct[]>([]);
  console.log(products)
  // Function to parse query parameters
  const getQueryParams = () => {
    return new URLSearchParams(location.search);
  };

  useEffect(() => {
    const queryParams = getQueryParams();
    const productName = queryParams.get('Name');
    const sortOption = queryParams.get('SortOption');
    const isSortDesc = queryParams.get('isSortDesc');

    // Construct the API URL with query parameters if they are present
    let apiUrl = 'http://www.vietafood.somee.com/api/product';
    const params = [];

    if (productName) {
      params.push(`Name=${encodeURIComponent(productName)}`);
    }
    if (sortOption) {
      params.push(`SortOption=${encodeURIComponent(sortOption)}`);
    }
    if (isSortDesc !== null) {
      params.push(`isSortDesc=${encodeURIComponent(isSortDesc)}`);
    }

    if (params.length > 0) {
      apiUrl += '?' + params.join('&');
    }
    console.log(apiUrl);
    axios.get(apiUrl)
      .then(response => {
        if (response.data && response.data.data && response.data.data.items) {
          const fetchedProducts = response.data.data.items.map((item: any) => ({
            productKey: item.productKey,
            name: item.name,
            description: item.description,
            guideToUsing: item.guildToUsing,
            weight: item.weight,
            expiryDay: item.expiryDay,
            imageUrl: item.imageUrl,
            quantity: item.quantity,
            status: item.status,
            price: item.price // Assuming price is not in the API response, set it as needed
          }));
          setProducts(fetchedProducts);
        }
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, [location.search]);

  return (
    <ProductSectionContainer>
      <HeaderContainer>
        <Heading>SẢN PHẨM</Heading>
        <CategoryFilter />
      </HeaderContainer>
      <ProductCardContainer>
        {products.map((product) => (
          <Reveal>
            <SingleProduct {...product} />
          </Reveal>
        ))}
      </ProductCardContainer>
    </ProductSectionContainer>
  );
}
