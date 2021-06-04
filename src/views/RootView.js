import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import routes from '../routes';
import ChatView from './ChatView';
import HomeView from './HomeView';

const RootView = () => (
  <Router>
    <Switch>
      <Route exact path={routes.home}>
        <HomeView />
      </Route>
      <Route path={routes.chat}>
        <ChatView />
      </Route>
    </Switch>
  </Router>
);

export default RootView;
