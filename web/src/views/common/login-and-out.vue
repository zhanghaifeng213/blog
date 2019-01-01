
<template>
  <el-dialog
    class="login-and-out"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    width="500px"
    >
    <el-tabs v-model="active" type="card" @tab-click="handleClick" ref="tabs">
      <el-tab-pane label="登陆" name="login">
        <el-form :model="ruleForm1" status-icon ref="ruleForm1" label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户名" prop="name">
            <el-input v-model.number="ruleForm1.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="ruleForm1.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm1')">提交</el-button>
            <el-button @click="resetForm('ruleForm1')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="注册" name="logout">
        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户名" prop="username">
            <el-input v-model.number="ruleForm2.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="ruleForm2.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm2.checkPass"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
            <el-button @click="resetForm('ruleForm2')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<script>
import { reg, login, info } from "@/api/user";
import { mapActions } from "vuex";
export default {
  name: "login-and-out",
  data() {
    const checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空"));
      } else {
        callback();
      }
    };

    const validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm2.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm2.checkPass !== "") {
          this.$refs.ruleForm2.validateField("checkPass");
        }
        callback();
      }
    };
    return {
      dialogVisible: false,
      ruleForm1: {
        username: "",
        password: ""
      },
      ruleForm2: {
        username: "",
        password: "",
        checkPass: ""
      },
      rules2: {
        password: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        username: [{ validator: checkName, trigger: "blur" }]
      }
    };
  },
  props: {
    activeName: {
      default: "login",
      type: String
    }
  },
  computed: {
    active: {
      get() {
        return this.activeName;
      },
      set(val) {
        return val;
      }
    }
  },
  methods: {
    ...mapActions(["handleLogin", "handleLogOut", "handleUserInfo"]),
    init(index) {
      this.dialogVisible = true;
      this.$nextTick(() => {});
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (formName == "ruleForm1") {
            const { username, password } = this.ruleForm1;
            this.handleLogin({ username, password })
              .then(res => {
                this.handleUserInfo().then(res => {
                  this.$message({
                    message: "登陆成功",
                    type: "success"
                  });
                  this.dialogVisible = false;
                  this.$router.push({ name: "home" });
                });
              })
              .catch(err => {
                this.$message({
                  message: err.data,
                  type: "warning"
                });
              });
          } else {
            const { username, password } = this.ruleForm2;
            reg({
              username,
              password
            }).then(res => {
              if (res.data.status === "success") {
                this.$refs.tabs.currentName = "login";
                this.$message({
                  message: res.data.data,
                  type: "success"
                });
              } else {
                this.$message({
                  message: res.data.data,
                  type: "warning"
                });
              }
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.login-and-out {
  .el-form-item {
    padding-right: 20px;
  }
}
</style>
