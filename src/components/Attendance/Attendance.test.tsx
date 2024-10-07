import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Attendance from './Attendance';

describe('<Attendance />', () => {
  test('it should mount', () => {
    render(<Attendance />);
    
    const attendance = screen.getByTestId('Attendance');

    expect(attendance).toBeInTheDocument();
  });
});