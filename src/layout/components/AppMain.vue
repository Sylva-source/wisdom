<template>
<main class="main">
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
  </section>
</main>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>

<style scoped>
.main{
  padding: 10px 20px;
}
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 80px);
  /* background-color: red; */
  width: 100%;
  position: relative;
  overflow: hidden;
  background-color: #fff;
  padding: 20px;
  box-sizing: border-box;
}
.fixed-header+.app-main {
  padding-top: 50px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
