import { Route, Router } from "@solidjs/router";

import Home from "@pages/Home";
import Public from "@pages/Public";
import Article from "@pages/Article";
import Collection from "@pages/Collection";
import CollectionView from "@pages/Collection/CollectionView";
import Layout from "./Layout";
import { Toaster } from "~/components/ui/toast";
import PublicHome from "./functional/public/PublicHome";
import PublicArticle from "./functional/public/PublicArticle";
import PublicCollection from "./functional/public/PublicCollection";
import Login from "./functional/auth/Login";
import Register from "./functional/auth/Register";
import ArticleView from "~/pages/Article/ArticleView";
import ArticleCreate from "~/pages/Article/ArticleCreate";

const RouterComponent = () => (
  <>
    <Router>
      <Route
        path="*"
        component={() => <div>404 - looks like you're lost</div>}
      />
      <Route path="/" component={Layout}>
        <Route path="" component={Home} />
        <Route path="/article" component={Article} />
        <Route path="/article/:id" component={ArticleView} />
        <Route path="/collection" component={Collection} />
        <Route path="/collection/:id" component={CollectionView} />
        <Route path="/article/create" component={ArticleCreate} />
      </Route>
      <Route path="/auth">
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Route>
      <Route path="/public/:user_id" component={Public}>
        <Route path="" component={PublicHome} />
        <Route path="/article">
          <Route path="/:id" component={PublicArticle} />
        </Route>
        <Route path="/collection">
          <Route path="/:id" component={PublicCollection} />
        </Route>
      </Route>
    </Router>
    <Toaster />
  </>
);

export default RouterComponent;
