<template>
  <div class="news">
    <el-button type="primary" @click="openDialog()">新增</el-button>

    <el-table border :data="tableData" style="width: 100%">
      <el-table-column prop="Id" label="序号" width="180"></el-table-column>
      <el-table-column prop="Title" label="新闻标题" width="180"></el-table-column>
      <el-table-column prop="Img" label="图片">
        <template slot-scope="scope">
          <img style="height: 140px" :src="imgserver + scope.row.Img" alt="newsImg" />
        </template>
      </el-table-column>
      <el-table-column prop="Content" label="新闻内容">
        <template slot-scope="scope">
          <p v-if="scope.row.Content.length > 100">{{ scope.row.Content.substring(0, 100) }} ...</p>
          <p v-else>{{ scope.row.Content }}</p>
        </template>
      </el-table-column>
      <el-table-column prop="Type" label="新闻类别">
        <template slot-scope="scope">{{ scope.row.Type == 1 ? '公司新闻' : '行业动态' }}</template>
      </el-table-column>
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
    <!--  -->
    <el-dialog title="新闻编辑" :visible.sync="dialogFormVisible">
      <el-form :model="formData">
        <el-form-item label="新闻名称" :label-width="formLabelWidth">
          <el-input v-model="formData.Title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新闻图片" :label-width="formLabelWidth">
          <Uploader :img="formData.Img" folder="news_image" :updateImg="updateImg"></Uploader>
        </el-form-item>
        <el-form-item label="新闻内容" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            :rows="10"
            v-model="formData.Content"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="新闻类别" :label-width="formLabelWidth">
          <el-radio v-model="formData.Type" :label="1">公司新闻</el-radio>
          <el-radio v-model="formData.Type" :label="2">行业动态</el-radio>
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

export default {
  name: 'loginNews',
  data() {
    return {
      tableData: [],
      formData: {
        Id: 0,
        Title: '',
        Img: '',
        Type: 1,
        Content: '',
        CreateTime: new Date()
      },
      dialogFormVisible: false,
      formLabelWidth: '120px'
    }
  },
  components: { Uploader },
  mounted() {
    this.loadData()
  },
  methods: {
    updateImg(uploadImg) {
      this.formData.Img = uploadImg
    },
    loadData() {
      https
        .get('News/GetNews?type=0&num=10')
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
      this.formData.Title = ''
      this.formData.Img = ''
      this.formData.Type = 1
      this.formData.Content = ''
      this.formData.CreateTime = new Date()

      this.dialogFormVisible = true
    },
    handleCreateOrModify() {
      if (!this.formData.Id) {
        https
          .post('Admin/News/CreateNews', this.formData)
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
          .put('Admin/News/ModifiedNews', this.formData)
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
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          https
            .delete(`Admin/News/DeleteNews?id=${row.Id}`)
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

<style lang="scss" scoped></style>
