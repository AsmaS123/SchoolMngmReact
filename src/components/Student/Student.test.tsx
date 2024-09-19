import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Student from './Student';

describe('<Student />', () => {
  test('it should mount', () => {
    render(<Student />);
    
    const student = screen.getByTestId('Student');

    expect(student).toBeInTheDocument();
  });
});