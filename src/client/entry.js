import React from "react";
import routes from "../shared/routes";
import { Router, Link } from 'react-router';
import { history } from 'react-router/lib/HashHistory';

Router.run(routes, Router.HistoryLocation, (Router, state) => {
  React.render(<Router history={history} children={RootRoute} />, document.getElementById('app'));
});
