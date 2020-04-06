import React, { useState } from 'react';
import useAPI from '../hooks/useAPI';
import DetailTable from './DetailTable';
import styled from 'styled-components';

import API_URL from '../api';

const SectionTitle = styled.h3`
  margin-top: 0;
  margin-bottom: 1rem;
  @media (min-width: 768px) {
    margin-bottom: 0;
  }
`;

const Button = styled.button`
  appearance: none;
  background: none;
  outline: none;
  border: none;
  padding: 12px 18px;
  transition: background-color 200ms ease;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.547);
  font-weight: 600;

  @media (max-width: 767px) {
    flex-basis: 1;
    flex-grow: 1;
  }

  :first-child {
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
  }

  :last-child {
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
  }

  :not(:last-child) {
    border-right: 1px solid #e7eaee;
  }

  :hover {
    cursor: pointer;
    background-color: #f9fafb;
  }

  &.active {
    background-color: #f4f5f7;
    color: rgba(0, 0, 0, 0.847);
  }
`;

const DetailHeader = styled.div`
  margin: 2rem 0 1rem;
  @media (min-width: 768px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const ButtonContainer = styled.div`
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0.5px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.05) 0px 2px 4px 0px;
  border-radius: 6px;
  display: inline-block;

  @media (max-width: 767px) {
    display: flex;
  }
`;

export default function DetailView({ countryCode }) {
  const [ detailCategory, setDetailCategory ] = useState('Confirmed');
  const opts = countryCode === 'US' ? `?level=provinceState` : '';
  const { data, loading, error } = useAPI({ url: `${ API_URL }/countries/${ countryCode }/${ detailCategory.toLowerCase() }${ opts }` });

  return (
    <>
      { data && (
        <>
          <DetailHeader>
            <SectionTitle>
              { detailCategory } by Region:
            </SectionTitle>
            <ButtonContainer>
              <Button
                onClick={()=> setDetailCategory('Confirmed')}
                className={ detailCategory.toLowerCase() === 'confirmed' ? 'active' : '' }
              >
                Confirmed
              </Button>
              <Button
                onClick={()=> setDetailCategory('Recovered')}
                className={ detailCategory.toLowerCase() === 'recovered' ? 'active' : '' }
              >
                Recovered
              </Button>
              <Button
                onClick={()=> setDetailCategory('Deaths')}
                className={ detailCategory.toLowerCase() === 'deaths' ? 'active' : '' }
              >
                Deaths
              </Button>
            </ButtonContainer>
          </DetailHeader>
          <DetailTable data={data} loading={loading} category={detailCategory.toLowerCase()} />
        </>
      )}
    </>
  )
}