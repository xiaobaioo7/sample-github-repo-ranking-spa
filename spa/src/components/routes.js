import React from 'react'
import { Route, Switch } from 'react-router-dom'

import TopStarredRepositories from '../containers/top-starred-repositories'
import LatestRepositoryCommits from '../containers/latest-repository-commits'

const Routes = (
  <Switch>
    <Route exact path="/" component={TopStarredRepositories} />
    <Route path="/repos/:owner/:repo/commits" component={LatestRepositoryCommits} />
  </Switch>
);

export default Routes;
