import styled from "styled-components";
import tw
 from "twin.macro";
const ProductSectionContainer = styled.div`
  ${tw`
    w-full 
    max-w-screen-2xl
    flex 
    flex-row
  `}
`;

export function ProductSection(){
    return(
        <ProductSectionContainer>
            
        </ProductSectionContainer>
    )
}