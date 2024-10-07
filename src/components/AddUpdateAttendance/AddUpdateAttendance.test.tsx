import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AddUpdateAttendance from './AddUpdateAttendance';

describe('<AddUpdateAttendance />', () => {
  test('it should mount', () => {
    render(<AddUpdateAttendance />);
    
    const addUpdateAttendance = screen.getByTestId('AddUpdateAttendance');

    expect(addUpdateAttendance).toBeInTheDocument();
  });
});