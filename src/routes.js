import React from 'react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import Main from 'page/layout/main';
import Home from 'page/home/home';
import ComingSoon from 'page/layout/coming-soon';

const routes = (
  <Router history={browserHistory}>
    <Route path='/' component={Main}>
      <IndexRoute component={Home} />
      <Route path='home' component={Home} />
      <Route path='*' component={ComingSoon} />
    </Route>
  </Router>
);

export default routes;
