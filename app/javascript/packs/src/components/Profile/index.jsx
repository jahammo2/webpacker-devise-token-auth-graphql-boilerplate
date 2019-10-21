import React, { PureComponent } from 'react';

import * as authenticationPropTypes from 'src/constants/propTypes/authentication';
import * as propTypes from 'src/constants/propTypes';

import ButtonSubmit from 'src/components/shared/ButtonSubmit';

import styles from './styles.module.scss';

class Profile extends PureComponent {
  static propTypes = {
    actions       : propTypes.actions.isRequired,
    handleSignout : authenticationPropTypes.handleSignout.isRequired,
  }

  handleSignout = (event) => {
    event.preventDefault();
    return this.props.handleSignout();
  }

  render() {
    return (
      <div className={ styles.Root }>
        <h3>Profile</h3>

        <ButtonSubmit
          isSecondary
          handleClick={ this.handleSignout }
          type="button"
          value="Sign out"
        />
      </div>
    );
  }
}

export default Profile;
