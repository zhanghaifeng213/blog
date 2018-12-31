<template>
  <div class="publish-article">
    <div class="wrap">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>文章编辑</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="title">
        <el-row>
          <el-col :span="8">
            <span>文章分类</span>
            <el-select v-model="type" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="16">
            <el-input placeholder="请输入内容" v-model="title">
              <template slot="prepend">标题</template>
            </el-input>
          </el-col>
        </el-row>
      </div>
      <div class="content"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "publish-article",
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      type: "",
      title: ""
    };
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
    }
  }
}
</style>
