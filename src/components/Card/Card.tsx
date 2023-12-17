import React, { ReactNode, Fragment } from 'react';
import styles from './Card.module.scss';
import Loader from '../Loader/Loader';

interface CardProps {
  children: ReactNode;
}

const Card: React.FC<CardProps> = ({ children }) => {
  return <div className={styles.card}>{children}</div>;
};

export default Card;
