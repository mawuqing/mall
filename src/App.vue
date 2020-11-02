<template>
  <div id="app">
    <keep-alive exclude="Detail">
<!--      keep-alive标签可以禁止组件频繁销毁创建,同时可以让activated()和deactivated()函数生效-->
      <router-view></router-view>
    </keep-alive>
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
import MainTabBar from "./components/content/MainTabBar";
export default {
  name: 'App',
  components: {
    MainTabBar
  }
}
</script>

<style>

</style>

