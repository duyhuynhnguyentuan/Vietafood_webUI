import styled from "styled-components";
import tw from "twin.macro";
import { useEffect, useState } from "react";
import logoImg from "../../../assets/logo.png";
import { NavItems } from "./navItems";
import { SearchBar } from "../searchBar";
import { useMediaQuery } from "react-responsive";
import { SCREENS } from "../responsive";

interface INavBarProps {
  isshowBackground?: boolean;
}

const NavbarContainer = styled.div<{ showBackground: boolean }>`
  height: 68px;
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
`;

const LogoContainer = styled.div`
  ${tw`
    flex
    items-center
  
  `}
`;

const Image = styled.div`
  width: auto;
  ${tw`
    h-12
    md:h-16
    mx-4
    md:mx-0
  `}
  img {
    width: auto;
    height: 100%;
  }
`;

export const Navbar: React.FC<INavBarProps> = (props) => {
  const { isshowBackground = false } = props;

  const TOP_OFFSET = 66;
  const [showBackground, setShowBackground] = useState(isshowBackground);

  useEffect(() => {
    if (isshowBackground) {
      return;
    }
    
    const handleScroll = () => {
      if (window.scrollY >= TOP_OFFSET) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isshowBackground]);
  const isMobile = useMediaQuery({ maxWidth: SCREENS.md });
  return (
    <NavbarContainer showBackground={showBackground}>
      {/* Logo part */}
      <LogoContainer>
        <Image>
          <img src={logoImg} alt="logo" />
        </Image>
      </LogoContainer>
      {!isMobile? <SearchBar/>: ""}
      <NavItems />
    </NavbarContainer>
  );
};
