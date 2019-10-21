import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { PureComponent } from 'react';

import Dashboard from 'src/components/Dashboard';
import * as foosActionCreators from 'src/actions/foos';
import * as propTypes from 'src/constants/propTypes';

class FunctionalDashboard extends PureComponent {
  static propTypes = {
    actions : propTypes.actions.isRequired,
    foos    : propTypes.foos,
  };

  render() {
    return <Dashboard { ...this.props } />;
  }
}

function mapStateToProps({ authentication, foos }) {
  return {
    foos : foos.getIn(['loaded', 'foos']),
    name : authentication.get('name'),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions : {
      foos : bindActionCreators(foosActionCreators, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FunctionalDashboard);
