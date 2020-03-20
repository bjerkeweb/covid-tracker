import React from 'react';
import styled from 'styled-components';
import useAPI from '../hooks/useAPI';
import Card from './Card';

const Updated = styled.p`
  font-size: 15px;
  margin-bottom: 1.5rem;
  margin-top: 0;
  font-weight: 400;
  color: #888;
  text-align: center;
`;

const SectionTitle = styled.h2`
  margin-top: 0;
  margin-bottom: 8px;
  text-align: center;
`;

const SectionWrapper = styled.div`
  background: #f4f5f7;
  border-radius: 12px;
  padding: 35px;
  border: 1px solid #eeeeee;
  margin-bottom: 20px;
  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 10px;

  @media (max-width: 768px) {
    display: block;
  }
`;

const formatDate = ( date ) => {
  const opts = {
    year: '2-digit',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }
  return new Date( date ).toLocaleString('en-us', opts);
}

export default function Stats({ url, sectionTitle }) {
  const { data, loading, error } = useAPI({ url });
  return (
    <>
      { loading && <p className='text-center'>Loading...</p> }
      { data && (
        <>
          <SectionWrapper>
            <SectionTitle>{ sectionTitle }</SectionTitle>
            <Updated>Last updated: { formatDate( data.lastUpdate ) }</Updated>
            <CardsContainer>
              <Card title='Confirmed' info='warning' number={data.confirmed.value} />
              <Card title='Recovered' info='success' number={data.recovered.value} />
              <Card title='Deaths' info='danger' number={data.deaths.value} />
            </CardsContainer>
          </SectionWrapper>
        </>
      )}
      
    </>
  )
}