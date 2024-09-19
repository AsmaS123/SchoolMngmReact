import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Classroom from './Classroom';

describe('<Classroom />', () => {
  test('it should mount', () => {
    render(<Classroom />);
    
    const classroom = screen.getByTestId('Classroom');

    expect(classroom).toBeInTheDocument();
  });
});