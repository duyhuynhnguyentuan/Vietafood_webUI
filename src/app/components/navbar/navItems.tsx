import styled, { css } from "styled-components";
import tw from "twin.macro";
import {stack as Menu} from "react-burger-menu";
import { useMediaQuery } from "react-responsive";
import { SCREENS } from "../responsive";
import menuStyles from "./menuStyle";
import Badge, { BadgeProps } from '@mui/material/Badge';

import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
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
      text-3xl
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
            <a href="#">Chúng tôi</a>
        </NavItem>
        <NavItem menu>
            <a href="#">Sản phẩm</a>
        </NavItem>
         <NavItem menu>
            <a href="#">Mua hàng online</a>
        </NavItem>
        <CustomizedBadges/>
    </ListContainer>
        </Menu>
        
    
    return <ListContainer>
        <NavItem>
            <a href="/">Trang chủ</a>
        </NavItem>
        <NavItem>
            <a href="#">Chúng tôi</a>
        </NavItem>
        <NavItem>
            <a href="/products">Sản phẩm</a>
        </NavItem>
         <NavItem>
            <a href="#">Mua hàng online</a>
        </NavItem>
        <CustomizedBadges/>
    </ListContainer>
   
 }