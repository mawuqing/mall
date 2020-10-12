<template>
  <tab-bar>
    <tab-bar-item path="/home" live-color="green">
      <img slot="item-img" src="../../assets/img/tabbar/0.png" alt="">
      <img slot="item-img-active" src="../../assets/img/tabbar/9.png" alt="">
      <div slot="item-text">首页</div>
    </tab-bar-item>

    <tab-bar-item path="/category" live-color="deepPink"  >
      <img slot="item-img" src="../../assets/img/tabbar/1.png" alt="">
      <img slot="item-img-active" src="../../assets/img/tabbar/10.png" alt="">
      <div slot="item-text">分类</div>
    </tab-bar-item>

    <tab-bar-item path="/shopCart"  liveColor="blue">
      <img slot="item-img" src="../../assets/img/tabbar/2.png" alt="">
      <img slot="item-img-active" src="../../assets/img/tabbar/11.png" alt="">
      <div slot="item-text">购物车</div>
    </tab-bar-item>

    <tab-bar-item path="/profile" live-color="#8B00FF">
      <img slot="item-img" src="../../assets/img/tabbar/6.png" alt="">
      <img slot="item-img-active" src="../../assets/img/tabbar/13.png" alt="">
      <div slot="item-text">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
import TabBarItem from '../common/tabbar/TabBarItem'
import TabBar from '../common/tabbar/TabBar'

export default {
  name: 'MainTabBar',
  components: {
    TabBar,
    TabBarItem
  },
}
</script>

<style scoped>

</style>
