<template>
  <div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    tableData: {
      type: Array,
      default: () => []
    },
    updatePageData: {
      type: Function,
      default: null
    }
  },
  data() {
    return {
      total: 0,
      currentPage: 1,
      pageSize: 4,
      pageData: []
    }
  },
  watch: {
    tableData: {
      immediate: true,
      handler(newValue) {
        this.total = newValue.length
        this.getPageData()
      }
    }
  },

  methods: {
    handleSizeChange(val) {
      this.pageSize = val
      this.getPageData()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getPageData()
    },
    getPageData() {
      this.pageData = this.tableData.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      )
      console.log('this.pageData', this.pageData)
      this.updatePageData(this.pageData)
    }
  }
}
</script>

<style lang="scss" scoped></style>
