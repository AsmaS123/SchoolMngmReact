import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Timetable from './Timetable';

describe('<Timetable />', () => {
  test('it should mount', () => {
    render(<Timetable />);
    
    const timetable = screen.getByTestId('Timetable');

    expect(timetable).toBeInTheDocument();
  });
});