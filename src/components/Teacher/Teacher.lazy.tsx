import React, { lazy, Suspense } from 'react';

const LazyTeacher = lazy(() => import('./Teacher'));

const Teacher = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyTeacher {...props} />
  </Suspense>
);

export default Teacher;
