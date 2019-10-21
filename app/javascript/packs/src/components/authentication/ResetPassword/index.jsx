import React from 'react';

import * as authenticationPropTypes from 'src/constants/propTypes/authentication';
import * as propTypes from 'src/constants/propTypes';

import AuthenticationForm from 'src/components/shared/forms/Authentication';
import TextField from 'src/components/shared/TextField';

import styles from './styles.module.scss';

function ResetPassword(props) {
  const { errors, handleSubmit, isActive } = props;

  return (
    <div className={ styles.Root }>
      <h3>Change Password</h3>

      <p className={ styles.ParagraphContent }>
        After you change your password, we’ll send you over to the sign in screen.
      </p>

      <AuthenticationForm
        buttonText="Submit"
        handleSubmit={ handleSubmit }
        isActive={ isActive }
      >
        <TextField
          disabled={ isActive }
          errorMessages={ errors && errors.get('password') }
          htmlFor="password"
          name="password"
          placeholder="Password"
          type="password"
        />

        <TextField
          disabled={ isActive }
          errorMessages={ errors && errors.get('password_confirmation') }
          htmlFor="password_confirmation"
          name="password_confirmation"
          placeholder="Confirm password"
          type="password"
        />
      </AuthenticationForm>
    </div>
  );
}

ResetPassword.propTypes = {
  errors       : propTypes.errors,
  isActive     : propTypes.isActive.isRequired,
  handleSubmit : authenticationPropTypes.handleSubmit.isRequired,
};

export default ResetPassword;
