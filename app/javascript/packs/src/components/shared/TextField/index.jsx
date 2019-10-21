import classNames from 'classnames/bind';
import React from 'react';

import * as propTypes from 'src/constants/propTypes';
import * as sharedComponentPropTypes from 'src/constants/propTypes/sharedComponents';

import FieldErrors from 'src/components/shared/FieldErrors';

import styles from './styles.module.scss';

const cx = classNames.bind(styles);

function getFieldClassNames({ errorMessages }) {
  return cx({
    Field      : true,
    isErroring : errorMessages,
  });
}

function TextField(props) {
  const {
    disabled,
    errorMessages,
    htmlFor,
    name,
    placeholder,
    type,
  } = props;

  return (
    <label className={ styles.Root } htmlFor={ htmlFor }>
      <input
        className={ getFieldClassNames(props) }
        disabled={ disabled }
        name={ name }
        placeholder={ placeholder }
        type={ type }
      />

      <If condition={ errorMessages }>
        <FieldErrors errorMessages={ errorMessages } />
      </If>
    </label>
  );
}

TextField.propTypes = {
  disabled      : sharedComponentPropTypes.disabled.isRequired,
  errorMessages : propTypes.errorMessages,
  htmlFor       : sharedComponentPropTypes.htmlFor.isRequired,
  name          : sharedComponentPropTypes.name.isRequired,
  placeholder   : sharedComponentPropTypes.placeholder,
  type          : sharedComponentPropTypes.type.isRequired,
};

export default TextField;
