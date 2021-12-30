import React, { Component, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import Menu from '../menu/Menu';
import Suspense from '../suspense/Suspense';
import Screen from '../consys/Screen';

const Search = lazy(() => import('../search/Search'));

class Painel extends Component {
  render() {
    const { match } = this.props;

    return (
      <div>
        <Screen>
          <Menu match={match} />
        </Screen>
        <Suspense>
          <Switch>
            <Route exact
              path='/painel/search'
              component={Search} />
          </Switch>
        </Suspense>
      </div>
    );
  }
}

Painel.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string,
  }),
};

export default Painel;