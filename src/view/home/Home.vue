<template>
  <div id="home">
<!--    导航栏组件-->
   <navigation-bar class="navHome"><div slot="navigationCenter">购物街</div></navigation-bar>

<!--    使用scroll滚动组件-->
 <scroll class="scrollContent"
         ref="refScroll"
         :probe-type="3"
         @scroll="scrollUp"
         :pull-up-load="true"
         @pullingUp="loadMore"
 >

   <!--    父组件Home中的数据banner传递给子组件props中的cbanner对象去接收,只有这边传了数据,那么props才能接收到数据-->
   <home-child :cbanner = 'banner'></home-child>
   <!--    推荐栏,父传子,这边把从服务器请求的数据传给子组件,然后子组件那边用props接收,因为是数组所以props里,加入设置默认值,必须要在函数里返回一个数组(可以是空数字)-->
   <recommend :c-recommend = "recommend"></recommend>
   <!--    本周流行组件-->
   <feature></feature>

   <!--  使用  control组件-->
   <tab-control class="home-tab-control"
                :control-title="titles"
                @tabControl="getType"
   ></tab-control>

   <!--    使用组件GoodsList-->
   <goods-list :goods-list="goods[currentType].list"></goods-list>
 </scroll>

<!--   1 点击按钮返回顶部,组件不能直接监听,必须在原生事件后面加 .native才可以监听组件原生事件,
       2.用v-show动态绝对是否显示back-top组件,isShow默认设置为false,当滚动的position绝对值达到某个
       临界点的时候,把isShow修改为true,这样组件就显示出来了.
-->
    <back-top @click.native="backTopClick" v-show="isShow"></back-top>

  </div>
</template>

<script>
import NavigationBar from '../../components/common/navigationBar/NavigationBar.vue'
import HomeChild from './homeChild/HomeChild'
import Recommend from './homeChild/Recommend.vue'
import Feature from './homeChild/Feature'
import TabControl from '../../components/content/TabControl.vue'
import GoodsList from '../../components/content/goods/GoodsList'
import Scroll from '../../components/common/scroll/Scroll'
import BackTop from '../../components/content/backTop/BackTop'

import '../../network/homeRequest'
import {getHomeMultiData,getHomeGoods} from "../../network/homeRequest";
import '../../assets/css/base.css'


export default {
  name: 'Home',
  components: {
    NavigationBar,
    HomeChild,
    Recommend,
    Feature,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },

 data() {
   return {
     banner: [],
     recommend: [],
     titles: ['流行','新款','精选'],
     //数据结构设计:当请求的数据res内容特别多,而且有不同分类,这时候可以把数据存入json对象goods
     //这个goods对象里面有分三个对象,分别对应三个分类,new,sell,pop, 每一个对象里分别有page和list数据
     //page记录当前页数字,list是一个数组,用来保存服务器请求过来分类数据.
     goods: {
       'pop': {page: 0, list: []},
       'new': {page: 0, list: []},
       'sell': {page: 0, list: []}
     },
     currentType: 'pop',

     isShow: false
   }
 },
  created () {
    //组件一旦创建,调用methods里的方法,发送网络请求获取导航栏,推荐栏等数据
    this.getHomeMultiDataMethod()

    //调用组件里methods里的放放,前面加this,下面联系调用三次方法,出入三个不同的type参数
    this.getHomeGoodsDataMethod('pop')
    this.getHomeGoodsDataMethod('new')
    this.getHomeGoodsDataMethod('sell')
  },

  methods: {
    //1.事件监听相关的方法
    getType(index) {
      switch(index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
    },

    backTopClick (){
      console.log('backtop组件点击事件监听');
      // console.log(this.$refs.refScroll);
      this.$refs.refScroll.getTop(0,0)
    },

    scrollUp (position) {
      // console.log(position);
      this.isShow = (- position.y) > 500
    },

    loadMore () {
      console.log('上啦加载更多')
      this.getHomeGoodsDataMethod(this.currentType)
      this.$refs.refScroll.finishPullUp()
      //better-scroll的refresh()方法会重写计算可滚动区域的高度
      this.$refs.refScroll.scroll.refresh()
    },

    //2.网络请求的方法
    getHomeMultiDataMethod () {
      getHomeMultiData()
        .then( res => {
          // console.log(res)
          // console.log(this.goods['pop']);
          this.banner = res.data.data.banner.list
          this.recommend = res.data.data.recommend.list
        })
    },

    getHomeGoodsDataMethod (type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type,page).then(res => {
        //把一个数组的元素添加到另一个数组,不能用=赋值,因为后面的数据会覆盖前面的数据
        //可以使用遍历的方式把后面数组放入第一个数组,也可以使用push(...数组)其中...表示可变参数,它会把元素从数组一个一个的拿出来,放入另一个数组
        this.goods[type].list.push(...res.data.data.list)
        //把res数据push到数组后,页码必须加1,下面的page+1才是是真正的修改data里的page,而上面的page+1 作用域是本大括号,只是发送请求使用,不会修改data的page
        this.goods[type].page += 1


      })
    }
  }
}
</script>

<style scoped>
  #home {
    /*在home里设置pading-top为导航栏的高度,这样导航栏不会把下面的内如遮住*/
    padding-top:44px;
    position: relative;
    /*子绝父相 ,父这里是相对的*/

  }

  .navHome {
    background-color: var(--color-tint);
    color: white;
    /*margin-bottom:1px;*/
  /*使用position:fixed (固定位置,不让移动)*/
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    /*z-index值较大的元素将叠加在z-index值较小的元素之上。对于未指定此属性的定位对象，
    z-index 值为正数的对象会在其之上，而 z-index 值为负数的对象在其之下。*/
    z-index: 9;
  }

  .home-tab-control {
    /*吸顶或在某个位置停留效果:position:sticky,然后设置top属性在某个高度停留
      在滚动没有达到设置top的值之前,position的属性是sticky,一旦达到top值,系统
      自动把position的属性设置为fixed,固定, 这个属性是最新的,很多浏览器不支持
      移动端
    */
    position:sticky;
    top:44px;
  }

  .scrollContent {
    position: absolute;
    top:44px;
    left:0;
    right:0;
    bottom: 49px;

  }


</style>
