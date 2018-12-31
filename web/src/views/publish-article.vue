<template>
  <div class="publish-article">
    <div class="wrap">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>文章编辑</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="title">
        <el-form :inline="true" ref="ruleForm" :model="form" :rules="rules" label-width="100px">
          <el-form-item label="文章分类" prop="tips">
            <el-select v-model="form.tips" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="标题" prop="title">
            <el-input placeholder="请输入内容" v-model="form.title">
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="content">
        <Tinymce ref="tinymce" :id="'tinymce'" v-model="form.content"></Tinymce>
      </div>
      <div class="btn-wrap">
        <el-button type="primary" @click="submit('ruleForm')">立即发布</el-button>
      </div>
    </div>
  </div>
</template>

<script>
// tips,
// title,
// content: layedit.getContent(index)
import Tinymce from "@/components/Tinymce";
import { addArticle } from "@/api/article.js";
export default {
  name: "publish-article",
  data() {
    return {
      options: [
        {
          value: "nodejs",
          label: "nodejs"
        },
        {
          value: "vue",
          label: "vue"
        },
        {
          value: "react",
          label: "react"
        },
        {
          value: "angular",
          label: "angular"
        }
      ],
      rules: {
        tips: [{ required: true, message: "请选择文章分类", trigger: "blur" }],
        title: [
          { required: true, message: "请填写文章标题", trigger: "change" }
        ]
      },
      form: {
        tips: "",
        title: "",
        content: ""
      }
    };
  },
  components: {
    Tinymce
  },
  methods: {
    submit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.form.content != "") {
            addArticle(this.form);
          } else {
            this.$message({
              message: "请编辑文章内容",
              type: "warning"
            });
          }
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.publish-article {
  padding: 10px 200px;
  box-sizing: border-box;
  background: #f2f2f2;
  min-height: calc(100vh - 61px);
  .wrap {
    width: 100%;
    padding: 20px;
    background: #fff;
    .title {
      padding: 20px 0;
      .el-form {
        .el-form-item {
          .el-input {
            width: 200px;
          }
        }
      }
    }
    .btn-wrap {
      padding-top: 10px;
    }
  }
}
</style>
