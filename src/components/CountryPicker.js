import React, { useState } from 'react';
import Stats from './Stats';
import Select from 'react-select';
import styled from 'styled-components';

import flags from 'emoji-flags';
import countries from '../countries';

const API_URL = 'https://covid19.mathdro.id/api';

const Wrapper = styled.div`
  margin-bottom: 20px;
  max-width: 325px;
  margin-left: auto;
  margin-right: auto;
`;

const shadow = 'rgba(0, 0, 0, 0.05) 0px 0.5px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.05) 0px 2px 4px 0px';
const focusShadow = 'rgba(0, 0, 0, 0.05) 0px 1px 0px, rgba(0, 0, 0, 0.05) 0px 2px 6px, rgba(0, 0, 0, 0.05) 0px 10px 20px';

const customStyles = {
  control: (base, state) => ({
    ...base,
    border: 'none',
    boxShadow: state.isFocused ? focusShadow : shadow,
    fontWeight: '400',
    padding: '8px',
    borderRadius: '6px',
    transition: 'box-shadow 100ms ease'
  }),
  indicatorSeparator: styles => ({ display: 'none' }),
  dropdownIndicator: (base, state) => ({
    ...base,
    transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : ''
  })
}

const selectOptions = Object.entries( countries )
  .map( ([ label, value ]) => ({ value, label }))
  .map( ({ value, label }) => {
    const flag = flags.countryCode( value );
    const emoji = flag ? flag.emoji : '';
    return { value, label: `${ emoji } ${ label }` }
  });


export default function CountryPicker() {
  const defaultCountryStr = `${ flags.countryCode( 'US' ).emoji } United States`;
  const [ countryCode, setCountryCode ] = useState( 'US' );
  const [ country, setCountry ] = useState( defaultCountryStr );

  const onSelect = ( val ) => {
    setCountry( val.label );
    setCountryCode( val.value );
  }
  
  return (
    <>
      <Wrapper>
        <Select
          options={selectOptions}
          onChange={onSelect}
          styles={customStyles}
          defaultValue={selectOptions.find( o => o.label.substring( 5 ) === 'United States' )}
        />
      </Wrapper>
      <Stats
        url={ `${ API_URL }/countries/${ countryCode }` }
        sectionTitle={ `${ country }` }
      />
    </>
  )
}