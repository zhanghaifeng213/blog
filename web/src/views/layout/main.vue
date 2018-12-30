<template>
  <div class="main">
    <head-nav></head-nav>
    <router-view></router-view>
  </div>
</template>

<script>
import HeadNav from "./head-nav";
export default {
  name: "HelloWorld",
  data() {
    return {};
  },
  components: {
    HeadNav
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.main {
}
</style>
