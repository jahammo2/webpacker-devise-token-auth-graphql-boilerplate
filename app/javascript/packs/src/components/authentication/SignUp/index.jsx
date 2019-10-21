import { Link } from 'react-router-dom';
import React from 'react';

import * as authenticationPropTypes from 'src/constants/propTypes/authentication';
import * as propTypes from 'src/constants/propTypes';

import AuthenticationForm from 'src/components/shared/forms/Authentication';
import TextField from 'src/components/shared/TextField';

import styles from './styles.module.scss';

function SignUp(props) {
  const { errors, handleSubmit, isActive } = props;

  return (
    <div className={ styles.Root }>
      <h3>Create an account.</h3>

      <p className={ styles.ParagraphContent }>
        Create an account to save your questions and start using the site.
      </p>

      <AuthenticationForm
        buttonText="Sign up"
        handleSubmit={ handleSubmit }
        isActive={ isActive }
      >
        <TextField
          disabled={ isActive }
          errorMessages={ errors && errors.get('email') }
          htmlFor="email"
          name="email"
          placeholder="Email"
          type="text"
        />

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

        <If condition={ isActive }>
          <p className={ styles.SavingParagraph }>
            We’re creating your account now!
            Just hold tight while we make sure everything is good to go...
          </p>
        </If>
      </AuthenticationForm>

      <p className={ styles.RecoverPasswordPara }>
        Already have an account but forgot your password?{ ' ' }
        <Link to="/auth/recover-password">Recover password</Link>.
      </p>
    </div>
  );
}

SignUp.propTypes = {
  errors       : propTypes.errors,
  isActive     : propTypes.isActive.isRequired,
  handleSubmit : authenticationPropTypes.handleSubmit.isRequired,
};

export default SignUp;
