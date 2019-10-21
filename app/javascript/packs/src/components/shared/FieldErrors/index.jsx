import React from 'react';

import * as propTypes from 'src/constants/propTypes';

import styles from './styles.module.scss';

function FieldErrors({ errorMessages }) {
  return (
    <div className={ styles.Root }>
      <For each="error" index="i" of={ errorMessages }>
        <p className={ styles.Message } key={ i }>{ error }</p>
      </For>
    </div>
  );
}

FieldErrors.propTypes = {
  errorMessages : propTypes.errorMessages.isRequired,
};

export default FieldErrors;
