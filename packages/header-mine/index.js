import HeaderMine from './src/main';

/* istanbul ignore next */
HeaderMine.install = function(Vue) {
  Vue.component(HeaderMine.name, HeaderMine);
};

export default HeaderMine;
