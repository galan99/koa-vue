<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
*{padding:0;margin:0;}
body{
  font-size: 14px;
  font-family: "微软雅黑";
}
li{
  list-style: none;
}
img{
  display: inline-block;
  border:none;
}
#app, .wrapper, body, html {
    width: 100%;
}
</style>
