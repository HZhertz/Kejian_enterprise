<template>
  <div class="banner">
    <div class="mm"></div>
    <div class="banner-img">
      <img :src="img" />
    </div>
    <div class="banner-title">
      <p>{{ title }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    img: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.banner {
  width: 100%;
  height: 480px;
  display: flex;
  position: relative;
  overflow: hidden;
  background-color: #fff;

  .mm {
    position: absolute;
    width: 100%;
    height: 100%;
    padding: 10px;
    margin: -10px;
    filter: blur(10px);
    background-image: url(../assets/img/bgtop.jpg);
    background-position: center;
    background-size: 100%;
  }

  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
  }

  &-title {
    position: absolute;
    color: #fff;
    font-size: 45px;
    font-weight: 400;
    line-height: 500px;
    text-align: center;
    width: 100%;
  }
}
</style>
