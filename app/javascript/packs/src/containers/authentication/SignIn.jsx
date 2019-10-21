import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { PureComponent } from 'react';

import * as authenticationActions from 'src/actions/authentication';
import * as propTypes from 'src/constants/propTypes';

import mapFormValues from 'src/containers/authentication/shared/mapFormValues';
import navigateOrWait from 'src/containers/authentication/shared/navigateOrWait';
import SignIn from 'src/components/authentication/SignIn';

class FunctionalSignIn extends PureComponent {
  static propTypes = {
    actions  : propTypes.actions.isRequired,
    errors   : propTypes.errors,
    location : propTypes.location.isRequired,
  }

  findPathFrom() {
    const { location : { state } } = this.props;
    return state && state.pathFrom;
  }

  handleSubmit = (elements) => {
    const values = mapFormValues(elements);

    return this
      .props
      .actions
      .authentication
      .signIn(values)
      .then(this.navigateOrWait);
  }

  navigateOrWait = () => navigateOrWait(this.props, '/')

  render() {
    return (
      <SignIn
        handleSubmit={ this.handleSubmit }
        pathFrom={ this.findPathFrom() }
        { ...this.props }
      />
    );
  }
}

function mapStateToProps({ authentication }) {
  return {
    errors        : authentication.get('errors'),
    isActive      : authentication.get('isActive'),
    justSignedOut : authentication.get('justSignedOut'),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions : {
      authentication : bindActionCreators(authenticationActions, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FunctionalSignIn);
