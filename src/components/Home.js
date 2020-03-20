import React from 'react';

import Header from './Header';
import Stats from './Stats';
import CountryPicker from './CountryPicker';

const API_URL = 'https://covid19.mathdro.id/api';

export default function Home() {
  return (
    <main className="container">
      <Header />
      <Stats url={ API_URL } sectionTitle="Global Cases" />
      <CountryPicker />
    </main>
  )
}