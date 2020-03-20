import { useState, useEffect } from 'react';

export default function useAPI({ url, defaultData }) {
  const [ data, setData ] = useState( defaultData );
  const [ loading, setLoading ] = useState( false );
  const [ error, setError ] = useState( false );

  useEffect( () => {
    (async function fetchData() {
      console.log( url )
      setError( false );
      setLoading( true );
      try {
        const res = await fetch( url );
        const json = await res.json();
        if ( json.error ) {
          throw new Error();
        }
        setData( json );
        console.log(json)
      } catch( e ) {
        setError( true );
        setData(null);
      }

      setLoading( false );
    })();
  }, [ url ] )

  return { data, loading, error };
}