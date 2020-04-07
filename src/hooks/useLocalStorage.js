import { useState, useEffect } from 'react';

export default function useLocalStorage( key, defaultValue ) {
  const [ storedVal, setStoredVal ] = useState( () => {
    try {
      const item = window.localStorage.getItem( key );
      return item ? JSON.parse( item ) : defaultValue;
    } catch ( e ) {
      console.log( e );
      return defaultValue;
    }
  });

  useEffect(
    () => {
      window.localStorage.setItem( key, JSON.stringify( storedVal ) );
    }, [ storedVal ]
  );

  return [ storedVal, setStoredVal ];
}