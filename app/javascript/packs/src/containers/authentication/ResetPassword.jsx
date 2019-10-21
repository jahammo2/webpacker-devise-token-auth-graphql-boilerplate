import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import QueryString from 'query-string';
import React, { PureComponent } from 'react';

import * as authenticationActions from 'src/actions/authentication';
import * as propTypes from 'src/constants/propTypes';

import mapFormValues from 'src/containers/authentication/shared/mapFormValues';
import navigateOrWait from 'src/containers/authentication/shared/navigateOrWait';
import ResetPassword from 'src/components/authentication/ResetPassword';

class FunctionalResetPassword extends PureComponent {
  static propTypes = {
    actions  : propTypes.actions.isRequired,
  }

  handleSubmit = (elements) => {
    const values = mapFormValues(elements);
    // Using window.location.search instead of props.location.search
    // because the redirected url from Devise Token Auth is something
    // like
    // /?param=value&param=value#/auth/reset-password
    // and HashRouter can't pick anything up before the hash.
    // This is not ideal of course but it only matters in one place
    // so instead of changing everything about the router, we just
    // handle the odd url here.
    const queryParams = QueryString.parse(window.location.search);

    const params = {
      ...values,
      'access-token' : queryParams.token,
      client         : queryParams.client_id,
      uid            : queryParams.uid,
    };

    return this
      .props
      .actions
      .authentication
      .resetPassword(params)
      .then(this.navigateOrWait);
  }

  navigateOrWait = () => navigateOrWait(this.props, '/')

  render() {
    return (
      <ResetPassword
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

export default connect(mapStateToProps, mapDispatchToProps)(FunctionalResetPassword);
