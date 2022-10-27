// export default function SafeHydrate(props) {
//   return (
//     <div suppressHydrationWarning>
//       {typeof window === 'undefined' ? null : props.children}
//     </div>
//   );
// }

import { useState, useEffect } from 'react';

export default function DisableInServerSide({ children }) {
  const [mountedState, setMountedState] = useState(false);
  useEffect(() => {
    setMountedState(true);
  }, []);
  return <>{mountedState ? children : null}</>;
}
