<template>
  <div class="wrapper" ref="rwrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
  
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: "Scroll",

    data() {
      return {
        scroll: null
      }
    },

    props: {
      //probeType值不能写死,有的页面需要实时监听,有的页面不需要实时监听,所以我们希望别人调用使用scroll组件的时候给我传过来一个值(0,1,2,3)
      //从而绝对是否实时的监听,外界调用这个组件的是父组件,用props接收父组件穿过来的数据,
      probeType: {
        type: Number,
        default: 0
      },

      pullUpLoad: {
        type: Boolean,
        default: false
      }

    },

    methods: {
      getTop(x, y, time = 300) {
        this.scroll.scrollTo(x, y, time)
      },

      finishPullUp () {
        this.scroll.finishPullUp()
      }

    },
    //mounted()生命周期函数在页面el挂载后开始执行
    mounted() {
      //这里拿类名的时候需要this.$refs.refname 否则报错
      //ref如果是绑定在组件中的,那么通过this.$refs.refname拿到的是组件对象
      //ref如果是绑定在普通的元素中,那么通过this.$refs.refname拿到的是元素对象
      this.scroll = new BScroll(this.$refs.rwrapper, {
        //probeType 必须指定值才能确定是否实时监听,所以不能省略,
        probeType: this.probeType,
        //better-scroll插件实例里,属性pullUpLoad值是true的时候就可以上拉加载更多,false就不能上拉加载更多
        //封装组件的时候,pullUpLoad不能写死,因为调用组件的父组件有的需要上拉加载更多,有的不需要上拉加载更多,
        //因为我们应该把pullUpLoad属性的值通过父组件传过来,这边用props接收,然后在下面设置父组件穿过的值
        pullUpLoad: this.pullUpLoad,
        click: true
      })
      //用实例对象bscroll监听事件scroll和pullingUp
      this.scroll.on('scroll', (position) => {
        // console.log(position);
        //实时监听并不需要在scroll组件里,而是在调用者那边实时监听,必须首页调用,那么就实时监听首页的滚动
        //为了把实时监听这个事件穿过调用者,即父组件,这里需要发射自定义事件this.$emit(),position参数传过去给父组件
        this.$emit('scroll', position)
      })
      //监听上拉加载更多事件
      this.scroll.on('pullingUp', () => {
        // console.log('上拉加载更多')
        this.$emit('pullingUp')

      })


    }
  }

</script>

<style scoped>

</style>
