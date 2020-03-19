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
    box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 0px, rgba(0, 0, 0, 0.05) 0px 2px 6px, rgba(0, 0, 0, 0.05) 0px 10px 20px;
    transform: translateY(-5px);
  }
`;

const Title = styled.h4`
  font-size: 15px;
  color: #666;
  font-weight: 500;
  margin-bottom: 10px;

  :before {
    position: relative;
    top: 0;
    left: 0;
    content: '';
    display: inline-block;
    height: 10px;
    width: 10px;
    margin-right: 8px;
    border-radius: 2px;
    background-color: ${ props => {
      switch( props.info ) {
        case 'warning':
          return '#ffa502';
        case 'danger':
          return '#ff0000';
        case 'success':
          return '#008000';
        default:
          return '';
      }
    } };
  }
`;

const Number = styled.h2`
  font-size: 26px;
  margin-top: 0;
`;

export default function Card({ title, number, info }) {
  return (
    <Container>
      <Title info={info}>{ title }</Title>
      <Number info={info}>
        <CountUp
          end={ number }
          separator=','
          duration={0.7}
        />
      </Number>
    </Container>
  )
}