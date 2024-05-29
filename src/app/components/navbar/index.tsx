import styled from "styled-components";
import tw from "twin.macro";

const NavbarContainer = styled.div<{ showBackground: boolean }>`
 min-height: 68px;
 ${tw`
    fixed
    w-full 
    max-w-screen-2xl
    flex 
    flex-row
    items-center
    md:px-10 
    justify-between
    transition 
    duration-150
    z-50
 `}
  ${({ showBackground }) => (showBackground ? tw`bg-secondary` : tw``)}
`

import logoImg from "../../../assets/logo.png"
import { NavItems } from "./navItems";
import { useEffect, useState } from "react";

const LogoContainer = styled.div`
 ${tw`
    flex
    items-center
 `}
`;
const Image = styled.div`
width: auto;
${
    tw`
    h-12
    md:h-16
    `
}
img {
    width: auto;
    height: 100%;
}
`;


export function Navbar(){
  const TOP_OFFSET = 66;
  const [showBackground, setShowBackground] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= TOP_OFFSET) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
    window.removeEventListener('scroll', handleScroll);
    };
  }, []);
    return <NavbarContainer showBackground={showBackground}>
        {/* Logo part */}
        <LogoContainer>
            <Image>
                <img src={logoImg} alt="logo" />
            </Image>
        </LogoContainer>
        <NavItems/>
    </NavbarContainer>
}