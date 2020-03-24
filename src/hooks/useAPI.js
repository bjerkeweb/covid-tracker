import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useAPI({ url, defaultData = null }) {
  const [ data, setData ] = useState( defaultData );
  const [ loading, setLoading ] = useState( false );
  const [ error, setError ] = useState( false );

  useEffect( () => {
    (async function fetchData() {
      setError( false );
      setLoading( true );
      try {
        const res = await axios.get( url );
        setData( res.data );
      } catch( e ) {
        setError( true );
        setData(null);
      }

      setLoading( false );
    })();
  }, [ url ] )

  return { data, loading, error };
}