<template>
  <div class="article-detail">
    <div class="header"><el-button type="primary" @click="publishArticle">发表文章</el-button></div>
    <div class="content">
        <el-row :gutter="20">
          <el-col :span="18">
            <div class="grid-content bg-white">
              <!-- <ul class="article-list">
                <li v-for="item in articleList" :key="item._id">
                  <a class="list-face">
                    <img :src="item.author.avatar" alt="" width="45" height="45">
                  </a>
                  <h2>
                    <el-tag size="mini" color="#FF5722">{{item.tips}}</el-tag>
                    <a class="articlt-title ellipsis" @click="goArticleDetail(item)">{{item.title}}</a>
                  </h2>
                  <div class="list-info">
                    <a>{{item.author.username}}</a>
                    <span>{{item.updatedAt}}</span>
                    <span class="list-reply">
                      <i class="el-icon-document" title="评论"></i>{{item.commentNum}}
                    </span>
                  </div>
                </li>
              </ul> -->
              <div class="content-content" >
                <h1 class="h1">{{$route.params.title}}</h1>
                <div class="other-info text-center">
                  <span class="author">{{$route.params.author.username}}</span>
                  <span>&nbsp;&nbsp;发表于：</span>
                  <span class="createTime">{{createdTime}}</span>
                  <span>&nbsp;分类：</span>
                  <span class="tips">{{$route.params.tips}}</span>
                </div>
                <div class="article-detail" style="padding:30px;" v-html="$route.params.content">
                  <!-- <p >环境：阿里云ecs（CentOS 7 64位）环境：阿里云ecs（CentOS 7 64位）</p>
                  <p >环境：阿里云ecs（CentOS 7 64位）环境：阿里云ecs（CentOS 7 64位）</p>
                  <p >环境：阿里云ecs（CentOS 7 64位环境：阿里云ecs（CentOS 7 64位）环境：阿里云ecs（CentOS 7 64位））</p>
                  <p >环境：阿里云ecs（CentOS 7 64位）环境：阿里云ecs（CentOS 7 64位）环境：阿里云ecs（CentOS 7 64位）</p>
                  <p >环境：阿里云ecs（CentOS 7 64位）环境：阿里云ecs（CentOS 7 64位）环境：阿里云ecs（CentOS 7 64位）</p>
                  <p >环境：阿里云ecs（CentOS 7 64位）环境：阿里云ecs（CentOS 7 64位）环境：阿里云ecs（CentOS 7 64位）</p>
                  <p >环境：阿里云ecs（CentOS 7 64位）环境：阿里云ecs（CentOS 7 64位）环境：阿里云ecs（CentOS 7 64位）</p>
                  <p >环境：阿里云ecs（CentOS 7 64位）环境：阿里云ecs（CentOS 7 64位）环境：阿里云ecs（CentOS 7 64位）环境：阿里云ecs（CentOS 7 64位）</p>
                  <p >环境：阿里云ecs（CentOS 7 64位）环境：阿里云ecs（CentOS 7 64位）环境：阿里云ecs（CentOS 7 64位）环境：阿里云ecs（CentOS 7 64位）</p> -->
                  
                </div>
              </div>
              
            </div>
            <div class="content-comment">
                <fieldset class="comment-title">
                  <legend class="ct">评论</legend>
                </fieldset>
                <div class="text">
                  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
                    <el-form-item prop="desc">
                      <el-input type="textarea" v-model="ruleForm.desc" :rows="10" placeholder="请输入......"></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="primary" @click="submitForm('ruleForm')">立即发表</el-button>
                    </el-form-item>
                  </el-form>
                </div>
                <ul class="comment-list">
                  <li>
                    <img src="http://p1.gexing.com/G1/M00/9E/B6/rBACE1LhHpKTZwQLAAAGjTAELNk644_200x200_3.jpg?recache=20131108">
                    <div>
                      <p class="author">bbb</p>
                      <p class="time">9/16/2018, 9:36:22 PM</p>
                    </div>
                    <div class="she-said">bbbbb</div>
                  </li>
                  <li>
                    <img src="http://p1.gexing.com/G1/M00/9E/B6/rBACE1LhHpKTZwQLAAAGjTAELNk644_200x200_3.jpg?recache=20131108">
                    <div>
                      <p class="author">bbb</p>
                      <p class="time">9/16/2018, 9:36:22 PM</p>
                    </div>
                    <div class="she-said">bbbbb</div>
                  </li>
                </ul>
            </div>
          </el-col>
          <el-col :span="6">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>公告</span>
              </div>
              <div v-for="o in 4" :key="o" class="text item">
                {{'列表内容 ' + o }}
              </div>
            </el-card>
          </el-col>
        </el-row>
    </div>
  </div>
</template>

<script>
import { addComment,getCommentList } from "@/api/article";
// import { mapState, mapActions } from "vuex";
export default {
  name: "article-detail",
  data() {
      return {
        createdTime:"",
        ruleForm: {
          desc: '',
          username:"",
          articleId:"",
        },
        rules: {
          desc: [
            { required: true, message: '请输入内容', trigger: 'blur' }
          ]
        },
      };
    },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(this.ruleForm.desc != ""){
            addComment(this.ruleForm)
          }
          else{
            this.$message({
              message: "请编辑文章内容",
              type: "warning"
            });
          }
          alert("submit!");
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // getCommentList(){
      
    // },
    
  },
  mounted:function(){
    // if(this.$route.params.delailId) {
      ;
      // console.log(this.$route.params);
      this.createdTime = this.$route.params.created;
      // console.log(new Date(this.$route.params.created.toLocalTimeString()))
    // }
    
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .article-detail{
    position: relative;
    padding: 65px 200px 50px;
    background: #f2f2f2;
    // min-height: calc(100vh - 61px);
    box-sizing: border-box;
    .header{
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 50px;
      line-height: 50px;
      font-size: 0;
      padding: 0 200px;
      box-sizing: border-box;
      text-align: right;
      background: #fff;
      .el-button {
        vertical-align: middle;
      }
    }
    .content {
      margin-top:15px;
      .bg-white {
        background: #fff;
        padding:25px;
        .content-content{
          .h1{
            text-align:center;
            font-size:32px;
          }
          .other-info{
            margin-top:30px;
            text-align:center;
            color:#555;
          }
          .article-detail{
            background-color:#fff;
            color:#777;
          }
        }
      }
      .content-comment{
        padding:20px;
        margin-top:20px;
        background:#fff;
        .comment-title{
          text-align:center;
          border-color: #eee;
          border-width: 1px 0 0;
          font-size: 20px;
          .ct{
            padding:25px 0;
          }
        }
        .text{
          border-bottom: 1px solid;
          border-color: #999;
          .btn{
            margin:20px 0;
          }
        }
        .comment-list li{
          position: relative;
          padding-left: 60px;
          border-bottom: 1px solid #bbb;
          padding-top: 15px;
          img{
            position: absolute;
            top: 15px;
            left: 0;
            width: 50px;
            height: 50px;
          }
          .author{
            color: #01AAED;
            font-size: 18px;
          }
          .time{
            color: #bbb;
            font-size:14px;
          }
          .she-said{
            padding: 20px 0;
            margin-left: -60px;
          }
        }
      }
    }
  }

</style>
