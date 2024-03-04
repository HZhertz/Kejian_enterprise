<template>
  <div>
    <el-upload
      class="avatar-uploader"
      action="http://127.0.0.1:3007/Admin/UpLoad/UploadImage"
      :headers="headers"
      name="image"
      :data="{ folder: folder }"
      :show-file-list="false"
      :on-success="successMethod"
      :on-error="errorMethod"
    >
      <img v-if="img" :src="imgserver + img" class="avatar" />

      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
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
      // this.handleSuccess(response, file, fileList)
    }
  }
}
</script>

<style lang="scss" scoped>
.avatar {
  object-fit: cover;
}
</style>
