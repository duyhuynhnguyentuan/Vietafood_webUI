import styled from "styled-components";
import logoImg from "../../../assets/logo.png"
import tw from "twin.macro";

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


export function Logo(){
    return (
        <LogoContainer>
            <Image>
                <img src={logoImg} alt="logo" />
            </Image>
        </LogoContainer>
    )
    
}