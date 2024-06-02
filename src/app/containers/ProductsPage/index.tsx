import styled from "styled-components";
import tw from "twin.macro";
import { ProductSection } from "./ProductSection";
import { Marginer } from "../../components/marginer";

const PageContainer = styled.div`
   ${tw`
    flex
    flex-col
    w-full
    h-full
    mt-[68px]
    items-center
   `}
`;

export function ProductsPage(){
    return(
        <PageContainer>
            <Marginer margin="2em" direction="vertical" />
            <ProductSection/>
            <Marginer margin="4em" direction="vertical" />
        </PageContainer>
    )
}