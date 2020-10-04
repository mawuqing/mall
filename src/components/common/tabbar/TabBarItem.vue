<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if = "!isActive"> <slot name="item-img"></slot></div>
    <div v-else><slot name = "item-img-active"></slot> </div>
<!--    动态绑定class属性-->
    <div :style="activeColor"><slot name = "item-text"></slot></div>
  </div>
</template>

<script>
export default {
  name: 'TabBarItem',
  /*  data () {
    return {
      isActive: false
    }
  },  */

  props: {
    path: String,
    liveColor: {
      type: String,
      default: 'red'
    }
  },
  methods: {
    itemClick () {
      this.$router.replace(this.path)
    }
  /*  activeColor () {
      return this.isActive ? {color: this.liveColor} : {}
    } */
  },
  computed: {
    isActive () {
      //  this.$route.path = /home
      //  this.$route.path = /category
      //  this.$route.path = /shopcart
      //  this.$route.path = /profile
      //  当this.$route.path 和父组件传过来到props里的this.path路径相同的时候(即 !== -1),返回值是true
      return this.$route.path.indexOf(this.path) !== -1
    },

    activeColor () {
      return this.isActive ? {color: this.liveColor} : {}
    }
  }
}
</script>

<style scoped>

  .tab-bar-item {
    flex: 1;
    text-align:center;
    height: 49px;

    font-size: 14px;
  }

  .tab-bar-item img {
    width: 25px;
    height: 25px;
    margin-top: 1px;
    /*vertical-align: middle;*/
    margin-bottom: 1px;
  }

</style>
