import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { PureComponent } from 'react';

import * as authenticationActions from 'src/actions/authentication';
import * as propTypes from 'src/constants/propTypes';

import mapFormValues from 'src/containers/authentication/shared/mapFormValues';
import RecoverPassword from 'src/components/authentication/RecoverPassword';

class FunctionalRecoverPassword extends PureComponent {
  static propTypes = {
    actions  : propTypes.actions.isRequired,
  }

  handleSubmit = (elements) => {
    const values = mapFormValues(elements);
    const { host, protocol } = window.location;

    const params = {
      ...values,
      redirectUrl : `${protocol}//${host}/#/auth/reset-password`,
    };

    return this
      .props
      .actions
      .authentication
      .recoverPassword(params);
  }

  render() {
    return (
      <RecoverPassword
        handleSubmit={ this.handleSubmit }
        { ...this.props }
      />
    );
  }
}

function mapStateToProps({ authentication }) {
  return {
    emailSentTo : authentication.get('emailSentTo'),
    errors      : authentication.get('errors'),
    isActive    : authentication.get('isActive'),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions : {
      authentication : bindActionCreators(authenticationActions, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FunctionalRecoverPassword);
