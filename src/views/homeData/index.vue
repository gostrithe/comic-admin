<template>
  <div style="padding: 20px">
    <h1>首页展示管理</h1>
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item title="轮播图管理" name="1">
        <template slot="title">
          <h2>轮播图管理</h2>
        </template>
        <el-button style="margin-bottom: 10px;" round type="primary">从漫画库中选择</el-button>
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :file-list="fileList"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
        >
          <i class="el-icon-plus" />
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <div style="display: flex;">
            <img width="50%" :src="dialogImageUrl" alt="">
            <div style="margin-left: 40px;padding-top: 20px;">
              <el-radio v-model="radio" label="1">漫画跳转</el-radio>
              <el-radio v-model="radio" label="2">其他链接跳转</el-radio>
              <el-divider />
              <span>漫画ID:</span><el-input v-model="input" placeholder="请输入漫画ID" />
              <el-divider />
              <span>其他跳转链接:</span><el-input v-model="input2" placeholder="请输入跳转链接" />
              <el-divider />
              <div style="text-align: right;">
                <el-button type="primary">确定</el-button>
              </div>
            </div>
          </div>
        </el-dialog>
      </el-collapse-item>
      <el-collapse-item title="精品小说管理" name="2">
        <template slot="title">
          <h2>精品小说管理</h2>
        </template>
        <el-card
          style="width: 20%"
          :body-style="{ padding: '20px', width: '100%' }"
        >
          <img
            src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
            class="image"
          >
          <div style="padding: 14px">
            <div>漫画ID: 777</div>
            <div>漫画名称: xxx</div>
            <div>
              描述：
              <el-input
                v-model="textarea1"
                type="textarea"
                autosize
                placeholder="请输入内容"
                readonly
              />
            </div>
            <div class="bottom clearfix">
              <el-button type="danger" class="button">删除</el-button>
              <el-button type="info" class="button">编辑描述</el-button>
            </div>
          </div>
        </el-card>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
  data() {
    return {
      textarea1: 'xxxxxxxxxxxxxxXXXXXXXXXXXXXXXXXX......',
      input: '',
      input2: '',
      radio: '1',
      activeNames: ['2'],
      dialogImageUrl: '',
      dialogVisible: false,
      fileList: [
        {
          name: '轮播图1',
          url: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png'
        },
        {
          name: '轮播图2',
          url: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png'
        },
        {
          name: '轮播图3',
          url: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png'
        }
      ]
    }
  },
  methods: {
    onUploadSuccess(response, file, fileList) {
      console.log(response, file, fileList)
    },
    handleChange(val) {
      console.log(val)
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 2px;
  float: right;
  margin-left: 6px;
}

.image {
  width: 100%;
  height: 100px;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>
