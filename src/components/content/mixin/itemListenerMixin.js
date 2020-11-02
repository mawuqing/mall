import {debounce} from '../../common/utils/Debounce'
import BackTop from  '../backTop/BackTop'



export const itemListenerMixin = {
  data () {
    return {
      itemListener: null,
       newRefresh: null,
    }
  },
  mounted(){
    this.newRefresh = debounce(this.$refs.scroll.refresh, 200)
    this.itemListener = ()=> {
      this.newRefresh()
    }
    this.$bus.$on('itemImageLoad',this.itemListener)

    // console.log('mixin被打印了');
  }

}

export const backTopMixin = {
  components: {
    BackTop
  },

  data () {
    return {
      isShow: false
    }
  },

  methods: {
    //生命周期函数方法体内的重复内容可以抽取,它在混入的时候会合并,但methods不行
    //在混入抽取重复代码的时候,methods只会合并函数,函数体内的内容不会合并,而是会覆盖,所以函数体里面的内容不能再抽取了

    backTopClick (){
      this.$refs.scroll.getTop(0,0)
    }
  }

}


/*
  mixin混入 ,继承只能减少类里面的重复代码,
  对象里面重复的代码,需要使用混入技术
  混入是vue的高级函数,混入也是一个js文件
  混入不光可以混入函数,也可以混入data属性,
  组件


 */
