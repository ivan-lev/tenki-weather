import React from 'react';
import styles from './Credits.module.scss';

function Credits({ author, link }) {
  return (
    <div className={styles.credits}>
      <span>Автор фото:&nbsp; </span>
      <a className={styles.credits__link} href={link} target="_blank">
        {author}
      </a>
    </div>
  );
}

export default Credits;
