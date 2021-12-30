import React, { lazy } from 'react';
import Suspense from './suspense/Suspense';

const Root = lazy(() => import('./root/Root'));

const App = () => (
  <Suspense>
    <Root />
  </Suspense>
)

export default App;