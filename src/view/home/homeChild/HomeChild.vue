<template>
  <div>
    <swiper>
      <swiper-item v-for="(item,index) in cbanner" :key = "index">
        <a :href="item.link"> <img :src="item.image" alt=""/></a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
  import {Swiper,SwiperItem} from '../../../components/common/swiper/index'
  export default {
    name: "homeChild",
    components: {
      Swiper,
      SwiperItem
    },

    props: {

      //1. ccanner 变量用来接收父组件穿过来到数据
      cbanner: {
        type: Array ,
      //给cCanner设置默认值,当父组件传过来的值是对象和数组类型的时候,默认值的设置必须在函数里返回return一个默认值
        default () {
          return []
        }
      }

    }
  }
</script>

<style scoped>

</style>
