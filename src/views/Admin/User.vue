<template>
  <div>
    <el-button type="primary" @click="openDialog()">新增用户</el-button>
    <el-button type="danger" @click="clearToken()">清除用户身份票据</el-button>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="Id" label="序号"></el-table-column>
      <el-table-column prop="LoginName" label="用户名"></el-table-column>
      <el-table-column prop="Password" label="密码"></el-table-column>
      <el-table-column prop="IsAction" label="是否启用">
        <template slot-scope="scope">{{ scope.row.IsAction ? '是' : '否' }}</template>
      </el-table-column>
      <el-table-column prop="CreateTime" label="创建时间" :formatter="dateFormat"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            @click="handleEdit(scope.$index, scope.row)"
            :disabled="scope.row.LoginName == 'admin'"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            @click="handleDelete(scope.$index, scope.row)"
            :disabled="scope.row.LoginName == 'admin'"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="用户信息操作" :visible.sync="dialogFormVisible">
      <el-form :model="formData">
        <el-form-item label="登录名" :label-width="formLabelWidth">
          <el-input v-model="formData.LoginName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="formData.Password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否启用" :label-width="formLabelWidth">
          <el-radio v-model="formData.IsAction" :label="1">是</el-radio>
          <el-radio v-model="formData.IsAction" :label="0">否</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleCreateOrModify()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import https from '@/utils/https'

export default {
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: '120px',
      tableData: [],
      formData: {
        Id: 0,
        LoginName: '',
        Password: '',
        IsAction: 1,
        CreateTime: new Date()
      },
      options: {}
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    loadData() {
      https
        .get('Admin/User/GetUserAll')
        .then((response) => {
          this.tableData = response.data
        })
        .catch((e) => {
          this.$message({
            message: '网络或程序异常！' + e,
            type: 'error'
          })
        })
    },
    openDialog() {
      // 清除数据
      this.formData.Id = 0
      this.formData.LoginName = ''
      this.formData.Password = ''
      this.formData.IsAction = 1
      this.formData.CreateTime = new Date()

      this.dialogFormVisible = true
    },
    // 新增
    handleCreateOrModify() {
      if (!this.formData.Id) {
        // ID 无效时 视为新增

        https
          .post('Admin/User/CreateUser', this.formData)
          .then((response) => {
            console.log(response)
            this.$message({
              message: '创建成功！',
              type: 'success'
            })
            this.dialogFormVisible = false
            this.loadData()
          })
          .catch((e) => {
            this.$message({
              message: '网络或程序异常！' + e,
              type: 'error'
            })
          })
      } else {
        console.log(this.formData)
        https
          .put('Admin/User/ModifiedUser', this.formData)
          .then((response) => {
            console.log(response)
            this.$message({
              message: '修改成功！',
              type: 'success'
            })
            this.dialogFormVisible = false
            this.loadData()
          })
          .catch((e) => {
            this.$message({
              message: '网络或程序异常！' + e,
              type: 'error'
            })
          })
      }
    },
    handleEdit(index, row) {
      window.console.log(index, row)
      this.formData = row
      this.dialogFormVisible = true
    },
    handleDelete(index, row) {
      window.console.log(index, row)
      this.$confirm('此操作将永久此条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          https
            .delete(`Admin/User/DeleteUser?id=${row.Id}`)
            .then((response) => {
              console.log(response)
              this.$message({
                message: '删除成功！',
                type: 'success'
              })
              this.loadData()
            })
            .catch((e) => {
              this.$message({
                message: '网络或程序异常！' + e,
                type: 'error'
              })
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    clearToken() {
      this.$confirm('此操作将清除登录信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          sessionStorage.removeItem('Ticket')
          this.$router.push('/login')
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    },
    //时间格式化
    dateFormat: function (row) {
      //row 表示一行数据, CreateTime 表示要格式化的字段名称
      let t = new Date(row.CreateTime)
      return t.getFullYear() + '-' + (t.getMonth() + 1) + '-' + t.getDate()
    }
  }
}
</script>

<style scoped>
.el-table {
  margin-top: 20px;
}
</style>
