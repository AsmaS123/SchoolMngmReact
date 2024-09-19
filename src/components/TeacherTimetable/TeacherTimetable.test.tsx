import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TeacherTimetable from './TeacherTimetable';

describe('<TeacherTimetable />', () => {
  test('it should mount', () => {
    render(<TeacherTimetable />);
    
    const teacherTimetable = screen.getByTestId('TeacherTimetable');

    expect(teacherTimetable).toBeInTheDocument();
  });
});