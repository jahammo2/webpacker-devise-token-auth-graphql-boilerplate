import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import { Redirect, Route, HashRouter as Router, Switch } from 'react-router-dom';

import * as authenticationActions from 'src/actions/authentication';
import * as authenticationPropTypes from 'src/constants/propTypes/authentication';
import * as propTypes from 'src/constants/propTypes';

import AuthenticatedRoutes from 'src/Routes/AuthenticatedRoutes';
import RecoverPassword from 'src/containers/authentication/RecoverPassword';
import ResetPassword from 'src/containers/authentication/ResetPassword';
import SignIn from 'src/containers/authentication/SignIn';
import SignUp from 'src/containers/authentication/SignUp';
import SignUpEmailConfirmation from 'src/containers/authentication/SignUpEmailConfirmation';

class Routes extends PureComponent {
  static propTypes = {
    accessToken : authenticationPropTypes.accessToken,
    actions     : propTypes.actions.isRequired,
    email       : authenticationPropTypes.email,
    errors      : propTypes.errors,
  }

  componentDidMount() {
    // We don't want auth errors to persist after a refresh
    this.props.actions.authentication.clearTempAuthState();
  }

  redirectToSignIn = ({ location : { pathname } }) => (
    <Redirect
      to={ {
        pathname : '/auth/sign-in',
        state    : { pathFrom : pathname },
      } }
    />
  )

  renderAuthedRoutes = (renderProps) => {
    const { accessToken, email } = this.props;

    if (!accessToken || !email) return this.redirectToSignIn(renderProps);

    return <AuthenticatedRoutes />;
  }

  render() {
    /* eslint-disable max-len */
    return (
      <Router>
        <Switch>
          <Route path="/auth/recover-password" component={ RecoverPassword } exact />
          <Route path="/auth/reset-password" component={ ResetPassword } exact />
          <Route path="/auth/sign-in" component={ SignIn } exact />
          <Route path="/auth/sign-up" component={ SignUp } exact />
          <Route path="/auth/sign-up-email-confirmation" component={ SignUpEmailConfirmation } exact />
          <Route path="/auth/sign-up-confirmed" render={ this.redirectToSignIn } exact />
          <Route path="/" render={ this.renderAuthedRoutes } />
        </Switch>
      </Router>
    );
    /* eslint-enable max-len */
  }
}


function mapStateToProps({ authentication }) {
  return {
    accessToken : authentication.get('accessToken'),
    email       : authentication.get('email'),
    errors      : authentication.get('errors'),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions : {
      authentication : bindActionCreators(authenticationActions, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
