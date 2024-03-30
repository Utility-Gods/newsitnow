import { Route, Router } from "@solidjs/router";

import Home from "@pages/Home";
import Article from "@pages/Article";
import Collection from "@pages/Collection";
import Layout from "./Layout";

const RouterComponent = () => (
  <Router root={Layout}>
    <Route path="/" component={Home} />
    <Route path="/article" component={Article} />
    <Route path="/collection" component={Collection} />
  </Router>
);

export default RouterComponent;
