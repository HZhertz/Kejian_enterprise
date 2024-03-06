<template>
  <div class="cases">
    <el-button type="primary" @click="openDialog()">新增</el-button>

    <el-table border :data="pageData" style="width: 100%">
      <el-table-column prop="Id" label="序号" width="50"></el-table-column>
      <el-table-column prop="Key" label="键" width="180"></el-table-column>
      <el-table-column prop="Content" label="值"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            @click="handleEdit(scope.$index, scope.row)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            @click="handleDelete(scope.$index, scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <Page :tableData="tableData" :updatePageData="updatePageData"></Page>

    <el-dialog title="案例编辑" :visible.sync="dialogFormVisible">
      <el-form :model="formData">
        <el-form-item label="数据键" :label-width="formLabelWidth">
          <el-input v-model="formData.Key" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="数据键" :label-width="formLabelWidth">
          <el-input v-model="formData.Content" autocomplete="off"></el-input>
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
import Page from '@/components/Page.vue'

export default {
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: '120px',
      tableData: [],
      pageData: [],
      formData: {
        Id: 0,
        Key: '',
        Content: ''
      }
    }
  },
  components: {
    Page
  },
  mounted() {
    this.loadData()
  },
  methods: {
    updatePageData(pageData) {
      this.pageData = pageData
    },
    loadData() {
      https
        .get('DataDictionary/GetDataDictionaryAll')
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
      this.formData.Id = 0
      this.formData.Key = ''
      this.formData.Content = ''

      this.dialogFormVisible = true
    },
    handleCreateOrModify() {
      if (!this.formData.Id) {
        https
          .post('Admin/Dictionary/CreateDictionary', this.formData)
          .then((response) => {
            if (response.type === 'success') {
              this.$message({
                message: '创建成功！',
                type: 'success'
              })
              this.dialogFormVisible = false
              this.loadData()
            } else {
              this.$message({
                message: '创建失败！',
                type: 'error'
              })
            }
          })
          .catch((e) => {
            this.$message({
              message: '网络或程序异常！' + e,
              type: 'error'
            })
          })
      } else {
        https
          .put('Admin/Dictionary/ModifiedDictionary', this.formData)
          .then((response) => {
            if (response.type === 'success') {
              this.$message({
                message: '修改成功！',
                type: 'success'
              })
              this.dialogFormVisible = false
              this.loadData()
            } else {
              this.$message({
                message: '修改失败！',
                type: 'error'
              })
            }
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
      this.formData = row
      this.dialogFormVisible = true
    },
    handleDelete(index, row) {
      this.$confirm('此操作将永久此条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          https
            .delete(`Admin/Dictionary/DeleteDictionary?id=${row.Id}`)
            .then((response) => {
              if (response.type === 'success') {
                this.$message({
                  message: '删除成功！',
                  type: 'success'
                })
                this.loadData()
              } else {
                this.$message({
                  message: '删除失败！',
                  type: 'error'
                })
              }
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
    }
  }
}
</script>

<style scoped></style>
