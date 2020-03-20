import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const List = styled.ul`
  border-radius: 12px;
  background-color: #f4f5f7;
  border-width: 1px;
  border-style: solid;
  border-color: ${ props => {
    switch( props.category ) {
      case 'confirmed':
        return '#f5d58a';
      case 'recovered':
        return '#b8e0cf';
      case 'deaths':
        return '#f7babb';
      default:
        return '';
    }
  } };
  list-style: none;
  margin: 0;
  padding: 0;
  overflow: hidden;

  :empty {
    display: none;
  }
`;

const grow = keyframes`
  from { max-width: 0%; }
  to { max-width: 100% }
`;

const ListItem = styled.li`
  display: flex;
  position: relative;
  padding: 15px 15px;
  background: transparent;
  font-size: 15px;

  :not(:last-child) {
    border-bottom: 1px solid #fff;
  }

  :after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    max-width: 0%;
    background-color: ${ props => {
      switch( props.category ) {
        case 'confirmed':
          return '#f9e6ba';
        case 'recovered':
          return '#cef3e3';
        case 'deaths':
          return '#fbd0d1';
        default:
          return '';
      }
    } };
    width: ${ props => props.width + '%' };
    animation: ${ grow } 1500ms cubic-bezier(0.25, 0.1, 0.25, 1) 100ms forwards;
    transition: max-width 1s ease;
  }
  span {
    position: relative;
    z-index: 1;
  }
`;

const Number = styled.span`
  font-weight: 600;
`;

const Percent = styled.span`
  font-weight: 600;
  border-radius: 12px;
  background-color: ${ props => {
    switch( props.category ) {
      case 'confirmed':
        return '#f5d58a';
      case 'recovered':
        return '#b8e0cf';
      case 'deaths':
        return '#f7babb';
      default:
        return '';
    }
  } };
  color: ${ props => {
    switch( props.category ) {
      case 'confirmed':
        return '#a44c1f';
      case 'recovered':
        return '#02543f';
      case 'deaths':
        return '#b60c0c';
      default:
        return '';
    }
  } };
  font-size: 12px;
  margin-left: auto;
  padding: 4px 12px;
`;

export default function DetailTable({ data, loading, category }) {

  if ( loading ) {
    return <p>Loading...</p>;
  }

  const total = data.reduce( ( acc, curr ) => acc += curr[ category ], 0 );

  return (
    <>
      <List category={ category }>
        {data &&
          data.map((i, index) => {
            const percent = Math.round( ( i[ category ] / total ) * 100 );
            return (
              <ListItem key={index} width={percent || 0} category={ category }>
                <span>
                  { i.provinceState ? i.provinceState : i.countryRegion } : {" "}
                  <Number>{ i[ category ] }</Number>
                </span>
                <Percent category={ category }>{ percent > 0 ? `${ percent }%` : `<1%` }</Percent>
              </ListItem>
            );
          })}
      </List>
    </>
  );
}