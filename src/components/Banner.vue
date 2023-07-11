<template>
  <div class="carousel-container">
    <el-carousel :interval="3000" arrow="always" class="banner-container">
      <el-carousel-item v-for="(item, index) in carouselItems" :key="index" class="image-container">
        <img :src="item.image" alt="carousel image" class="carousel-image">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      carouselItems: [
        {
          image: 'http://localhost:3000/images/1689057710177_%E9%9D%A2%E6%9D%A1.png',
        },
        {
          image: 'http://localhost:3000/images/1689057782271_%E7%83%A4%E4%B8%B2.png',
        },
        {
          image: 'http://localhost:3000/images/1689057805311_%E7%BA%A2%E7%83%A7%E8%82%89.png',
        },
      ],
    };
  },
};
</script>

<style scoped>
.carousel-container {
  max-width: 100%;
  height:150px;
  margin: 0 auto;
}
.banner-container {
  max-width: 100%;
  max-height: 150px;
}
.image-container {
  max-width: 100%;
  max-height: 150px;
  margin: 0 0;
}
.carousel-image {
  width: 100%;
  max-height: 100%;
}
</style>