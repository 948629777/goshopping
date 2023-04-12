<template>
  <div id="app">
    <header-nav></header-nav>
    <router-view/>
  </div>
</template>
<script>
  // import nav from './views/Register/headerNav.vue'

</script>
<style>
  ul{
    list-style: none;
  }
  a{
    text-decoration: none;
  }
  a:hover{
    color: red;
  }
 *{
  margin: 0;
  padding: 0;
  font-size: 12px;
 }
</style>
