/* @refresh reload */
import { render } from "solid-js/web";
import { Route, Router } from "@solidjs/router";

import Home from "@pages/Home";
import Article from "@pages/Article";
import Collection from "@pages/Collection";

import Nav from "@components/Nav";
import "./index.css";


const root = document.getElementById("root");

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?"
  );
}

const App = (props) => (
  <>
    <Nav />
    <div class="flex p-6 items-center justify-center">{props.children}</div>
  </>
);

const RouterComponent = () => (
  <Router root={App}>
    <Route path="/" component={Home} />
    <Route path="/article" component={Article} />
    <Route path="/collection" component={Collection} />
  </Router>
);

render(() => RouterComponent, root!);
