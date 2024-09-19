import React, { FC } from 'react';
import styles from './Student.module.css';

interface StudentProps {}

const Student: FC<StudentProps> = () => (
  <div className={styles.Student} data-testid="Student">
    Student Component
  </div>
);

export default Student;
