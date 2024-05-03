import { Route, Router } from "@solidjs/router";

import Home from "@pages/Home";
import Public from "@pages/Public";
import Article from "@pages/Article";
import Collection from "@pages/Collection";
import CollectionView from "@pages/Collection/CollectionView";

import { Toaster } from "~/components/ui/toast";

import PublicArticle from "@components/functional/public/PublicArticle";
import PublicCollection from "@components/functional/public/PublicCollection";
import Login from "@components/functional/auth/Login";
import Register from "@components/functional/auth/Register";
import ArticleView from "@pages/Article/ArticleView";
import ArticleCreate from "@pages/Article/ArticleCreate";
import HomeLayout from "@pages/Home/Layout";
import AppHome from "@pages/App";
import Layout from "@components/bare/common/Layout";
import PublicHome from "@components/functional/public/PublicHome";
import DLayout from "@pages/Documentation/Layout";
import DArticle from "@pages/Documentation/Article";
import DCollection from "@pages/Documentation/Collection";
import DHome from "@pages/Documentation/Home";
const RouterComponent = () => (
  <>
    <Router>
      <Route
        path="*"
        component={() => <div>404 - looks like you're lost</div>}
      />
      <Route path="/" component={HomeLayout}>
        <Route path="" component={Home} />
        <Route path="/documentation" component={DLayout}>
          <Route path="" component={DHome} />
          <Route path="/article/:id" component={DArticle} />
          <Route path="/collection" component={DCollection} />
        </Route>
      </Route>
      <Route path="/app" component={Layout}>
        <Route path="" component={AppHome} />
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
