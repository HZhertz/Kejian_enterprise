<template>
  <div class="home">
    <swiper id="swiperBox" v-bind:options="swiperOption" ref="mySwiper">
      <swiper-slide class="swiper-slide slide-one">
        <div class="page">
          <h3>科建股份</h3>
          <p>KeJian Stock</p>
        </div>
        <p class="slogan animate__animated animate__bounceInDown">立人立己 达人达己</p>
      </swiper-slide>
      <swiper-slide class="swiper-slide slide-two">
        <div class="page">
          <h3>经典案例</h3>
          <p>Suecessful Cass</p>
        </div>
        <ul class="case-item">
          <li
            v-for="(item, index) in caseList"
            :key="index"
            v-lazy:background-image="imgserver + item.Img"
          >
            <router-link
              class="text-decoration"
              :to="{ name: 'casedetails', params: { id: item.Id } }"
            >
              <div class="case-item-hover">
                <p class="hover-title">{{ item.Title }}</p>
                <div class="bottom"></div>
                <div class="more">
                  <span>MORE</span>
                </div>
              </div>
            </router-link>
          </li>
        </ul>
      </swiper-slide>
      <swiper-slide class="swiper-slide slide-three">
        <div class="page">
          <h3>最新资讯</h3>
          <p>Latest News</p>
        </div>
        <div class="news-content">
          <div class="news-content-item" v-for="(news, i) in newsList" :key="i">
            <div :style="'order: ' + (i % 2 == 0 ? 1 : 3)">
              <router-link
                class="text-decoration"
                :to="{ name: 'newsdetails', params: { id: news.Id } }"
              >
                <div class="item-img" v-lazy:background-image="imgserver + news.Img"></div>
              </router-link>
            </div>
            <div style="order: 2">
              <el-divider>
                <i class="el-icon-apple"></i>
              </el-divider>
            </div>
            <div class="item-content" :style="'order: ' + (i % 2 == 0 ? 3 : 1)">
              <h3>{{ news.Title }}</h3>
              <p>{{ news.Content }}</p>
              <span>{{ news.CreateTime.slice(0, 10) }}</span>
            </div>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import https from '@/utils/https'
export default {
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      caseList: [],
      newsList: [],
      swiperOption: {
        notNextTick: true, //notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
        direction: 'vertical',
        grabCursor: true,
        setWrapperSize: true,
        autoHeight: true,
        slidesPerView: 1,
        mousewheel: true,
        mousewheelControl: true,
        height: window.innerHeight - 60,
        resistanceRatio: 0,
        observeParents: true
        // https://www.swiper.com.cn/api/index.html SwiperApi
      }
    }
  },
  mounted() {
    Promise.all([https.get('Case/GetCaseAll'), https.get('News/GetNews?type=1&num=3')]).then(
      ([responseCase, responseNews]) => {
        this.caseList = responseCase.data
        this.newsList = responseNews.data
      }
    )
  }
}
</script>

<style lang="scss" scoped>
.swiper-slide {
  font-size: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;

  .page {
    text-align: center;
    height: 100px;
    overflow: hidden;
    h3,
    p {
      font-size: 40px;
      font-weight: 400;
      color: #fff;
    }
  }

  .slogan {
    text-align: center;
    font-size: 50px;
    color: #fff;
    padding: 30px 0;
  }
}
//经典案例
.case-item {
  width: 1100px;
  height: 500px;
  overflow: hidden;
  margin: 0 auto;
  margin-top: 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  li {
    width: 330px;
    height: 250px;
    list-style: none;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    background-origin: content-box;
    margin: 5px;
    position: relative;
    overflow: hidden;

    &:hover {
      .case-item-hover {
        opacity: 1;
        transition: all 0.4s ease-in-out;
      }
    }
  }
}
//经典案例hover
.case-item-hover {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  overflow: hidden;
  background-color: rgba(225, 56, 52, 0.7);
  text-align: center;

  .hover-title {
    height: 50px;
    color: #fff;
    font-size: 18px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-weight: 400;
    margin-top: 20px;
  }
  .bottom {
    border-bottom: 3px solid #fff;
    width: 60px;
    margin: 0 auto;
  }
  .more {
    width: 80px;
    padding: 5px 5px;
    margin: 0 auto;
    margin-top: 100px;
    border: 2px solid #fff;
    span {
      color: #fff;
      font-size: 20px;
    }
  }
}

.slide-one {
  background: url(../assets/img/home_top.jpg) no-repeat center;
  background-size: cover;
}
.slide-two {
  background: url(../assets/img/home_do.jpg) no-repeat center;
  background-size: cover;
}
.slide-three {
  background: url(../assets/img/home_anli.jpg) no-repeat center;
  background-size: cover;
}
//最新资讯
.news-content {
  width: 1240px;
  margin: 0 auto;
  margin-top: 40px;
  display: flex;
  justify-content: center;

  &-item {
    width: 400px;
    display: flex;
    flex-direction: column;

    .item-img {
      width: 360px;
      height: 230px;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
      background-origin: content-box;
      margin: 0 auto;
    }
    .el-divider {
      background-color: #fff;
      height: 3px;
      .el-divider__text {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        padding: 0px;
        color: #fff;
      }
    }
    .item-content {
      width: 360px;
      height: 230px;
      margin: 0 auto;
      //border: 1px solid paleturquoise;
      h3 {
        font-size: 22px;
        height: 30px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      p {
        font-size: 15px;
        height: 80px;
        overflow: hidden;
        margin: 10px 0;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
        white-space: normal !important;
        word-wrap: break-word;
      }
      span {
        display: block;
        font-size: 14px;
        text-align: end;
      }
      h3,
      p,
      span {
        color: #fff;
      }
    }
  }
}
.order {
  order: -1;
}
.order-img {
  order: 1;
}
</style>
