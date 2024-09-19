import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Subject from './Subject';

describe('<Subject />', () => {
  test('it should mount', () => {
    render(<Subject />);
    
    const subject = screen.getByTestId('Subject');

    expect(subject).toBeInTheDocument();
  });
});