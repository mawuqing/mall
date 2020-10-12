<template>
  <div class="navigationBar">
    <div class="navigationLeft"><slot name="navigationLeft"></slot></div>
    <div class="navigationCenter" ><slot name="navigationCenter"></slot></div>
    <div class="navigationRight"><slot name="navigationRight"></slot></div>
  </div>
</template>

<script>
  export default {
    name: "NavigationBar"
  }
</script>

<style scoped>
  .navigationBar {
    display:flex;
    /*一般app导航栏高度为44px*/
    height:44px;
   /*line-height属性可以让文字垂直居中*/
    line-height:44px;
    box-shadow: 0 1px 1px rgba(100,100,100,.1);
  }

  .navigationLeft, .navigationRight {
    width:60px;
    /*background:red;*/
    text-align:center;
  }

  .navigationCenter {
    flex:1;
    text-align:center;
    /*background:blue;*/
  }
</style>
