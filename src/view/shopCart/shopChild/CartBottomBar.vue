<template>
  <div class="cart-bottom-bar-root">

<!--   1。 汇总底部左侧全选按纽-->
   <div class="cart-left">
       <check-button
         id="check-all"
         @click.native="selectAllClick"
         :is-checked="isCheckedAll">
       </check-button>
       <span>全选</span>
   </div>

<!--        2。汇总底部中间总价计算-->
    <div class="cart-center">
      <span class="totalMoney">价格总计({{totalMoney}})</span>
    </div>

<!--         3。汇总底部右侧付款-->
    <div class="cart-right" @click="paymentClick">
      <span class="payment">付款({{getGoodsLength}})</span>
    </div>

  </div>
</template>

<script>

/* 数组方法1: arr.reduce(function(prev,cur,index,arr){
  ...
  }, init);
  arr 表示原数组；
prev 表示上一次调用回调时的返回值，或者初始值 init;
  cur 表示当前正在处理的数组元素；
index 表示当前正在处理的数组元素的索引，若提供 init 值，则索引为0，否则索引为1；
init 表示初始值。
其实常用的参数只有两个：prev 和 cur。

数组方法2： 数组过滤filter()，用于过滤数组中满足条件的元素，返回一个过滤后的新数组
Array.filter(callback)

*/

  import CheckButton from './CheckButton'
  export default {
    name: "CartBottomBar",
    components: {
      CheckButton
    },

    computed:{
      totalMoney () {
        return '￥' +  this.$store.state.goods.filter(good =>good.checked).reduce((preValue, curGood) =>{
          return preValue + curGood.price * curGood.count
        },0).toFixed(2)
        //.toFixed(2) 表示保留2位小数
      },

      getGoodsLength(){
       return this.$store.state.goods.filter(good => good.checked).reduce((preValue, curGood) => {
          return preValue + curGood.count
       },0)
      },

      isCheckedAll () {
        let isAll = false

        // 如果购物车数据为空，返回false,全选按纽不选中
        let  itemData = this.$store.state.goods.length
        if(itemData ===0) {
          return isAll
        }

        // 如果购物车不选中的数组长度为零，返回true ,全选按纽选中
        // 只要有一个不选中，全选按纽就不选中
        let length = this.$store.state.goods.filter( good => !good.checked).length
        if(length ===0){
          return !isAll
        }
        //默认全选按纽 不选中
        return isAll
      }
    },

    methods:{
      selectAllClick(){
        //1 如果购物车原来商品是全部选中，那么点击全选按纽，商品全部不选中
        //2 如果购物车原来商品部分选中, 或者全部不选中，那么点击全选按纽，就把商品全部选中

        let length = this.$store.state.goods.filter( good => !good.checked).length
        if(length ===0){
           this.$store.dispatch('actionsChangeSelectAll')
        } else{
          this.$store.dispatch('selectAll')
        }
        //知识：数字取反后是false ， 数字0取反是true
      },

      paymentClick() {
        // console.log('payment');
        // 点击付款按纽，如果购物车没有选择商品，则弹出窗口提示；请选择商品
         let checkedLength = this.$store.state.goods.filter(good =>good.checked).length
          if(checkedLength ===0){
            this.$toast.show('请选择商品')
          }

      }

    }
  }
</script>

<style scoped>
  .cart-bottom-bar-root {
    background-color: var(--color-tint);
    height:40px;
    display: flex;
    position:relative;
    color: #ffffff;
    font-size: 13px;
    text-align: center;
  }

  .cart-left{
    display: flex;
    flex:3;
    align-items: center;
  }

  .cart-center{
    flex:3;
  }

  .cart-right{
    flex:3;
  }

  #check-all {
    width:20px;
    height:20px;
    margin-left: 20px;
  }

  .cart-left span{
    margin-left:10px;
  }

  .totalMoney {
    line-height:40px;
  }

  .payment{
    line-height:40px;
  }

</style>
