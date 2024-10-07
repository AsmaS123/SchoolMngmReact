import React, { lazy, Suspense } from 'react';

const LazyAddUpdateAttendance = lazy(() => import('./AddUpdateAttendance'));

const AddUpdateAttendance = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyAddUpdateAttendance {...props} />
  </Suspense>
);

export default AddUpdateAttendance;
