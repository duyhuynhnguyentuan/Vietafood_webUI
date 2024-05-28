import styled from "styled-components";
import tw from "twin.macro";

const NavbarContainer = styled.div`
 min-height: 68px;
 ${tw`
    w-full 
    max-w-screen-2xl
    flex 
    flex-row
    items-center
    md:px-10 
    justify-between
    bg-primary
 `}
`

import logoImg from "../../../assets/logo.png"
import { NavItems } from "./navItems";

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
    return <NavbarContainer>
        {/* Logo part */}
        <LogoContainer>
            <Image>
                <img src={logoImg} alt="logo" />
            </Image>
        </LogoContainer>
        <NavItems/>
    </NavbarContainer>
}