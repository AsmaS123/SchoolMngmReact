import React, { lazy, Suspense } from 'react';

const LazySubject = lazy(() => import('./Subject'));

const Subject = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazySubject {...props} />
  </Suspense>
);

export default Subject;
