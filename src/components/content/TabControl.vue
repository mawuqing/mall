<template>
  <div class="tabControl">
    <div
      class="control-item"
      v-for="(item,index) in controlTitle" :key="index"
      @click="itemClick(index)">
      <!--动态绑定class属性,当数组下标的index值和设置的当前变量currentIndex相等的时候,isActive类名为ture,这时候就有class属性,
      然后就可以在style里拿到这个class属性进行一些了设置样式的操作-->
      <span :class = "{isActive:currentIndex===index}">{{item}}</span>
    </div>

  </div>
</template>

<script>
  export default {
    name: "TabControl",
    props: {
      controlTitle: {
        type: Array ,
        default(){
          return []
        }
      }
    },

    data() {
      return {

        currentIndex: 0
      }
    },

    methods: {
      itemClick (index) {
        this.currentIndex = index
        //子传父,发送自定义事件
        this.$emit('tabControl',index)
      }
    }
  }
</script>

<style scoped>
  .tabControl {
    display:flex;
    text-align:center;
    height:40px;
    line-height:40px;
    background-color:wheat;
    font-size:15px;
  }

  .control-item {
    flex:1;

  }
  
  .isActive {
    color: var(--color-high-text);
    border-bottom:2px solid var(--color-tint);
    padding:3px;

  }

</style>
