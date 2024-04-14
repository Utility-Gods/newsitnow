import { Route, Router } from "@solidjs/router";

import Home from "@pages/Home";
import Public from "@pages/Public";
import Article from "@pages/Article";
import Collection from "@pages/Collection";
import Layout from "./Layout";
import { Toaster } from "~/components/ui/toast";
const RouterComponent = () => (
  <>
    <Router>
      <Route path="/" component={Layout}>
        <Route path="" component={Home} />
        <Route path="/article" component={Article} />
        <Route path="/collection" component={Collection} />
      </Route>
      <Route path="/public" component={Public} />
    </Router>
    <Toaster />
  </>
);

export default RouterComponent;
