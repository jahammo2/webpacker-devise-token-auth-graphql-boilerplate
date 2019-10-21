import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { PureComponent } from 'react';

import * as authenticationActions from 'src/actions/authentication';
import * as propTypes from 'src/constants/propTypes';

import mapFormValues from 'src/containers/authentication/shared/mapFormValues';
import navigateOrWait from 'src/containers/authentication/shared/navigateOrWait';
import SignUp from 'src/components/authentication/SignUp';

class FunctionalSignUp extends PureComponent {
  static propTypes = {
    actions : propTypes.actions.isRequired,
    errors  : propTypes.errors,
  }

  handleSubmit = (elements) => {
    const values = mapFormValues(elements);
    const { host, protocol } = window.location;

    const params = {
      ...values,
      confirmSuccessUrl : `${protocol}//${host}/#/auth/sign-up-confirmed`,
    };

    return this
      .props
      .actions
      .authentication
      .signUp(params)
      .then(this.navigateOrWait);
  }

  navigateOrWait = () => navigateOrWait(this.props, '/auth/sign-up-email-confirmation')

  render() {
    return (
      <SignUp
        handleSubmit={ this.handleSubmit }
        { ...this.props }
      />
    );
  }
}

function mapStateToProps({ authentication }) {
  return {
    errors   : authentication.get('errors'),
    isActive : authentication.get('isActive'),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions : {
      authentication : bindActionCreators(authenticationActions, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FunctionalSignUp);
