<template>
  <div class="persional-userface">
    <el-upload
      class="upload-demo"
      :auto-upload="false"
      :on-change="onChange"
      :action="actionUrl"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :file-list="fileList2"
      list-type="picture">
      <el-button size="small" type="primary">头像上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
    <el-dialog
      title="头像上传"
      :visible.sync="dialogVisible"
      width="30%"
      >
      <img :src="avatarUrl" class="avatar">
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="uploadAvatar">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { upload } from "@/api/user";
export default {
  name: "persional-userface",
  data() {
    return {
      actionUrl: process.env.API_ROOT + "upload",
      dialogVisible: false,
      file: null,
      avatarUrl: "",
      avatarName: ""
    };
  },
  computed: {
    ...mapState({
      username: state => state.user.username,
      avatorImgPath: state => state.user.avatorImgPath
    }),
    fileList2() {
      return [
        {
          name: this.username,
          url: this.avatorImgPath
        }
      ];
    }
  },
  methods: {
    ...mapActions(["handleUserInfo"]),
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log("handlePreview");
      console.log(file);
    },
    beforeUpload(file) {
      console.log("beforeUpload");
      console.log(file);
    },
    onChange(file) {
      console.log(this.fileList2);
      console.log("onChange");
      console.log(file);
      let reader = new FileReader();
      reader.readAsDataURL(file.raw);
      const _this = this;
      reader.onloadend = function(e) {
        _this.avatarUrl = reader.result;
        _this.file = file.raw;
        _this.avatarName = file.raw.name;
        _this.dialogVisible = true;
      };
    },
    uploadAvatar() {
      let data = new FormData();
      data.append("file", this.file);
      upload(data).then(res => {
        if (res.data.status == 1) {
          this.handleUserInfo().then(res => {
            console.log(res);
            this.dialogVisible = false;
          });
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.persional-userface {
  padding: 20px;
  box-sizing: border-box;
}
.avatar {
  max-width: 100%;
}
</style>