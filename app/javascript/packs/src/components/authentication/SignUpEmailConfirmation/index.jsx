import React from 'react';

import * as authenticationPropTypes from 'src/constants/propTypes/authentication';

import styles from './styles.module.scss';

function SignUpEmailConfirmation({ emailSentTo }) {
  function fillInWithEmailSentTo() {
    if (!emailSentTo) return null;

    return ` to ${emailSentTo}`;
  }

  return (
    <div className={ styles.Root }>
      Great! We’ve sent a confirmation link{ fillInWithEmailSentTo() }.
      You’re almost there.{ ' ' }
      Just follow the instructions in your email to finish setting up your account.
    </div>
  );
}

SignUpEmailConfirmation.propTypes = {
  emailSentTo : authenticationPropTypes.emailSentTo,
};

export default SignUpEmailConfirmation;
