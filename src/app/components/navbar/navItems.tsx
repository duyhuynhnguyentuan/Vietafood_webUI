import { useRef } from "react";
import styled, { css } from "styled-components";
import tw from "twin.macro";
import { stack as Menu } from "react-burger-menu";
import { useMediaQuery } from "react-responsive";
import { SCREENS } from "../responsive";
import menuStyles from "./menuStyle";
import { CustomizedBadges } from "./cartButton";
import { SearchBar } from "../searchBar";
import { Link } from "react-router-dom";

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
  const menuRef = useRef<any>(null);

  const closeMenu = () => {
    if (menuRef.current) {
      menuRef.current.close();
    }
  };

  if (isMobile) {
    return (
      <Menu right styles={menuStyles} ref={menuRef}>
        <NavItem menu>
          <SearchBar closeMenu={closeMenu} />
        </NavItem>
        <ListContainer>
          <NavItem menu onClick={closeMenu}>
            <Link to="/">Trang chủ</Link>
          </NavItem>
          <NavItem menu onClick={closeMenu}>
            <Link to="/aboutUs">Chúng tôi</Link>
          </NavItem>
          <NavItem menu onClick={closeMenu}>
            <Link to="/products">Sản phẩm</Link>
          </NavItem>
          <NavItem menu onClick={closeMenu}>
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
