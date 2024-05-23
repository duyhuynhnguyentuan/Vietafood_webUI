import { useState } from 'react'


import styled from 'styled-components'
import tw from 'twin.macro'
import { Homepage } from './app/containers/Homepage'
import { Navbar } from './app/components/navbar';

const AppContainer = styled.div`
${tw`
  w-full
  h-full
  flex
  flex-col
`};
`;
const PageContainer = styled.div`
  ${tw`
    flex
    flex-col
    h-full
    w-full
    items-center
    overflow-x-hidden
    `}
`;

function App() {
  return(
  <AppContainer>
    <PageContainer>
    <Navbar/>
    <Homepage />
    </PageContainer>
   
  </AppContainer>
);
}

export default App
