import React, { useEffect, useState } from 'react';
import DailyGraphView from './DailyGraphView';
import useAPI from '../hooks/useAPI';
import API_URL from '../api';

export default function DailyGraph() {
  const { data, loading, error } = useAPI({ url: `${ API_URL }/daily` });

  if ( loading || !data ) {
    return null;
  }
  
  if ( data && data.length ) {
    const chartData = data.map( x => ({ confirmed: x.confirmed.total, deaths: x.deaths.total, date: x.reportDate }) );
    console.log(chartData)
    return (
      <>
        { data && (
          <>
            <DailyGraphView chartData={ chartData } />
          </>
        ) }
      </>
    )
  }
  

}