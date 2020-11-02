export default  {

  actionsAddGoods(context, payload) {
    //new 一个promise对象，把被调用的函数方法体包裹进去
    return new Promise((resolve,reject) =>{
      let oldProduct = context.state.goods.find(item => item.iid === payload.iid )
      if(oldProduct) {
        context.commit('addCount', oldProduct)
        resolve('购物车已经存在该商品，数量加1')
      } else {
        payload.count = 1
        context.commit('addGoodsCart',payload)
        resolve('添加新商品成功')
      }

    } )
  },

  actionsChangeChecked (context, payload) {
    context.commit('mutationsChangeChecked', payload)
  },

  actionsChangeSelectAll (context) {
    context.commit('mutationsChangeSelectAll')
  },

  selectAll(context){
    context.commit('mutationSelectAll')
  }
}
