webpackJsonp([7],{"9iaF":function(e,a){},IoJA:function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var o=t("4YfN"),n=t.n(o),l=t("9rMa"),i=t("vMJZ"),r={name:"persional-userface",data:function(){return{actionUrl:"http://localhost:6000/upload",dialogVisible:!1,file:null,avatarUrl:"",avatarName:""}},computed:n()({},Object(l.c)({username:function(e){return e.user.username},avatorImgPath:function(e){return e.user.avatorImgPath}}),{fileList2:function(){return[{name:this.username,url:this.avatorImgPath}]}}),methods:n()({},Object(l.b)(["handleUserInfo"]),{handleRemove:function(e,a){console.log(e,a)},handlePreview:function(e){console.log("handlePreview"),console.log(e)},beforeUpload:function(e){console.log("beforeUpload"),console.log(e)},onChange:function(e){console.log(this.fileList2),console.log("onChange"),console.log(e);var a=new FileReader;a.readAsDataURL(e.raw);var t=this;a.onloadend=function(o){t.avatarUrl=a.result,t.file=e.raw,t.avatarName=e.raw.name,t.dialogVisible=!0}},uploadAvatar:function(){var e=this,a=new FormData;a.append("file",this.file),Object(i.e)(a).then(function(a){1==a.data.status&&e.handleUserInfo().then(function(a){console.log(a),e.dialogVisible=!1})})}})},s={render:function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"persional-userface"},[t("el-upload",{staticClass:"upload-demo",attrs:{"auto-upload":!1,"on-change":e.onChange,action:e.actionUrl,"on-preview":e.handlePreview,"on-remove":e.handleRemove,"file-list":e.fileList2,"list-type":"picture"}},[t("el-button",{attrs:{size:"small",type:"primary"}},[e._v("头像上传")]),e._v(" "),t("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[e._v("只能上传jpg/png文件，且不超过500kb")])],1),e._v(" "),t("el-dialog",{attrs:{title:"头像上传",visible:e.dialogVisible,width:"30%"},on:{"update:visible":function(a){e.dialogVisible=a}}},[t("img",{staticClass:"avatar",attrs:{src:e.avatarUrl}}),e._v(" "),t("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{on:{click:function(a){e.dialogVisible=!1}}},[e._v("取 消")]),e._v(" "),t("el-button",{attrs:{type:"primary"},on:{click:e.uploadAvatar}},[e._v("确 定")])],1)])],1)},staticRenderFns:[]};var c=t("C7Lr")(r,s,!1,function(e){t("9iaF")},"data-v-4a80c22e",null);a.default=c.exports}});
//# sourceMappingURL=7.e0200fd02cd0c0ce1440.js.map