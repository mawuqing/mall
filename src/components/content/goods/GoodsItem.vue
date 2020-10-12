<template>
  <div class="goodsItem">
    <img :src="goodsItem.show.img" alt="">
    <div class="goodsInfo"><p>{{goodsItem.title}}</p></div>
    <span><p>价格:{{goodsItem.price +'¥'}}</p></span>
<!--    <span>{{goodsItem.cfav}}</span>-->

  </div>
</template>

<script>
  export default {
    name: "GoodsItem",
    props: {
      goodsItem: {
        type: Object,
        default () {
          return {}
        }
      }
    }
  }
</script>

<style scoped>
  .goodsItem {
    width:48%;
    margin-top:3px;
    margin-bottom:3px;
  }

  .goodsInfo p {
    font-size:14px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom:3px;


  }

  .goodsItem img {
    /*需要给图片一个宽度才能均等分*/
    width:100%;
    border-radius:5px;
  }

  .goodsItem span p{
    font-size:14px;
    color:red;
    text-align:center;
  }

</style>
