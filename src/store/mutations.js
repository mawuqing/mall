export default {

  addCount (state, payload) {
    payload.count += 1
  },

  addGoodsCart (state, payload) {
    // payload.checked = true
    state.goods.push(payload)
  },

  mutationsChangeChecked (state, payload) {
    state.goods[payload].checked = !state.goods[payload].checked
  },

  mutationsChangeSelectAll (state) {
    // 数组的遍历，高级函数forEach,把数组中的每个的选中状态重新设置
    state.goods.forEach(good => good.checked = false)
  },

  mutationSelectAll(state){
    state.goods.forEach(good => good.checked = true)
  }

}
