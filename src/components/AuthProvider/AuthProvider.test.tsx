import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AuthProvider from './AuthProvider';

describe('<AuthProvider />', () => {
  test('it should mount', () => {
    render(<AuthProvider />);
    
    const authProvider = screen.getByTestId('AuthProvider');

    expect(authProvider).toBeInTheDocument();
  });
});