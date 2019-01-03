<template>
  <div class="persional">
    <div class="nav">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @select="select">
        <el-menu-item index="1">
          <i class="el-icon-view"></i>
          <span slot="title">用户管理</span>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-tickets"></i>
          <span slot="title">文章管理</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-message"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">头像上传</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {};
  },
  methods: {
    select(index) {
      switch (index) {
        case "1":
          this.$router.push({
            name: "user"
          });
          break;
        case "2":
          this.$router.push({
            name: "article"
          });
          break;
        case "3":
          this.$router.push({
            name: "comment"
          });
          break;
        case "4":
          this.$router.push({
            name: "userface"
          });
          break;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.persional {
  display: flex;
  .nav {
    flex: 0 0 200px;
    width: 200px;
  }
  .content {
    flex: 1;
  }
}
</style>
