<template>
  <div class="head-nav">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">首页</el-menu-item>
      <el-menu-item index="2" >Web</el-menu-item>
      <el-menu-item index="3">大数据</el-menu-item> 
      <el-menu-item index="4" >Java</el-menu-item>
      <el-menu-item index="5">Python</el-menu-item>
      <el-menu-item index="6">关于博主</el-menu-item>
      <span class="persional" v-if="!username">
        <el-menu-item index="7" >登陆</el-menu-item>
        <el-menu-item index="8" >注册</el-menu-item>
      </span>
      <span class="persional" v-if="username">
        <el-menu-item index="9" >个人中心</el-menu-item>
        <el-submenu index="10">
          <template slot="title">
            <img src="../../assets/logo.png" width="40" height="40"><span>{{username}}</span>
          </template>
          <el-menu-item index="10-1">退了</el-menu-item>
        </el-submenu>
      </span>
    </el-menu>   
    <login-and-out :activeName="activeName" ref="loginAndOut"></login-and-out>
  </div>
</template>

<script>
import LoginAndOut from "@/views/common/login-and-out";
import { mapState, mapActions } from "vuex";
export default {
  name: "head-nav",
  data() {
    return {
      activeIndex: "1",
      activeName: "login"
    };
  },
  components: {
    LoginAndOut
  },
  computed: {
    ...mapState({
      username: state => state.user.username
    })
  },
  methods: {
    ...mapActions(["handleLogOut"]),
    handleSelect(key, keyPath) {
      switch (key) {
        case "1":
          this.$router.push({
            name: "home"
          });
          break;
        case "7":
          this.activeName = "login";
          this.$refs.loginAndOut.init();
          break;
        case "8":
          this.activeName = "logout";
          this.$refs.loginAndOut.init();
          break;
        case "9":
          this.$router.push({
            name: "persional"
          });
          break;
        case "10-1":
          this.handleLogOut().then(res => {
            console.log(res);
          });
          break;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.head-nav {
  padding: 0 200px;
  .persional {
    display: flex;
    float: right;
  }
}
</style>
