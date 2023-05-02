<template>
  <div class="comic-type">
    <el-button type="primary" class="add-btn" @click="handleAdd">新增类型</el-button>
    <el-table :data="typeList" style="width: 100%">
      <el-table-column prop="id" label="类型ID"></el-table-column>
      <el-table-column prop="name" label="类型名称"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogVisible" :title="dialogTitle" :before-close="handleClose">
      <el-form :model="currentType" label-width="80px">
        <el-form-item label="类型名称" prop="name">
          <el-input v-model="currentType.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSave">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      typeList: [
        { id: '1', name: '热血' },
        { id: '2', name: '冒险' },
        { id: '3', name: '悬疑' },
        { id: '4', name: '科幻' },
        { id: '5', name: '恋爱' },
      ],
      currentType: {
        id: '',
        name: ''
      },
      dialogVisible: false,
      dialogTitle: '编辑类型'
    }
  },
  methods: {
    handleAdd() {
      this.dialogTitle = '新增类型'
      this.currentType = { id: '', name: '' }
      this.dialogVisible = true
    },
    handleEdit(index, row) {
      this.dialogTitle = '编辑类型'
      this.currentType = Object.assign({}, row)
      this.dialogVisible = true
    },
    handleDelete(index, row) {
      this.$confirm(`确认删除类型 ${row.name} 吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.typeList.splice(index, 1)
        this.$message({
          type: 'success',
          message: '删除成功！'
        })
      }).catch(() => {})
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    handleSave() {
      const { id, name } = this.currentType
      if (!name) {
        this.$message.error('请填写类型名称')
        return
      }
      if (!id) {
        this.typeList.push({ id: String(Date.now()), name })
      } else {
        const index = this.typeList.findIndex(item => item.id === id)
        Object.assign(this.typeList[index], {
          name
        })
      }
      this.dialogVisible = false
    }
  }
}
</script>
<style lang="scss" scoped>
.comic-type {
  padding: 20px;
}
</style>
