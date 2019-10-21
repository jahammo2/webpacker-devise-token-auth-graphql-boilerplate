import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Dashboard from 'src/containers/Dashboard';
import Profile from 'src/containers/Profile';

function AuthenticatedRoutes() {
  /* eslint-disable max-len */
  return (
    <Switch>
      <Route component={ Dashboard } exact path="/" />
      <Route component={ Profile } exact path="/profile" />
    </Switch>
  );
  /* eslint-enable max-len */
}

export default AuthenticatedRoutes;
