import React, { PureComponent } from 'react';

import * as authenticationPropTypes from 'src/constants/propTypes/authentication';
import * as propTypes from 'src/constants/propTypes';

import ButtonSubmit from 'src/components/shared/ButtonSubmit';

import styles from './styles.module.scss';

class Authentication extends PureComponent {
  static propTypes = {
    buttonText   : propTypes.buttonText.isRequired,
    children     : propTypes.children.isRequired,
    handleSubmit : authenticationPropTypes.handleSubmit.isRequired,
    isActive     : propTypes.isActive.isRequired,
  }

  state = {
    form : {},
  }

  handleSubmit = (event) => {
    event.preventDefault();
    return this.props.handleSubmit(this.state.form.elements);
  }

  setForm = form => this.setState({ form });

  render() {
    const { buttonText, isActive } = this.props;

    return (
      <form
        className={ styles.Root }
        onSubmit={ this.handleSubmit }
        ref={ this.setForm }
      >
        { this.props.children }

        <ButtonSubmit
          disabled={ isActive }
          type="submit"
          value={ buttonText }
        />
      </form>
    );
  }
}

export default Authentication;
