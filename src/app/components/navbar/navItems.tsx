import styled, { css } from "styled-components";
import tw from "twin.macro";
import { stack as Menu } from "react-burger-menu";
import { useMediaQuery } from "react-responsive";
import { SCREENS } from "../responsive";
import menuStyles from "./menuStyle";
import { CustomizedBadges } from "./cartButton";
import { SearchBar } from "../searchBar";
import { Link } from "react-router-dom";
import { useState } from "react";

const ListContainer = styled.ul`
  ${tw`
    flex 
    list-none
    items-center
  `}
`;

const NavItem = styled.li<{ menu?: any }>`
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
`;

export function NavItems() {
  const isMobile = useMediaQuery({ maxWidth: SCREENS.md });
  const [isOpen, setOpen] = useState(false)
  const handleIsOpen = () => {
    setOpen(!isOpen)
  }

  const closeSideBar = () => {
    setOpen(false)
  }
  if (isMobile) {
    return (
      <Menu right styles={menuStyles} 
      isOpen={isOpen}
      onOpen={handleIsOpen}
      onClose={handleIsOpen}
      >
        <NavItem menu>
          <SearchBar closeMenu={closeSideBar} />
        </NavItem>
        <ListContainer>
          <NavItem menu onClick={closeSideBar}>
            <Link to="/">Trang chủ</Link>
          </NavItem>
          <NavItem menu onClick={closeSideBar}>
            <Link to="/aboutUs">Chúng tôi</Link>
          </NavItem>
          <NavItem menu onClick={closeSideBar}>
            <Link to="/products">Sản phẩm</Link>
          </NavItem>
          <NavItem menu onClick={closeSideBar}>
            <a href="https://vn.shp.ee/ChacKa9">Mua trên Shopee</a>
          </NavItem>
          <CustomizedBadges />
        </ListContainer>
      </Menu>
    );
  }

  return (
    <ListContainer>
      <NavItem>
        <Link to="/">Trang chủ</Link>
      </NavItem>
      <NavItem>
        <Link to="/aboutUs">Chúng tôi</Link>
      </NavItem>
      <NavItem>
        <Link to="/products">Sản phẩm</Link>
      </NavItem>
      <NavItem>
        <a href="https://vn.shp.ee/ChacKa9">Mua trên Shopee</a>
      </NavItem>
      <CustomizedBadges />
    </ListContainer>
  );
}
