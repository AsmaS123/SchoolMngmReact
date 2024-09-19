import React, { lazy, Suspense } from 'react';

const LazyClassroom = lazy(() => import('./Classroom'));

const Classroom = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyClassroom {...props} />
  </Suspense>
);

export default Classroom;
