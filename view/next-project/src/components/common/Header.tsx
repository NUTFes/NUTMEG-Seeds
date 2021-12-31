import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import HeaderLogo from '@components/icons/HeaderLogo';

function Header() {
  const [headerColor, setHeaderColor] = useState('white');

  const [headerBackgroundColor, setHeaderBackgroundColor] = useState('var(--primary)');

  const [headerShadow, setHeadershadow] = useState('0px');

  const listenScrollEvent = () => {
    if (window.scrollY < 1) {
      return setHeaderBackgroundColor('var(--primary)'), setHeaderColor('white'), setHeadershadow('0px');
    } else {
      return (
        setHeaderBackgroundColor('rgba(255, 255, 255, 0.8)'),
        setHeaderColor('var(--primary)'),
        setHeadershadow('4px 20px rgba(0, 0, 0, 0.25)')
      );
    }
  };
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    window.addEventListener('scroll', listenScrollEvent);
  });

  const fadeIn = keyframes`
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  `;

  const HeaderContainer = styled.section`
    box-shadow: 0px ${headerShadow};
    color: ${headerColor};
    background-color: ${headerBackgroundColor};
    animation: ${fadeIn} 0.5s ease-in-out;
    backdrop-filter: blur(5px);
    position: fixed;
    top: 0;
    height: 60px;
    width: 100%;
    padding: 0px 50px;
    z-index: 1;
  `;

  const Header = styled.header`
    display: flex;
    align-items: center;
    height: 100%;
  `;

  return (
    <HeaderContainer>
      <Header>
        <HeaderLogo height={30} width={142} color={headerColor} />
      </Header>
    </HeaderContainer>
  );
}

export default Header;
