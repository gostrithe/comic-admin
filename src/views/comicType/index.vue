<template>
  <div class="comic-type">
    <el-button type="primary" class="add-btn" @click="handleAdd">新增类型</el-button>
    <el-table :data="typeList" style="width: 100%">
      <el-table-column prop="typeId" label="类型ID"></el-table-column>
      <el-table-column prop="typeName" label="类型名称"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogVisible" :title="dialogTitle" :before-close="handleClose">
      <el-form :model="currentType" label-width="80px">
        <el-form-item label="类型名称" prop="typeName">
          <el-input v-model="currentType.typeName" autocomplete="off"></el-input>
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
import { getTypes, delType, editType, addType } from '../../api/table'
export default {
  data() {
    return {
      typeList: [],
      currentType: {
        typeId: '',
        typeName: ''
      },
      dialogVisible: false,
      dialogTitle: '编辑类型'
    }
  },
  mounted() {
    getTypes().then(res => {
      console.log('res', res)
      this.typeList = res
    })
  },
  methods: {
    handleAdd() {
      this.dialogTitle = '新增类型'
      this.currentType = { typeId: this.typeList.length + 1, typeName: '' }
      this.dialogVisible = true
    },
    handleEdit(index, row) {
      this.dialogTitle = '编辑类型'
      this.currentType = Object.assign({}, row)
      this.dialogVisible = true
    },
    handleDelete(index, row) {
      this.$confirm(`确认删除类型 ${row.typeName} 吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delType(row.typeId).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功！'
          })
          getTypes().then(res => {
            console.log('res', res)
            this.typeList = res
          })
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
      const { typeId, typeName } = this.currentType
      if (!typeName) {
        this.$message.error('请填写类型名称')
        return
      }
      if (this.dialogTitle == '编辑类型') {
        editType(typeId, this.currentType).then(() => {
          this.$message.success('修改成功')
          getTypes().then(res => {
            console.log('res', res)
            this.typeList = res
          })
        })
      } else {
        addType(this.currentType).then(() => {
          this.$message.success('添加成功')
          getTypes().then(res => {
            console.log('res', res)
            this.typeList = res
          })
        })
      }
      // if (!typeId) {
      //   this.typeList.push({ id: String(Date.now()), name })
      // } else {
      //   const index = this.typeList.findIndex(item => item.id === id)
      //   Object.assign(this.typeList[index], {
      //     name
      //   })
      // }
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
