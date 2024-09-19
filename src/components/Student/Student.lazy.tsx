import React, { lazy, Suspense } from 'react';

const LazyStudent = lazy(() => import('./Student'));

const Student = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyStudent {...props} />
  </Suspense>
);

export default Student;
