import React from 'react';

import * as authenticationPropTypes from 'src/constants/propTypes/authentication';
import * as propTypes from 'src/constants/propTypes';

import AuthenticationForm from 'src/components/shared/forms/Authentication';
import TextField from 'src/components/shared/TextField';

import styles from './styles.module.scss';

function RecoverPassword(props) {
  const { emailSentTo, errors, handleSubmit, isActive } = props;

  return (
    <div className={ styles.Root }>
      <h3>Recover Password</h3>

      <Choose>
        <When condition={ emailSentTo }>
          <p className={ styles.ParagraphContent }>
            An email has been sent to { emailSentTo }. Just follow the instructions there
            and we’ll get you back to using Webpacker Devise Token Auth GraphQL Boilerplate.
          </p>
        </When>

        <Otherwise>
          <p className={ styles.ParagraphContent }>
            Don’t worry! This happens to the best of us.
          </p>

          <AuthenticationForm
            buttonText="Email me a recovery link"
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
          </AuthenticationForm>
        </Otherwise>
      </Choose>
    </div>
  );
}

RecoverPassword.propTypes = {
  emailSentTo  : authenticationPropTypes.emailSentTo,
  errors       : propTypes.errors,
  isActive     : propTypes.isActive.isRequired,
  handleSubmit : authenticationPropTypes.handleSubmit.isRequired,
};

export default RecoverPassword;
