import ElMenueMine from './src/main';

/* istanbul ignore next */
ElMenueMine.install = function(Vue) {
  Vue.component(ElMenueMine.name, ElMenueMine);
};

export default ElMenueMine;
