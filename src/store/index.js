import vue from 'vue'
import vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'
//1.安装插件
vue.use(vuex)

//2.new Vuex对象. new vuex.Store() Store是一个类,需要大写
let state = {
  goods: [],
}

const store = new vuex.Store({
  state,
  mutations,
  actions,
  getters

  /*mutations: {
    //mutation的唯一目的是修改 state中的状态，所以方法尽量唯一
   /!* mutationAddGoods (state,payload) {
        /!*这里不能用下面的push()直接添加数据,而应该先做义工 一个判断
        看看原来数组里有没有这个商品，如果有那么把它数量加1，
        如果没有，那么push()
        判断有没有方法：遍历数组看看iid和新传过来的商品iid 是否相等
        如果相等，表示有，否则表示没有*!/
      // state.goods.push(payload)
      //方案1.遍历数组中的对象，用item of 数组
      let oldProduct = null
       for(let item of state.goods){
         if(item.iid === payload.iid){
           oldProduct = item
         }
       }

          方案2: 如果不想通过数组遍历的方式判断原数组是否有新添加
          的商品，那么可以通过数组的方法 find()  直接查找包含新添加
          的商品 。

        //mutation 里的方法尽量单一，这样可以被插件追踪，所以下面的代码应该写到action里
          let oldProduct = state.goods.find(item => item.iid === payload.iid)
        //给js对象定义属性可以通过 对象.属性名的方式添加,不需要提前定义属性,比如: person.name='张三'
       if(oldProduct){
         oldProduct.count += 1
       } else {
          payload.count = 1
         state.goods.push(payload)
       }
    }*!/

     addCount (state, payload) {
       payload.count += 1
     },

     addGoodsCart (state, payload) {
       state.goods.push(payload)
     }
  },*/

  /*actions: {
    actionAddGoods(context, payload) {
      let oldProduct = context.state.goods.find(item => item.iid === payload.iid )
      if(oldProduct) {
        context.commit('addCount', oldProduct)

      } else {
        payload.count = 1
        context.commit('addGoodsCart',payload)
      }
    }
  }*/

})

//3.导出并挂载到vue实例上
export default store
