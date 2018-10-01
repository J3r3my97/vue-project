import Login from "./components/Login";
import App from "./App";
import HomePage from "./components/HomePage";
import Register from "./components/Register";
import About from "./components/About";

import firebase from "firebase";

const routes = [
  {
    path: "/",
    name: "home-page",
    component: HomePage
  },
  {
    path: "/list",
    name: "list",
    component: App
    // meta: {
    //   requiresAuth: true
    // }
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/register",
    name: "register",
    component: Register
  },
  {
    path: "/about",
    name: "about",
    component: About
  }
];

export default routes;
