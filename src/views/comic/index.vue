<template>
    <div class="comic">
        <el-table :data="comicList" border style="width: 100%">
            <el-table-column prop="name" label="漫画名称"></el-table-column>
            <el-table-column prop="author" label="作者"></el-table-column>
            <el-table-column prop="status" label="状态"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="text" @click="editComic(scope.row)">编辑</el-button>
                    <el-popconfirm
                        confirm-button-text='好的'
                        cancel-button-text='不用了'
                        icon="el-icon-info"
                        icon-color="red"
                        title="这是一段内容确定删除吗？"
                        @onConfirm="deleteComic(scope.row)"
                        >
                        <el-button type="text" slot="reference">删除</el-button>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>


        <el-drawer title="编辑抽屉" :visible.sync="drawer" direction="rtl" :before-close="handleClose">
            <div class="comic-edit">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="漫画名称">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="作者">
                        <el-input v-model="form.author"></el-input>
                    </el-form-item>
                    <el-form-item label="状态">
                        <el-select v-model="form.status">
                            <el-option label="连载中" value="1"></el-option>
                            <el-option label="已完结" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="封面图片">
                        <el-upload :action="uploadUrl" :on-success="handleUploadSuccess">
                            <img v-if="form.cover" :src="form.cover" style="max-width: 200px; max-height: 200px;">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
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
import _ from 'lodash';

export default {
    name: 'Comic',
    data() {
        return {
            drawer: false,
            comicList: [
                {
                    name: '海贼王',
                    author: '尾田',
                    status: '连载中'
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
        handleClose() {

        },
        getComicList() {
            // fetchComicList().then(res => {
            //   this.comicList = res.data
            // })
        },
        editComic(row) {
            this.drawer = true
            let rowCopy = _.cloneDeep(row)
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
            });
        },
        handleUploadSuccess(response, file) {
            this.form.cover = URL.createObjectURL(file.raw)
        },
        submitForm() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    // updateComic(this.form).then(() => {
                    //     this.$message.success('漫画信息更新成功')
                    // })

                    this.drawer = false

                    const h = this.$createElement;

                    this.$notify({
                        title: '成功',
                        message: h('i', { style: 'color: teal'}, '操作成功'),
                        type: 'success'
                    });
                    

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
</style>
  