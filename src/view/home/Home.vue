<template>
  <div id="home">
    <!--    导航栏组件-->
    <navigation-bar class="navHome"><div slot="navigationCenter">购物街</div></navigation-bar>

    <!--  复制 control组件解决吸顶效果,这组代码一定放滚动组件的外面
          不能让这个代码和scroll一起滚动
    -->
    <tab-control v-show="isFixed"
                 class="tab2Control"
                 :control-title="titles"
                 @tabControl="getType"
                 ref="ref2TabControl"
    ></tab-control>

    <!--    使用scroll滚动组件-->
    <scroll class="scrollContent"
            ref="scroll"
            :probe-type="3"
            @scroll="scrollUp"
            :pull-up-load="true"
            @pullingUp="loadMore"
    >

      <!--    父组件Home中的数据banner传递给子组件props中的cbanner对象去接收,只有这边传了数据,那么props才能接收到数据-->
      <home-child
        :cbanner = 'banner'
        @swiperImageLoad="swiperImageLoad"
      >

      </home-child>
      <!--    推荐栏,父传子,这边把从服务器请求的数据传给子组件,然后子组件那边用props接收,因为是数组所以props里,加入设置默认值,必须要在函数里返回一个数组(可以是空数字)-->
      <recommend :c-recommend = "recommend"></recommend>
      <!--    本周流行组件-->
      <feature></feature>

      <!--  使用  control组件-->
      <tab-control class="tab1Control"
                   :control-title="titles"
                   @tabControl="getType"
                   ref="ref1TabControl"
      ></tab-control>


      <!--    使用组件GoodsList-->
      <goods-list :goods-list="goods[currentType].list" ></goods-list>
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
import {debounce} from '../../components/common/utils/Debounce'
import {itemListenerMixin} from '../../components/content/mixin/itemListenerMixin'


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
     isShow: false,
     //必须知道滚动到多少距离的时候,开始加吸顶效果
     tabOffsetTop: 0,
     isFixed:false,
     saveY: 0,
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

  mixins: [
    itemListenerMixin
  ],

 /* mounted() {
    //防抖函数第二步: 把直接执行打印30次的函数名传入防抖函数,生成新的函数,并且接收这个新函数
    let refresh = debounce(this.$refs.refScroll.refresh, 200)
    //对监听的事情进行保存
    this.itemListener = () => {
      refresh()
    }
    //mounted()生命周期函数里监听goodsItem组件发射出来的事件总线的自定义事件,一旦监听到图片加载完成,就调用scroll的refresh()方法,重新计算可滚动高度.
    this.$bus.$on('itemImageLoad', this.itemListener
      //防抖函数第三步,在事件总线这里调用被防抖函数处理过的新生成的函数refresh()

      // 防抖节流:对于refresh非常频繁的问题,进行防抖操作
      //防抖函数: debounce,如果直接执行refresh()函数,那么会被执行30次
      //所以需要把refresh函数传入到debounce防抖函数中,生成一个新的函数
      //setTimeout()函数即使没有设置延迟时间,也会放最后执行

      /!*页面的加载顺序（正确的顺序）是
      结构>样式>行为
      也就是
      html>css>JavaScript*!/
    )

    //获取TabControl的offsetTop值,组件没有offsetTop值,只有组件下面的元素才有,所以需要用$el,$el是所有组件都有的属性,用于获取组件中的元素
    //this.$refs.refTabControl.$el.offsetTop这样拿到的数据是不正确的,因为图片还没有加载完毕,没有撑起来,所以需要去监听这个组件上面的大轮播图加载完毕后在开始求值
  },*/
  destroyed() {
    // console.log('home首页被销毁');
    //为了阻止首页和其他页面频繁销毁,需要在App.vue里用<keep-alive>包路由跳转的<router-view>包裹进去.
  },

  activated() {
    //切回原来页面的时候跳转到离开时的位置: scrollto(0,saveY)
    this.$refs.scroll.refresh()
    //下面必须是new出来的实例scroll 里的方法
    this.$refs.scroll.scroll.scrollTo(0,this.saveY)
  },

  deactivated() {
    //1.离开的时候保存一个saveY值
    this.saveY = this.$refs.scroll.scroll.y
    // console.log(this.saveY);
    //2.离开的时候把goodsListItem的图片加载事情取消掉,取消home刷新
    this.$bus.$off('itemImageLoad',this.itemListener)

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
     //让两个tabControl的currentIndex 保持一致
      this.$refs.ref2TabControl.currentIndex = index
      this.$refs.ref1TabControl.currentIndex = index
    },

    backTopClick (){
      // console.log('backtop组件点击事件监听');
      // console.log(this.$refs.refScroll);
      this.$refs.scroll.getTop(0,0)
    },

    scrollUp (position) {
      // console.log(position);
      this.isShow = (- position.y) > 500;
      this.isFixed = (-position.y) > this.tabOffsetTop
    },

   loadMore () {
      this.getHomeGoodsDataMethod(this.currentType)
   },

    swiperImageLoad(){
      this.tabOffsetTop = this.$refs.ref1TabControl.$el.offsetTop
      // console.log(this.tabOffsetTop);
    },

    itemClick () {
      console.log('goods点击监听');
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
        //Scroll框架默认只上拉加载一页,想要加载更多页,必须调用scroll的finish方法
        this.$refs.scroll.finishPullUp()

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
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }

  /*.home-tab-control {
    !*吸顶或在某个位置停留效果:position:sticky,然后设置top属性在某个高度停留
      在滚动没有达到设置top的值之前,position的属性是sticky,一旦达到top值,系统
      自动把position的属性设置为fixed,固定, 这个属性是最新的,很多浏览器不支持
      移动端

      这个设置是在原生滚动里,如果使用better-scroll,这个吸顶功能就失效了
    *!
    position:sticky;
    top:44px;
  }*/

  .scrollContent {
    position: absolute;
    top:44px;
    left:0;
    right:0;
    bottom: 49px;

  }

  .tab2Control {
    position: relative;
    z-index: 9;
  }






</style>
