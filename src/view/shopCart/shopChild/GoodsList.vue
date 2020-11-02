<template>
  <div class="goodListRoot">
    <goods-list-item
      v-for="(item,index) in goods"
      :item-info="item"
      :key="index"
      @click.native="itemClick(index)">
    </goods-list-item>

  </div>
</template>

<script>
  import GoodsListItem from './GoodsListItem'
  import {mapGetters} from 'vuex'
  export default {
    name: "GoodsList",
    components: {
      GoodsListItem,
    },

    computed:{
      ...mapGetters({
        goods: 'getGoods'
      })
    },

    methods:{
      itemClick(index){
         //方法1
         this.$store.dispatch('actionsChangeChecked', index)

         //方法2
        // this.goods[index].checked = !this.goods[index].checked

      }
    }
  }
</script>

<style scoped>

</style>
