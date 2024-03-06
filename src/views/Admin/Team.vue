<template>
  <div class="Team">
    <el-button type="primary" @click="openDialog()">新增</el-button>

    <el-table border :data="pageData" style="width: 100%">
      <el-table-column prop="Id" label="序号" width="180"></el-table-column>
      <el-table-column prop="Img" label="图片">
        <template slot-scope="scope">
          <img style="height: 140px" :src="imgserver + scope.row.Img" alt />
        </template>
      </el-table-column>
      <el-table-column prop="Remark" label="备注"></el-table-column>
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

    <el-dialog title="团队风采编辑" :visible.sync="dialogFormVisible">
      <el-form :model="formData">
        <el-form-item label="风采图片" :label-width="formLabelWidth">
          <Uploader :img="formData.Img" folder="team_image" :updateImg="updateImg"></Uploader>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="formData.Remark" autocomplete="off"></el-input>
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
import Uploader from '@/components/Uploader.vue'
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
        Img: '',
        Remark: '',
        CreateTime: new Date()
      }
    }
  },
  components: { Uploader, Page },
  mounted() {
    this.loadData()
  },
  methods: {
    updatePageData(pageData) {
      this.pageData = pageData
    },
    updateImg(uploadImg) {
      this.formData.Img = uploadImg
    },
    loadData() {
      https
        .get('Team/GetTeamAll')
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
      this.formData.Img = ''
      this.formData.Remark = ''
      this.formData.CreateTime = new Date()

      this.dialogFormVisible = true
    },
    handleCreateOrModify() {
      if (!this.formData.Id) {
        https
          .post('Admin/Team/CreateTeam', this.formData)
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
          .put('Admin/Team/ModifiedTeam', this.formData)
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
            .delete(`Admin/Team/DeleteTeam?id=${row.Id}`)
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

<style scoped></style>
