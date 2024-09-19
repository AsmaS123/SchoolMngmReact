import React, { lazy, Suspense } from 'react';

const LazyTeacherTimetable = lazy(() => import('./TeacherTimetable'));

const TeacherTimetable = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyTeacherTimetable {...props} />
  </Suspense>
);

export default TeacherTimetable;
