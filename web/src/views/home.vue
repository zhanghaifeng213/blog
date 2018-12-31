<template>
  <div class="home">
    <div class="header"><el-button type="primary" @click="publishArticle">发表文章</el-button></div>
    <div class="content">
      <el-row :gutter="20">
        <el-col :span="18">
          <div class="grid-content bg-white">
            <ul class="article-list">
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
            </ul>
            <el-pagination
            @current-change="currentChange"
              background
              layout="prev, pager, next"
              :page-size="pageSize"
              :total="totalPage">
            </el-pagination>
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
import { getArticleList } from "@/api/article";
import { mapState, mapActions } from "vuex";

export default {
  name: "home",
  data() {
    return {
      articleList: [],
      totalPage: 0,
      page: 1,
      pageSize: 2
    };
  },
  created() {
    this.getArticleList();
  },
  computed: {
    ...mapState({
      uid: state => state.user.uid
    })
  },
  methods: {
    getArticleList() {
      getArticleList(this.page).then(res => {
        if (res.data && res.data.artList.length > 0) {
          this.totalPage = res.data.maxNum;
          this.articleList = res.data.artList;
          this.articleList.map(item => {
            item.author.avatar =
              process.env.API_ROOT + item.author.avatar.slice(1);
          });
        }
      });
    },
    goArticleDetail(item) {
      this.$router.push({
        name: "article-detail"
      });
    },
    publishArticle() {
      this.$router.push({
        name: "publish-article"
      });
    },
    currentChange(val) {
      this.page = val;
      this.getArticleList();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.home {
  position: relative;
  padding: 65px 200px 50px;
  background: #f2f2f2;
  min-height: calc(100vh - 61px);
  box-sizing: border-box;
  .header {
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
    .bg-white {
      background: #fff;
    }
    .article-list {
      & > li {
        position: relative;
        padding: 15px 15px 15px 75px;
        border-bottom: 1px dotted #e2e2e2;
        .list-face {
          position: absolute;
          top: 15px;
          left: 15px;
        }
        & > h2 {
          height: 22px;
          .el-tag {
            color: #fff;
          }
        }
        .list-info {
          margin-top: 7px;
          .list-reply {
            float: right;
            margin-top: 3px;
          }
          & * {
            padding-right: 10px;
            color: #999;
          }
        }
      }
    }
    .el-pagination {
      text-align: center;
      padding: 20px 0;
    }
  }
}
</style>
