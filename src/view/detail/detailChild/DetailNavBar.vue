<template>
  <div>
    <navigation-bar class="navBar">
      <div class="navImg"
           slot="navigationLeft"
           @click="detailNavBarImgBack">
        <img src="../../../assets/img/common/back.svg" alt="">
      </div>

      <div class="navSpan" slot="navigationCenter">
        <span v-for="(item, index) in title "
           :key="index"
           :class="{active: currentIndex === index}"
            @click="spanClick(index)">
          {{item}}
        </span>
      </div>

    </navigation-bar>
  </div>
</template>

<script>
  import NavigationBar from '../../../components/common/navigationBar/NavigationBar'

  export default {
    name: "DetailNavBar",
    data() {
      return {
        title: ['商品', '参数', '评论', '推荐'],
        currentIndex: 0
      }
    },
    components: {
      NavigationBar
    },

    methods: {
      spanClick(index) {
        this.currentIndex = index;
        this.$emit('detail', index)
      },

      detailNavBarImgBack () {
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped>
  .navImg {
    margin-top: 7px;
  }

  .navSpan {
    display: flex;
  }

  .navSpan span {
    flex: 1;

  }

  .active {
    color: var(--color-high-text)
  }
  .navBar {
    position:relative;
    z-index:99;
    background-color: #fff;
  }
</style>
