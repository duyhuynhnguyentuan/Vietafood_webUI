import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { Navbar } from './app/components/navbar';
import { Footer } from './app/components/footer';
import { Cart } from './app/containers/Cart';
import { useSelector } from 'react-redux';
import { RootState } from './app/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Define the props type for the App component
interface AppProps {
  content: JSX.Element;
  isshowBackground: boolean;
}

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

const App: React.FC<AppProps> = ({ content, isshowBackground }) => {
  const {isOpen} = useSelector((state:RootState) => state.checkout)
  return (
    <AppContainer>
      <PageContainer>
        <ToastContainer />
        {isOpen && 
         <Cart/>
        }
        <Navbar isshowBackground={isshowBackground} />
        {content}
        <Footer />
      </PageContainer>
    </AppContainer>
  );
}

export default App;
