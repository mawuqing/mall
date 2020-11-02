<template>
  <div class="detailRoot">

    <!--    1.使用详情页子组件的导航-->
    <detail-nav-bar
      @detail="detailNavClick"
      ref="detailNav"
    >

    </detail-nav-bar>

    <!--    想要在详情页使用滚动,需要把之前封装好的scroll引入,注册,使用的时候需要给它一个高度才可以-->
    <scroll
      :pullUpLoad="true"
      class="detailScroll"
      ref="scroll"
      @scroll="detailScroll"
      :probe-type="3">

      <div>
        <!--    2.使用详情页的轮播图-->
        <detail-swiper :detail-child-top-images="detailTopImages"></detail-swiper>
        <!--    3.详情页商品基本信息-->
        <detail-base-info :detail-child-base-info="detailGoodsInfo"></detail-base-info>
        <!--        4.店铺信息组件-->
        <detail-shop-info :shop="shopInfo"></detail-shop-info>
        <!--        5.商品图片信息展示-->
        <detail-image-info :goods-image-info="detailInfo" @detailImgLoad="detailImgLoad"></detail-image-info>
        <!--            6. 商品参数信息组件-->
        <detail-params-info :param-info="itemParams" ref="refParams"></detail-params-info>
        <!-- 7.用户评论信息展示-->
        <detail-comments :comment-info="commentsInfo" ref="refComment"></detail-comments>

        <!--        8.推荐信息数据和GoodsList组件一模一样,所以不需要创建新组件,直接使用goodsList-->
        <goods-list :goods-list="recommend" ref="refRecommend"></goods-list>
      </div>

    </scroll>

    <!--    DetailBottomBar 不需要滚动，所以放scroll 外面-->
    <detail-bottom-bar
      @addProduct="addProductToCart"
      @goToBuy="goToBuy">

    </detail-bottom-bar>

    <!-- 使用混入的方法来实现回到顶部-->
    <back-top @click.native="backTopClick" v-show="isShow"></back-top>

<!--    使用toast组件-->
    <!--<toast
      :message="message"
      :is-show="show">
    </toast>-->

  </div>
</template>

