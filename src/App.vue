<template>
  <div id="app">
    <keep-alive include="home">
     <router-view/>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: "App",
  mounted() {}
};
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
<style src="./assets/style/main.less"></style>
