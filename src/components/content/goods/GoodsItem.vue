<template>
  <div class="goodsItem" @click="itemClick">
    <!--    @load='imageLoad'监听每张图片是否加载完成,一旦加载完成就重写计算一次可滚动的高度-->
    <img :src="showImage" alt="" @load="imageLoad">
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
        default() {
          return {}
        }
      }
    },

    computed: {
      showImage() {
        return this.goodsItem.image || this.goodsItem.show.img
      }
    },

    methods: {
      imageLoad() {
        // console.log('监听每张图片是否加载完成,每加载完成一张就重新计算可滚动高度');
        //监听到图片加载完成,这里肯定不是做打印,而是把这个监听到的事件发射出去
        //这里如果使用子传父太麻烦,因为太远了,goodsitem发射给goodslist,然后goodslist在发射给home
        //当组件之间通信的层级关系很多的时候,一般使用"事件总线" 的方式,来发射和监听事件
        //发射事件给事件总线的语法: this.$bus.$emit('eventName')
        // 默认情况下vue里 this.$bus 是undefinded,必须在Vue原型写:Vue.prototype.$bus = new Vue()
        // new一个vue实例,是可以发射和监听事件的
        //事件总线是用来管理事件的,任何组件发射事件都是向事件总线发射
        // console.log(this.$bus);
        this.$bus.$emit('itemImageLoad')

       /* if (this.$route.path.indexOf('/home')) {
          this.$bus.$emit('homeImageLoad')
        } else if (this.$route.path.indexOf('/detail')) {
          this.$bus.$emit('detailImageLoad')
        }*/



      },

      itemClick() {
        // console.log(this.goodsItem);
        //这里用push()跳转,不要用replace() ,因为push()可以返回
        // this.$router.push('/detail/' + this.goodsItem.iid)
        this.$router.push({
          path: '/detail',
          query: {
            iid: this.goodsItem.iid
          }
        })

      }
    }
  }
</script>

<style scoped>
  .goodsItem {
    width: 48%;
    margin-top: 3px;
    margin-bottom: 3px;
  }

  .goodsInfo p {
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;


  }

  .goodsItem img {
    /*需要给图片一个宽度才能均等分*/
    width: 100%;
    border-radius: 5px;
  }

  .goodsItem span p {
    font-size: 14px;
    color: red;
    text-align: center;
  }

</style>
