import { useState, useEffect } from 'react';

// Source: https://github.com/mdtanrikulu/use-metamask/issues/18
export default function DisableInServerSide({ children }) {
  const [mountedState, setMountedState] = useState(false);
  useEffect(() => {
    setMountedState(true);
  }, []);
  return <>{mountedState ? children : null}</>;
}
