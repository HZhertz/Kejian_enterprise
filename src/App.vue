<template>
  <div id="app">
    <el-container>
      <el-header>
        <div class="logo">
          <img src="./assets/img/toplogo.png" alt="toplogo" />
        </div>
        <el-menu
          :default-active="this.$route.path"
          class="el-menu-demo"
          mode="horizontal"
          active-text-color="#409eff"
          :router="router"
        >
          <el-menu-item index="/">首页</el-menu-item>
          <el-menu-item index="/news">新闻资讯</el-menu-item>
          <el-menu-item index="/product">产品中心</el-menu-item>
          <el-menu-item index="/case">经典案例</el-menu-item>
          <el-menu-item index="/goin">走进科建</el-menu-item>
          <el-menu-item index="/download">下载APP</el-menu-item>
        </el-menu>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
      <el-footer
        class="footer"
        height="216px"
        v-show="this.$route.path !== '/' && !this.$route.path.startsWith('/admin')"
      >
        <div class="footer-content">
          <ul class="content-nav">
            <li>
              <p>走进科建</p>
              <span>发展历程</span>
              <span>企业文化</span>
              <span>资质荣誉</span>
              <span>合作伙伴</span>
            </li>
            <li>
              <p>新闻资讯</p>
              <span>公司新闻</span>
              <span>行业动态</span>
            </li>
            <li>
              <p>产品中心</p>
              <span>介绍视频</span>
              <span>管理模式</span>
              <span>平台目标</span>
              <span>功能模块</span>
            </li>
            <li>
              <p>联系我们</p>
              <span>邮箱：kejianlml@163.com</span>
              <span>电话：021-55802368</span>
              <span>地址：上海市杨浦区翔殷路128号12号楼101</span>
            </li>
          </ul>
          <img src="./assets/img/ercode.png" alt="ercode" />
        </div>
        <div class="copyright">
          <span>科建版权所有</span>
        </div>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      router: true,
      isShow: false
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.el-header {
  display: flex;
  justify-content: space-between;
  align-content: center;
  width: 1500px;
  margin: 0 auto;
  .logo {
    width: 280px;
    padding: 10px;
    img {
      width: 100%;
    }
  }
}
.el-main,
.el-footer {
  padding: 0 !important;
}
.footer {
  width: 100%;
  height: 216px;
  background-color: #14679f;
  &-content {
    width: 1240px;
    margin: 0 auto;
    padding-top: 20px;
    display: flex;
    justify-content: space-between;
    .content-nav {
      display: flex;
      justify-content: space-around;
      li {
        display: flex;
        flex-direction: column;
        padding: 0 20px;

        align-items: flex-start;
        p {
          font-size: 20px;
          color: #d4edff;
          padding: 10px 0;
        }
        span {
          color: #f7f7f7;
          font-weight: 300;
          padding: 5px 0;
        }
      }
    }
    img {
      width: 170px;
      height: 170px;
      padding: 10px;
    }
  }
  .copyright {
    height: 30px;
    background: #125688;
    text-align: center;
    span {
      color: #fff;
      line-height: 30px;
    }
  }
}
</style>
