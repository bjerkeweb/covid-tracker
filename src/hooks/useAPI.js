import { useState, useEffect } from 'react';

export default function useAPI({ url, defaultData = null }) {
  const [ data, setData ] = useState( defaultData );
  const [ loading, setLoading ] = useState( false );
  const [ error, setError ] = useState( false );

  useEffect( () => {
    (async function fetchData() {
      setError( false );
      setLoading( true );
      try {
        const res = await fetch( url );
        const json = await res.json();
        if ( json.error ) {
          throw new Error();
        }
        setData( json );
      } catch( e ) {
        setError( true );
        setData(null);
      }

      setLoading( false );
    })();
  }, [ url ] )

  return { data, loading, error };
}