import Pages from './pages/';

export const ROUTES = {
  main: {path: '/', component: Pages.main, exact: true, title: 'Главная'},
  slider: {path: '/slider', component: Pages.slider, title: 'Слайдер'},
  player: {path: '/player', component: Pages.player, title: 'Плеер'},
  qdigital: {path: 'https://q-digital.org', title: 'Сайт'},
  exit: {title: 'Выход'},
};

export default ROUTES;
