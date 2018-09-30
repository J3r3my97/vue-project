import Login from "./components/Login";
import App from "./App";
import HomePage from "./components/HomePage";

const routes = [
  {
    path: "/",
    component: HomePage
  },
  {
    path: "/todo",
    component: App
  },
  {
    path: "/login",
    component: Login
  }
];

export default routes;
