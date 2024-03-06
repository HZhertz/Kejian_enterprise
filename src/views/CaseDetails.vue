<template>
  <div class="case">
    <Banner title="案例详情" :img="require('../assets/img/anlitop.jpg')" />
    <div class="case-product">
      <div class="case-product-content">
        <img v-lazy="imgserver + caseIdList.Img" alt="caseImg" />
        <p class="product-title">{{ caseIdList.Title }}</p>
        <p class="product-time">{{ caseIdList.CreateTime.slice(0, 10) }}</p>
        <p class="product-content">{{ caseIdList.Content }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import https from '@/utils/https'
import Banner from '../components/Banner'
export default {
  components: {
    Banner
  },
  data() {
    return {
      pid: 0,
      caseIdList: {}
    }
  },
  created() {
    this.pid = this.$route.params.id
  },
  mounted() {
    this.loadData()
  },
  methods: {
    loadData() {
      https
        .get(`Case/GetCaseById/${this.pid}`)
        .then((response) => {
          this.caseIdList = response.data[0]
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.case {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #14679f;
  &-product {
    width: 1240px;
    margin: 0 auto;
    background-color: #fff;
    //border: 1px solid red;
    &-content {
      width: 760px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 50px 0;
      img {
        width: 100%;
        height: 430px;
      }
      .product-title {
        font-size: 25px;
        color: #e13834;
        padding: 20px 0;
      }
      .product-content {
        font-size: 17px;
        font-weight: bolder;
        padding: 20px 0;
      }
    }
  }
}
</style>
