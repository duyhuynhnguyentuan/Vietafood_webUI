import styled, { css } from "styled-components";
import tw from "twin.macro";
import {stack as Menu} from "react-burger-menu";
import { useMediaQuery } from "react-responsive";
import { SCREENS } from "../responsive";
import menuStyles from "./menuStyle";
import { CustomizedBadges } from "./cartButton";


 const ListContainer = styled.ul`
    ${tw`
        flex 
        list-none
        items-center
    `}
 `
const NavItem = styled.li<{menu?: any}>`
    ${tw`
      text-sm 
      md:text-base 
      text-[white] 
      font-medium
      mr-1 
     md:mr-5
     cursor-pointer
     transition
     duration-300
     hover:text-tertiary
    `}
      ${({ menu }) =>
    menu &&
    css`
      ${tw`
      font-bold
      text-[white]
      text-lg
      mb-8
      
    `};
    `};
`
 export function NavItems(){
    const isMobile = useMediaQuery({ maxWidth: SCREENS.md });
    if (isMobile)
        return <Menu right styles={menuStyles}>
            <ListContainer>
        <NavItem menu>
            <a href="/">Trang chủ</a>
        </NavItem>
        <NavItem menu>
            <a href="/aboutUs">Chúng tôi</a>
        </NavItem>
        <NavItem menu>
            <a href="/products">Sản phẩm</a>
        </NavItem>
         <NavItem menu>
            <a href="https://l.facebook.com/l.php?u=https%3A%2F%2Fvn.shp.ee%2FqBYV3vu%3Ffbclid%3DIwZXh0bgNhZW0CMTAAAR2FXDCN2RnH5Z1pvGYXEMMmx4oJ1SMZgP_qi9t1AbhmQdTX-M7FA4SdFU4_aem_AaYU_IVvcwKOaL6pLGz5wTAZUdQ_e65W-UWJ4MMGLfVUPNqwxbfRtO87BBFmuJ49r0Yiqnwe-Am5XgGvQ35eAr1w&h=AT3U_8D2H9CzL9mYy-rgYpq8Ry-9HAtOXIZ2bum5yzLvfcjQ3TLTEfKyl0cjnW790WWmcpkOCsuFEZc-btSzrFbfTmN8V-V5TKbMXb-_dDxVVemoVL5xmWlZRMPdWLEg0_hymwthZw">Mua trên Shopee</a>
        </NavItem>
        <CustomizedBadges/>
    </ListContainer>
        </Menu>
        
    
    return <ListContainer>
        <NavItem>
            <a href="/">Trang chủ</a>
        </NavItem>
        <NavItem>
            <a href="/aboutUs">Chúng tôi</a>
        </NavItem>
        <NavItem>
            <a href="/products">Sản phẩm</a>
        </NavItem>
         <NavItem>
            <a href="https://l.facebook.com/l.php?u=https%3A%2F%2Fvn.shp.ee%2FqBYV3vu%3Ffbclid%3DIwZXh0bgNhZW0CMTAAAR2FXDCN2RnH5Z1pvGYXEMMmx4oJ1SMZgP_qi9t1AbhmQdTX-M7FA4SdFU4_aem_AaYU_IVvcwKOaL6pLGz5wTAZUdQ_e65W-UWJ4MMGLfVUPNqwxbfRtO87BBFmuJ49r0Yiqnwe-Am5XgGvQ35eAr1w&h=AT3U_8D2H9CzL9mYy-rgYpq8Ry-9HAtOXIZ2bum5yzLvfcjQ3TLTEfKyl0cjnW790WWmcpkOCsuFEZc-btSzrFbfTmN8V-V5TKbMXb-_dDxVVemoVL5xmWlZRMPdWLEg0_hymwthZw">Mua trên Shopee</a>
        </NavItem>
        <CustomizedBadges/>
    </ListContainer>
   
 }