<script>
  import DetailNavBar from './detailChild/DetailNavBar'
  import {getDetailRequest, goodsBaseInfo, getRecommend} from '../../network/detailRequest'
  import DetailSwiper from './detailChild/DetailSwiper'
  import DetailBaseInfo from './detailChild/DetailBaseInfo'
  import Scroll from '../../components/common/scroll/Scroll'
  import DetailShopInfo from './detailChild/DetailShopInfo'
  import DetailImageInfo from './detailChild/DetailImageInfo'
  import DetailParamsInfo from './detailChild/DetailParamsInfo'
  import DetailComments from './detailChild/DetailComments'
  import GoodsList from '../../components/content/goods/GoodsList'
  import {debounce} from '../../components/common/utils/Debounce'
  import {itemListenerMixin, backTopMixin} from '../../components/content/mixin/itemListenerMixin'
  import DetailBottomBar from './detailchild/DetailBottomBar'
  import {mapActions} from 'vuex'

  // import Toast from '../../components/common/toast/Toast'

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      Scroll,
      DetailShopInfo,
      DetailImageInfo,
      DetailParamsInfo,
      DetailComments,
      GoodsList,
      DetailBottomBar,
      // Toast
    },

    data() {
      return {
        iid: null,
        detailTopImages: [],
        detailGoodsInfo: {},
        shopInfo: {},
        detailInfo: {},
        itemParams: {},
        commentsInfo: {},
        recommend: [],
        themeTops: [],
        debounceY: null,
        scrollY: null,
       /* message:'',
        show: false*/
      }
    },

    created() {
      //1.获取goodsItem点击的时候穿过来的iid ,把这个iid再传给网络请求的时候的参数
      //获取iid,一定要用对象this.$route ,记住是route,不是router,没有r
      //2.bug 解决,当使用了路由跳转和keep-alive后,组件复用不会重新组件,不创建新组件意味着生命周期函数created()函数下一次不会再执行,也就不会发起新的网络请求,导致无法再从服务器获取新的goodsItem的详细数据
      this.iid = this.$route.query.iid
      getDetailRequest(this.iid).then(res => {
        // console.log(res);
        //3.详情页向服务器发起请求,返回的数据res非常复杂,我们需要把轮播图需要的数据单独提取出来,保存,然后传给子组件DetailSwiper去展示数据
        this.detailTopImages = res.data.result.itemInfo.topImages

        //4.从res复杂数据中取出商品基本信息数据,保存到一个对象里
        const itemInfo = res.data.result.itemInfo
        this.detailGoodsInfo = new goodsBaseInfo(itemInfo.title, itemInfo.lowNowPrice, itemInfo.oldPrice, itemInfo.discountDesc, res.data.result.columns, res.data.result.shopInfo.services)
        //5.从res里把店铺信息提出出来,封装到shopInfo对象里
        this.shopInfo = res.data.result.shopInfo
        //6.从res里把goods图片信息找出来封装到对象里,传给子组件去展示
        this.detailInfo = res.data.result.detailInfo
        //7.从res里获取参数信息,保存一个对象里,传给子组件去展示
        this.itemParams = res.data.result.itemParams
        //8. 从res里获取评论信息,保存到对象里,并传递给子组件展示
        this.commentsInfo = res.data.result.rate


      })
      //3.网络请求推荐数据
      getRecommend().then(res => {
        // console.log(res);
        this.recommend = res.data.data.list
      })

      //4. 对themeTops的Y值进行防抖
      this.debounceY = debounce(() => {
        this.themeTops = []
        this.themeTops.push(0)
        this.themeTops.push(this.$refs.refParams.$el.offsetTop)
        this.themeTops.push(this.$refs.refComment.$el.offsetTop)
        this.themeTops.push(this.$refs.refRecommend.$el.offsetTop)
        //给数组添加一个最大值
        this.themeTops.push(Number.MAX_VALUE)
        // console.log(this.themeTops);
      }, 100)
    },

    mixins: [
      itemListenerMixin,
      backTopMixin
    ],

    /*deactivated(){
     detail详情页被排除在keep-alive外,所以这里不会调用deactivated()函数
      console.log('deactivated')
    }*/

    destroyed() {
      //在销毁函数里取消刷新
      //  console.log('destroyed');
      this.$bus.$off('itemImageLoad', this.itemListener)
    },

    methods: {
      detailImgLoad() {
        //下面方法调用太频繁,应该使用防抖函数
        // this.$refs.refScroll.refresh()

        //因为使用了混入,所以这里可以直接this.newRefresh()调用混入对象的属性
        this.newRefresh()

        //调用已经被防抖处理过的debounceY函数
        this.debounceY()

      },

      //映射actions里的方法
      ...mapActions(['actionsAddGoods']),

      detailNavClick(index) {
        // console.log(index);
        //难点:如何获取,在哪里获取Y值?
        //大部分情况offsetTop值不对,都是因为图片没有加载完,高度计算错误
        //1. created()里面不能获取Y值,因为这里就拿不到组件对象
        //2.mounted()里面也不能获取Y值,因为数据可能还没有过来
        //3.this.$nextTick()里也不能获取Y值,因为虽然dom渲染完了,但是图片没有加载完,高度计算错误
        //4。下面需要new出来在的例 scroll  里的方法
        this.$refs.scroll.scroll.scrollTo(0, -(this.themeTops[index]), 100)
      },

      detailScroll(position) {
        // console.log(position);
        this.scrollY = -position.y
        this.isShow = (-position.y) > 500;

        //方案1: if  else 判断方式
        /* if(this.scrollY >=0 && this.scrollY < this.themeTops[1]-44){
           this.$refs.detailNav.currentIndex = 0
         } else if (this.scrollY >= this.themeTops[1]-44&& this.scrollY < this.themeTops[2]-44) {
           this.$refs.detailNav.currentIndex = 1
         } else if (this.scrollY >= this.themeTops[2]-44&& this.scrollY < this.themeTops[3]-44) {
           this.$refs.detailNav.currentIndex = 2
         } else if (this.scrollY >= this.themeTops[3]-44) {
           this.$refs.detailNav.currentIndex = 3
         }*/

        //为了避免数组遍历越界,i < 数组长度-1
        for (let i = 0; i < this.themeTops.length - 1; i++) {
          if (this.scrollY >= this.themeTops[i] && this.scrollY < this.themeTops[i + 1]) {
            //把数组下标值赋值给当前index
            this.$refs.detailNav.currentIndex = i
          }
        }
      },

      addProductToCart() {
        // ('父组件监听子组件点击加入购物车');
        // console.log
        //把需要在购物车展示的信息封装到一个对象里,
        //product 这个对象一定要定义在这个方法里，千万不能定义data 响应式里，否则无法在选中和取消选中切换

        const product = {}
        product.iid = this.iid
        product.title = this.detailGoodsInfo.title
        product.price = this.detailGoodsInfo.lowNowPrice
        product.img = this.detailTopImages[0]
        product.desc = this.detailInfo.desc
        product.checked = true

        // console.log(this.product);
        //不能用下面的代码直接给vuex里的state里面添加数据,在vuex中把数据修改(商品增减)后再展示的时候,需要在mutations里面用commit
        // this.$store.state.goods.push(this.product)
        //当代码比较复杂的时候，修改数据最好在 action里，不能用下面的代码调用
        // this.$store.commit('mutationAddGoods', this.product)

        //调用action里在方法，如果在vue里完成了某个操作，相让外界知道，就返回promise对象
        this.$store.dispatch('actionsAddGoods', product)
          .then(res => {
           /* if(res != null){
              //如果res返回值不为空，就让toast 显示
              this.show = true
              this.message = res

              //定时器让toast过几秒消失
              setTimeout(() => {
                this.show = false
                this.message = ''
              },2000)
            }*/

           //另外一种toast封装组件方式，封装后，直接调用组件里的方法
            this.$toast.show(res,5000)

          })

         /*//映射actions里的方法后，调用
         this.actionsAddGoods(product).then( result => {
           console.log(result);
         })*/
      },

      goToBuy() {

      }

    }

  }
</script>

<style scoped>
  .detailRoot {
    height: 100vh;
    position: relative;
    z-index: 1;
    background-color: #fff;
  }

  .detailScroll {
    height: calc(100% - 44px - 49px);
    background-color: #fff;
  }

</style>
