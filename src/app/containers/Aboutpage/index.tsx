import styled from "styled-components";
import tw from "twin.macro";
import { AboutPageTopSection } from "./topSection";
import { Marginer } from "../../components/marginer";
import { InfoSection } from "./infoSection";


const PageContainer = styled.div`
   ${tw`
    flex
    flex-col
    w-full
    h-full
    items-center
    mt-[68px]
   `}
`;







export function AboutUs(){
    return(
    <PageContainer>
        <AboutPageTopSection/>
        <Marginer margin="2em" direction="vertical" />
        <InfoSection/>
        <Marginer margin="6em" direction="vertical" />
    </PageContainer>
    )
}