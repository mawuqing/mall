<template>
<div class="childRecommend">
<!--  数组要遍历才能显示内容-->
  <div class="recommendItem" v-for="(item,index) in cRecommend "  :key=index>
    <a :href="item.link">
      <img :src="item.image" alt=""/>
    </a>
    <h3>{{item.title}}</h3>
  </div>

</div>
</template>

<script>
  export default {
    name: "Recommend",
    props: {
      cRecommend: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  /*flex布局必须要有父子标签,把父标签设置为display=flex布局,然后子标签设置为flex:1 均等分*/
  .childRecommend {
    display:flex;
    font-size:12px;
    text-align: center;
    margin-top:8px;
  }
  .recommendItem {
    flex:1;
  }
  .recommendItem img {
    width: 85px;
    height:85px;
    margin-bottom:5px;
  }


</style>
