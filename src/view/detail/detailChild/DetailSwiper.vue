<template>
  <div>
    <swiper class="detailSwiper">
      <swiper-item v-for="(item, index) in detailChildTopImages" :key="index">
        <img :src="item" alt="">
      </swiper-item>
    </swiper>

  </div>
</template>

<script>
  import {Swiper,SwiperItem} from '../../../components/common/swiper/index'
  export default {
    name: "DetailSwiper",
    components:{
      Swiper,
      SwiperItem
    },
    props: {
      detailChildTopImages: {
        type: Array,
        //当父组件传的数据是对象和数组的时候,默认值返回的是函数
        default(){
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .detailSwiper {
    height: 300px;
    overflow: hidden;
  }
</style>
