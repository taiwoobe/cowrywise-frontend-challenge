<template>
  <div id="app">
    <router-view :key="$route.fullPath"/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: -apple-system,system-ui,BlinkMacSystemFont,"Segoe UI", Roboto;
}
body {
  margin: 0;
}
img {
  max-width: 100%;
  width: 100%;
  vertical-align: middle;
}
</style>
