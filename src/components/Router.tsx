import { Route, Router } from "@solidjs/router";

import Home from "@pages/Home";
import Article from "@pages/Article";
import Collection from "@pages/Collection";
import Layout from "./Layout";
import { Toaster } from "~/components/ui/toast";
const RouterComponent = () => (
  <>
    <Router root={Layout}>
      <Route path="/" component={Home} />
      <Route path="/article" component={Article} />
      <Route path="/collection" component={Collection} />
    </Router>
    <Toaster />
  </>
);

export default RouterComponent;
