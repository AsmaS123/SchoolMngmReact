import React, { FC } from 'react';
import styles from './roles.module.css';

interface RolesProps {}

const Roles: FC<RolesProps> = () => (
  <div className={styles.Roles} data-testid="Roles">
    Roles Component
  </div>
);

export default Roles;
