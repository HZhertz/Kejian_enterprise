<template>
  <div>
    <el-upload
      class="uploader"
      action="http://127.0.0.1:3007/Admin/UpLoad/UploadImage"
      :headers="headers"
      name="image"
      :data="{ folder: folder }"
      :show-file-list="false"
      :on-success="successMethod"
      :on-error="errorMethod"
    >
      <img v-if="img" :src="imgserver + img" class="uploader-img" />

      <i v-else class="el-icon-plus uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
export default {
  props: {
    img: String,
    folder: String,
    updateImg: {
      type: Function,
      default: null
    }
  },
  data() {
    return {
      headers: {}
    }
  },
  mounted() {
    this.headers = {
      Authorization: sessionStorage.getItem('Ticket')
    }
  },
  methods: {
    successMethod(response) {
      let uploadImg = response.data.url
      this.updateImg(uploadImg)
    },
    errorMethod(error) {
      console.error(error)
    }
  }
}
</script>

<style lang="scss" scoped>
.uploader {
  width: 180px;
  height: 180px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.uploader:hover {
  border-color: #409eff;
}
.uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.uploader-img {
  width: 180px;
  height: 180px;
  display: block;
  object-fit: cover;
}
</style>
