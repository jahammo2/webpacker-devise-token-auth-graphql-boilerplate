import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { PureComponent } from 'react';

import * as authenticationActionCreators from 'src/actions/authentication';
import * as authenticationPropTypes from 'src/constants/propTypes/authentication';
import * as propTypes from 'src/constants/propTypes';

import Profile from 'src/components/Profile';

class FunctionalProfile extends PureComponent {
  static propTypes = {
    accessToken : authenticationPropTypes.accessToken.isRequired,
    actions     : propTypes.actions.isRequired,
    client      : authenticationPropTypes.client.isRequired,
    history     : propTypes.history.isRequired,
    uid         : authenticationPropTypes.uid.isRequired,
  };

  handleSignout = () => {
    const { accessToken, client, uid } = this.props;

    return this
      .props
      .actions
      .authentication
      .signOut({ 'access-token' : accessToken, client, uid })
      .then(this.navigateToSignIn)
      .catch(this.navigateToSignIn);
  }

  navigateToSignIn = () => this.props.history.push('/auth/sign-in')

  render() {
    return (
      <Profile
        handleSignout={ this.handleSignout }
        { ...this.props }
      />
    );
  }
}

function mapStateToProps({ authentication }) {
  return {
    accessToken : authentication.get('accessToken'),
    client      : authentication.get('client'),
    name        : authentication.get('name'),
    uid         : authentication.get('uid'),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions : {
      authentication : bindActionCreators(authenticationActionCreators, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FunctionalProfile);
