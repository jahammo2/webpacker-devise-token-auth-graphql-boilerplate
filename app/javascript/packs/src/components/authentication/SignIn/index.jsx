import { Link } from 'react-router-dom';
import React from 'react';

import * as authenticationPropTypes from 'src/constants/propTypes/authentication';
import * as propTypes from 'src/constants/propTypes';

import AuthenticationForm from 'src/components/shared/forms/Authentication';
import TextField from 'src/components/shared/TextField';

import styles from './styles.module.scss';

function SignIn(props) {
  const {
    errors,
    handleSubmit,
    isActive,
    justSignedOut,
    pathFrom,
  } = props;

  function chooseHeadingText() {
    if (justSignedOut) return 'We have successfully signed you out.';
    // These two below are special cases where we don't want the generic
    // "You must be signed in..." heading
    if (pathFrom === '/auth/reset-password') return 'Your password has been successfully changed!';

    if (pathFrom === '/auth/sign-up-confirmed') {
      return `Your account has been confirmed! We’re so excited to have you here at
        Webpacker Devise Token Auth GraphQL Boilerplate.`;
    }

    if (pathFrom !== undefined) return 'Oops! You must be signed in to view that page.';

    return 'Welcome back.';
  }

  function chooseParagraphText() {
    if (justSignedOut) {
      return 'Go ahead and sign in again and we’ll get you back over to your dashboard.';
    }

    if (['/auth/sign-up-confirmed', '/auth/reset-password'].indexOf(pathFrom) > -1) {
      return `When you’re ready, we'll need you to enter your password one more time.
        We apologize for the inconvenience. This is just an extra measure we
        take to keep your account secure.`;
    }

    return 'Go ahead and sign in and we’ll get you over to your dashboard.';
  }

  return (
    <div className={ styles.Root }>
      <h3>{chooseHeadingText()}</h3>
      <p className={ styles.ParagraphContent }>{chooseParagraphText()}</p>

      <AuthenticationForm
        buttonText="Sign in"
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

        <Link
          className={ styles.ForgotPasswordLink }
          to="/auth/recover-password"
        >Forgot password?</Link>

        <If condition={ isActive }>
          <p className={ styles.SavingParagraph }>
            We’re signing you in now!
            Just hold tight while we make sure everything is good to go...
          </p>
        </If>
      </AuthenticationForm>

      <p className={ styles.SignUpParagraph }>
        Don’t have an account yet? Sign up <Link to="/auth/sign-up">here</Link>.
      </p>
    </div>
  );
}

SignIn.propTypes = {
  errors        : propTypes.errors,
  isActive      : propTypes.isActive.isRequired,
  handleSubmit  : authenticationPropTypes.handleSubmit.isRequired,
  justSignedOut : authenticationPropTypes.justSignedOut.isRequired,
  pathFrom      : authenticationPropTypes.pathFrom,
};

export default SignIn;
