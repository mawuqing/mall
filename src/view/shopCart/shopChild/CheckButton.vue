<template>
  <div class=check-button
       :class="{check: isChecked}">
      <img  src="../../../assets/img/cart/tick.svg" alt="购物车商品缩略图">
  </div>
</template>

<script>
  export default {
    name: "CheckButton",
    props:{
      isChecked:{
        type:Boolean,
        default:false
      }
    },
  }
</script>

<style scoped>
  .check-button {

    border-radius: 50%;
    border: 2px solid #aaa

  }

  .check {
    background-color: red;
    border-color: red;
  }

</style>
