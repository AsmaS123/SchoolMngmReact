import React, { lazy, Suspense } from 'react';

const LazyTimetable = lazy(() => import('./Timetable'));

const Timetable = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyTimetable {...props} />
  </Suspense>
);

export default Timetable;
