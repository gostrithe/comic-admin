<template>
  <div class="comic">
    <h1 class="title">漫画列表</h1>
    <el-table :data="comicList" class="table" style="width: 100%">
      <el-table-column prop="id" label="ID" />
      <el-table-column prop="cover" label="封面">
        <template slot-scope="scope">
          <img
            style="width: 50px; height: 77px"
            :src="scope.row.cover"
            alt=""
          >
        </template>
      </el-table-column>
      <el-table-column prop="title" label="漫画名称" />
      <el-table-column prop="author" label="作者" />
      <el-table-column prop="type" label="类型" />
      <el-table-column prop="description" label="描述" />
      <el-table-column prop="status" label="状态" />
      <el-table-column label="最新章节">
        <template slot-scope="scope">
          <div>第{{ scope.row.chapters.lastest.chapter }}话</div>
          <div>{{ scope.row.chapters.lastest.desc }}</div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" fixed="right" width="230">
        <template slot-scope="scope">
          <div class="operation-col">
            <el-button
              class="edit-btn"
              type="text"
              @click="editComic(scope.row)"
            >编辑</el-button>
            <el-button
              class="edit-btn"
              type="text"
              @click="moreDetail(scope.row)"
            >更多详情</el-button>
            <el-popconfirm
              confirm-button-text="好的"
              cancel-button-text="不用了"
              icon="el-icon-info"
              icon-color="red"
              title="这是一段内容确定删除吗？"
              @onConfirm="deleteComic(scope.row)"
            >
              <el-button
                slot="reference"
                class="delete-btn"
                type="text"
              >删除</el-button>
            </el-popconfirm>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <el-drawer
      title="编辑抽屉"
      :visible.sync="drawer"
      direction="rtl"
      :before-close="handleClose"
    >
      <div class="comic-edit">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="漫画名称">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item label="作者">
            <el-input v-model="form.author" />
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="form.status">
              <el-option label="连载中" value="1" />
              <el-option label="已完结" value="2" />
            </el-select>
          </el-form-item>
          <el-form-item label="封面图片">
            <el-upload :action="uploadUrl" :on-success="handleUploadSuccess">
              <img
                v-if="form.cover"
                :src="form.cover"
                style="max-width: 200px; max-height: 200px"
              >
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'Comic',
  data() {
    return {
      drawer: false,
      comicList: [
        {
          id: '777',
          title: '海贼王',
          author: '尾田',
          type: '热血',
          cover:
            'https://c-ssl.duitang.com/uploads/item/201607/01/20160701125240_zu43t.jpeg',
          description: '小丑王巴基与他的宝藏。。。',
          status: '完结',
          chapters: {
            lastest: {
              chapter: 2222,
              desc: '我是小丑王。。。'
            }
          }
        }
      ],
      form: {
        id: '',
        name: '',
        author: '',
        status: '',
        cover: ''
      },
      uploadUrl: 'https://httpbin.org/post'
    }
  },
  created() {
    this.getComicList()
  },
  methods: {
    moreDetail() {

    },
    handleClose() {},
    getComicList() {
      // fetchComicList().then(res => {
      //   this.comicList = res.data
      // })
    },
    editComic(row) {
      this.drawer = true
      const rowCopy = _.cloneDeep(row)
      this.form = rowCopy

      // 编辑漫画操作
    },
    deleteComic(row) {
      // deleteComic(row.id).then(() => {
      //   this.getComicList()
      // })

      this.$notify({
        title: '删除提示',
        message: '删除成功',
        type: 'warning'
      })
    },
    handleUploadSuccess(response, file) {
      this.form.cover = URL.createObjectURL(file.raw)
    },
    submitForm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          // updateComic(this.form).then(() => {
          //     this.$message.success('漫画信息更新成功')
          // })

          this.drawer = false

          const h = this.$createElement

          this.$notify({
            title: '成功',
            message: h('i', { style: 'color: teal' }, '操作成功'),
            type: 'success'
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.comic {
  padding: 20px;
}

/* 添加操作列样式 */
.operation-col {
  // width: 220px;
  display: flex;
}

.operation-col button {
  margin: 5px;
  border: none;
  border-radius: 4px;
  color: #fff;
  padding: 6px 12px;
  font-size: 14px;
  cursor: pointer;
}

.operation-col .edit-btn {
  background-color: #409eff;
}

.operation-col .delete-btn {
  background-color: #f56c6c;
}

/* hover时改变按钮颜色 */
.operation-col button:hover {
  opacity: 0.8;
}

</style>
