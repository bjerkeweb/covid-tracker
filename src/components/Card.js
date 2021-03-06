import React from 'react';
import styled from 'styled-components';
import CountUp from 'react-countup';

const Container = styled.div`
  background: #fff;
  border-radius: 12px;
  transition: all 250ms ease 0s;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0.5px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.05) 0px 2px 4px 0px;
  padding: 10px 40px;
  flex: 1 0 0;
  margin: 0 1%;

  @media (max-width: 768px) {
    margin-bottom: 10px;
    padding: 1px 25px;
    :last-child {
      margin-bottom: 0;
    }
  }

  :hover {
    @media (min-width: 768px) {
      transform: translateY(-5px);
      box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 0px, rgba(0, 0, 0, 0.05) 0px 2px 6px, rgba(0, 0, 0, 0.05) 0px 10px 20px;
    }
  }
`;

const Title = styled.h4`
  font-size: 14px;
  color: ${ props => {
    switch( props.info ) {
      case 'success':
        return '#02543f';
      case 'danger':
        return '#b60c0c';
      case 'warning':
        return '#a44c1f';
      default:
        return '';
    }
  } };
  font-weight: 500;
  margin-top: 0;
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  background-color: ${ props => {
    switch( props.info ) {
      case 'danger':
        return '#f8dede';
      case 'success':
        return '#def8ed';
      case 'warning':
        return '#f8e5ba';
      default:
        return '';
    }
  } };
`;

const Number = styled.h2`
  font-size: 26px;
  margin-bottom: 10px;
`;

export default function Card({ title, number, info }) {
  return (
    <Container>
      <Number info={info}>
        <CountUp
          end={ number }
          separator=','
          duration={0.7}
        />
      </Number>
      <Title info={info}>{ title }</Title>
    </Container>
  )
}