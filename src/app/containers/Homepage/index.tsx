import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { Navbar } from "../../components/navbar";
import { SwipperBanner } from "./swipperBanner";
import { Marginer } from "../../components/marginer";
import {TopSection} from "./topSection"; // Ensure the correct import for TopSection
import { ProductSection } from "./productSection";
import { Footer } from "../../components/footer";

const PageContainer = styled.div`
   ${tw`
    flex
    flex-col
    w-full
    h-full
    items-center
    overflow-x-hidden
   `}
`;

export function Homepage() {
  return (
    <PageContainer>
      <SwipperBanner />
      <Marginer margin="3em" direction="vertical" />
      <TopSection />
      <ProductSection/>
      <Marginer margin="3em" direction="vertical"/>
      <Footer/>
    </PageContainer>
  );
}
