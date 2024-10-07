import React, { lazy, Suspense } from 'react';

const LazyAttendance = lazy(() => import('./Attendance'));

const Attendance = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyAttendance {...props} />
  </Suspense>
);

export default Attendance;
