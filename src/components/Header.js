import React from 'react';
import styled, { keyframes } from 'styled-components';
import { ReactComponent as Logo } from '../assets/toxic.svg';

const rotate = keyframes`
  from { transform: rotate(0deg) }
  to { transform: rotate(360deg) }
`;

const HeaderContainer = styled.div`
  text-align: center;
  margin-bottom: 50px;
`;

const StyledLogo = styled(Logo)`
  height: 70px;
  width: 70px;
  fill: #dc143c;
  animation: ${ rotate } 5s linear infinite;
`;

const Byline = styled.p`
  font-size: 15px;
  color: #888;
`;

const Title = styled.h1`
  margin-bottom: 0;
`;

export default function Hero() {
  return (
    <>
      <HeaderContainer>
        <StyledLogo />
        <Title>COVID-19 Tracker</Title>
        <Byline>Data via <a href="https://github.com/mathdroid/covid-19-api">Mathdroid's COVID-19 API</a></Byline>
      </HeaderContainer>
    </>
  )
}