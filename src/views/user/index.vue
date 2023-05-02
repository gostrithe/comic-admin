<template>
  <div class="user-management">
    <h1 class="title">用户列表</h1>
    <el-button type="primary" class="add-btn" @click="handleAdd">添加用户</el-button>
    <el-table :data="userList" style="width: 100%">
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="nickname" label="昵称"></el-table-column>
      <el-table-column prop="avatar" label="头像">
        <template slot-scope="scope">
          <div class="avatar">
            <img :src="scope.row.avatar" alt="avatar" width="100%">
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="role" label="角色"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible">
      <el-form ref="userForm" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="form.nickname"></el-input>
        </el-form-item>
        <el-form-item label="头像" prop="avatar">
          <el-upload
            action=""
            :show-file-list="false"
            :on-success="handleUploadSuccess"
          >
            <el-button slot="trigger" size="small">选取文件</el-button>
          </el-upload>
          <img v-if="form.avatar" :src="form.avatar" alt="avatar" width="80">
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-select v-model="form.role">
            <el-option label="管理员" value="管理员"></el-option>
            <el-option label="普通用户" value="普通用户"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userList: [
        {
          id: '007',
          username: 'jack',
          nickname: '格里芬',
          avatar: 'https://c-ssl.duitang.com/uploads/item/201607/01/20160701125240_zu43t.jpeg',
          role: '管理员'
        }
      ],
      dialogVisible: false,
      dialogTitle: '',
      form: {
        id: '',
        username: '',
        nickname: '',
        avatar: '',
        role: ''
      }
    }
  }
}
</script>

<style scoped>
.user-management {
  padding: 20px;
}
.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
}
</style>
