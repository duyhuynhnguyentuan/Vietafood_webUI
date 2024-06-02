import styled, { css } from "styled-components";
import tw from "twin.macro";
import {stack as Menu} from "react-burger-menu";
import { useMediaQuery } from "react-responsive";
import { SCREENS } from "../responsive";
import menuStyles from "./menuStyle";
import { CustomizedBadges } from "./cartButton";
import { SearchBar } from "../searchBar";


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
        <NavItem menu>
        <SearchBar/>
        </NavItem>
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
            <a href="https://vn.shp.ee/ChacKa9">Mua trên Shopee</a>
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
            <a href="https://vn.shp.ee/ChacKa9">Mua trên Shopee</a>
        </NavItem>
        <CustomizedBadges/>
    </ListContainer>
   
 }