import { Route, Router } from "@solidjs/router";

import Home from "@pages/Home";
import Public from "@pages/Public";
import Article from "@pages/Article";
import Collection from "@pages/Collection";
import CollectionView from "@pages/Collection/CollectionView";
import ArticleShare from "@pages/Article/ArticleShare";

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
import BlogLayout from "@pages/Blog/Layout";
import BlogHome from "@pages/Blog/Home";
import BlogCollection from "@pages/Blog/BlogCollection";
import Plan from "@pages/Plan";
import CollectionShare from "@pages/Collection/CollectionShare";
import Organization from "@pages/Organization";
import Media from "@pages/Media";
import Settings from "@pages/Settings";
import PublicLayout from "@pages/Public";
import TermsPage from "@pages/Public/Terms";
import PrivacyPage from "@pages/Public/Privacy";
import Forms from "@pages/Forms";
import Invitation from "@components/functional/auth/Invitation";
import Team from "@pages/Team";
import FormCreate from "@pages/Forms/FormCreate";
import FormView from "@pages/Forms/FormView";

import ActionFormLayout from "@pages/ActionForm/Layout";
import ActionForm from "@pages/ActionForm";
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
        <Route path="/blog" component={BlogLayout}>
          <Route path="" component={BlogHome} />
          <Route path="/article/:id" component={DArticle} />
          <Route path="/collection" component={BlogCollection} />
        </Route>
      </Route>
      <Route path="/app/:org_id" component={Layout}>
        <Route path="" component={AppHome} />
        <Route path="/article" component={Article} />
        <Route path="/article/:id" component={ArticleView} />
        <Route path="/article/:id/share" component={ArticleShare} />
        <Route path="/collection" component={Collection} />
        <Route path="/collection/:id" component={CollectionView} />
        <Route path="/collection/:id/share" component={CollectionShare} />
        <Route path="/article/create" component={ArticleCreate} />
        <Route path="/plan" component={Plan} />
        <Route path="/team" component={Team} />
        <Route path="/media" component={Media} />
        <Route path="/organization" component={Organization} />
        <Route path="/settings" component={Settings} />
        <Route path="/forms" component={Forms} />
        <Route path="/forms/create" component={FormCreate} />
        <Route path="/forms/:id" component={FormView} />
      </Route>
      <Route path="/action-form" component={ActionFormLayout}>
        <Route path="/:id" component={ActionForm} />
      </Route>
      <Route path="/auth">
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/verify-invitation/:id" component={Invitation} />
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
      <Route path="/legal" component={PublicLayout}>
        <Route path="/terms" component={TermsPage}></Route>
        <Route path="/privacy" component={PrivacyPage}></Route>
      </Route>
    </Router>
    <Toaster />
  </>
);

export default RouterComponent;
