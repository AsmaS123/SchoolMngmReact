import React, { lazy, Suspense } from 'react';

const LazyAuthProvider = lazy(() => import('./AuthProvider'));

const AuthProvider = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyAuthProvider {...props} />
  </Suspense>
);

export default AuthProvider;
