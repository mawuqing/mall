<template>
  <div class="goodsList">
    <goods-item v-for="(item,index) in goodsList"  :key="index"
                :goods-item="item"></goods-item>
  </div>
</template>

<script>
  import GoodsItem from './GoodsItem'

  export default {
    name: "GoodList",

    props: {
      goodsList: {
        type: Array,
        default () {
          return []
        }
      }
    },

    components: {
      GoodsItem
    }
  }
</script>

<style scoped>
  .goodsList {
    display:flex;
    /*flex-wrap: wrap 作用把小item包裹起来,不要让它塞一行里*/
    flex-wrap: wrap;
    /*justify-content:space-evenly 的作用是把item均等分*/
    justify-content:space-evenly;
  }

</style>
