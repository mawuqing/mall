import Vue from 'vue'
import App from './App'
import router from './router/index'
import store from './store/index'
import toast from './components/common/toast/index'
import FastClick from 'fastclick'


Vue.config.productionTip = false
//Vue原型定义$bus, 并用Vue实例赋值,这时候其他组件就可以拿到this.$bus发射事件给事件总线
Vue.prototype.$bus = new Vue()
// 安装toast组件
Vue.use(toast)

FastClick.attach(document.body)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
