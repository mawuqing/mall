// toast 组件的插件封装方式，调用者安装封装好的toast插件，使用即可
import Toast from './Toast'

//1.定义obj 对象
const obj = {}

//2. 外界安装toast插件，会执行obj.install() 方法，并且会把Vue传过来
obj.install = function (Vue) {
  // console.log('obj的install方法被执行了');

/*
   a .定义一个toast的构造器,extend是扩展的意思，
导入toast，原来的el元素并没有添加到body里，所以不会显示内容
  只有扩展后才行，扩展用构造器
*/
const ToastConstructor = Vue.extend(Toast)

//b.new 构造器，创造toast组件扩展对象
  const toast = new ToastConstructor()

// c. 用toast在$mount()方法，把document.createElement()方法新创建的el 元素挂载到toast上
  toast.$mount(document.createElement('div'))

// d. 挂载后就可以把$el 添加到body里，这时候$el 对应的就是div ,用appendChild()添加子元素
  document.body.appendChild(toast.$el)
// e. 把toast 添加到Vue 原型
  Vue.prototype.$toast = toast
}



//3.导出obj 对象
export default obj
