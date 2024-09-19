import React, { FC } from 'react';
import styles from './AuthProvider.module.css';

interface AuthProviderProps {}

const AuthProvider: FC<AuthProviderProps> = () => (
  <div className={styles.AuthProvider} data-testid="AuthProvider">
    AuthProvider Component
  </div>
);

export default AuthProvider;
