<template>
  <div class="NewsDetails">
    <Banner title="资讯详情" :img="require('../assets/img/news_top.jpg')" />
    <div class="NewsDetails-product">
      <div class="NewsDetails-product-content">
        <img v-lazy="imgserver + newsIdList.Img" alt="newsImg" />
        <p class="product-title">{{ newsIdList.Title }}</p>
        <p class="product-time">{{ newsIdList.CreateTime.slice(0, 10) }}</p>
        <p class="product-content">{{ newsIdList.Content }}</p>
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
      newsIdList: {}
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
        .get(`News/GetNewsById/${this.pid}`)
        .then((response) => {
          this.newsIdList = response.data[0]
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.NewsDetails {
  width: 100%;
  height: 100%;
  //overflow: hidden;
  background-color: #14679f;
  &-product {
    width: 1240px;
    margin: 0 auto;
    background-color: #fff;
    border: 1px solid red;
    &-content {
      width: 760px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 50px 0;
      img {
        width: 100%;
        //height: 500px;
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
