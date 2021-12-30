import React, { Component, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Painel from "../painel/Painel";
import PropTypes from 'prop-types';
import Suspense from '../suspense/Suspense';

class AppRouter extends Component {
  render() {
    const { match } = this.props;
    console.log('match', match);
    return (
      <Router>
        <Suspense>
          <Switch>
            <Route exact
              path="/"
              component={Painel} />
            <Route
              path="/painel"
              component={Painel} />
          </Switch>
        </Suspense>
      </Router>
    )
  }
}

AppRouter.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string,
  }),
};

export default AppRouter;