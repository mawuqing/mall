<template>
  <div class="shopCartRoot">
<!--  1    购物车导航栏-->
      <navigation-bar class="cartCenterSlot">
        <h3 slot="navigationCenter">购物车({{length}})</h3>
      </navigation-bar>

   <scroll class="content" ref="scroll">
<!-- 2    购物车商品展示区，可以滚动-->
     <goods-list></goods-list>
   </scroll>

<!--  3  底部汇总-->
<cart-bottom-bar class="cart-bottom-bar"></cart-bottom-bar>

  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import NavigationBar from '../../components/common/navigationBar/NavigationBar'
  import GoodsList from './shopChild/GoodsList'
  import scroll from '../../components/common/scroll/Scroll'
  import CartBottomBar from './shopChild/CartBottomBar'
export default {
  name: 'ShopCart',
  components: {
    NavigationBar,
    GoodsList,
    scroll,
    CartBottomBar
  },

  //为了避免插槽里 this.$store.state.goods.length 这串太长，应该使用下面的计算属性
/*  computed: {
    getGoodsLength () {
      return this.$store.state.goods.length
    }
  }*/


// getters 新语法：把getters 转化为计算属性：1。从vuex里导入 mapGetters ,
// 2. ...mapGetters([数组]) 或 ...mapGetters({key:''}) 对象语法自定义名称
   computed: {
     //1。数组写法
     // ...mapGetters(['getGoodsLength','getGoods'])

     //2. 对象语法
     ...mapGetters({
       length: 'getGoodsLength',
     })
   },

  // 购物车不能滚动的原因：给购物车添加商品的时候，可滚动高度发生了变化，
  //需要refresh()  一下，不能在created ,mounted  里面刷新，应该在activated() 里面刷新
  activated(){
     this.$refs.scroll.refresh()
  }

}
</script>

<style scoped>
  .cartCenterSlot {
    background-color: var(--color-tint);
    color:#f2f5f8;
  }

  .shopCartRoot{
    height:100vh;
  }

  .content{
    height:calc(100% - 44px - 49px - 40px);
    overflow: hidden;
  }

</style>
