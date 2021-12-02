import Image from "next/image";
import styled from "styled-components";
import headerLogo from "@images/NUTMEG-logo_all_horizontal_white.png";

function Header() {
  const HeaderContainer = styled.section`
    background-color: var(--primary);
    height: 60px;
    position: fixed;
    top: 0;
    width: 100%;
    color: white;
    z-index: 1;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  `

  const Header = styled.header`
    display: flex;
    align-items: center;
    height: 100%;
  `
  const HeaderLogo = styled.div`
    background-image: url(${headerLogo.src});
    background-size: cover;
    height: 30px;
    width: 142px;
    margin: 0px 50px;
  `

  return (
    <HeaderContainer>
      <Header>
        <HeaderLogo />
      </Header>
    </HeaderContainer>
  );
}

export default Header;
