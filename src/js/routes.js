import Pages from "./pages/";

export const ROUTES = {
  main: { path: "/", component: Pages.main, exact: true },
  error404: { path: "*", component: Pages.error404 },
};

export default ROUTES;
