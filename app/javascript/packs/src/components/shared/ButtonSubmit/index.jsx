import classNames from 'classnames/bind';
import React from 'react';

import * as sharedComponentPropTypes from 'src/constants/propTypes/sharedComponents';

import styles from './styles.module.scss';

const cx = classNames.bind(styles);

function getButtonClassNames({ floatRight, isSecondary }) {
  return cx({
    Button : true,
    floatRight,
    isSecondary,
  });
}

function ButtonSubmit(props) {
  const {
    disabled,
    handleClick,
    type,
    value,
  } = props;

  return (
    <div className={ styles.Root }>
      <input
        className={ getButtonClassNames(props) }
        disabled={ disabled }
        onClick={ handleClick }
        type={ type }
        value={ value }
      />
    </div>
  );
}

ButtonSubmit.propTypes = {
  disabled    : sharedComponentPropTypes.disabled,
  floatRight  : sharedComponentPropTypes.floatRight,
  handleClick : sharedComponentPropTypes.handleClick,
  isSecondary : sharedComponentPropTypes.isSecondary,
  type        : sharedComponentPropTypes.type.isRequired,
  value       : sharedComponentPropTypes.value.isRequired,
};

export default ButtonSubmit;
