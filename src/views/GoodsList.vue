<template>
  <div class="goods-list">
    <div class="goods-item" v-for="(item, index) in goodsList" :key="index">
      <div class="goods-img">
        <img :src="item.imageUrl" />
      </div>
      <div class="goods-info">
        <div class="goods-name">{{ item.name }}</div>
        <div class="goods-price">{{ (item.price / 100).toFixed(2) }} ¥ </div>
        <div class="goods-stock">{{ item.stock }} 件</div>
        <div class="goods-add" @click="addToCart(item)">
          <span>加入购物车</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      goodsList: [
        {
          id: 1,
          name: '商品一',
          price: '10元',
          src: 'https://placehold.it/150x150',
        },
        {
          id: 2,
          name: '商品二',
          price: '20元',
          src: 'https://placehold.it/150x150',
        },
        {
          id: 3,
          name: '商品三',
          price: '30元',
          src: 'https://placehold.it/150x150',
        },
      ],
    };
  },
  created() {
    // this.methods.handleSearch()
    const params = { }
    this.$axios.get('/appapi/goods',{ params })
      .then(res => {
        this.goodsList = res.data.list;
        this.total = res.data.total;
        console.log('------------ this: ', res)
      })
      .catch(error => {
        console.log("errorrrr:::: ", error);
      });
  },
  methods: {
    addToCart(item) {
      // 将商品添加到购物车中
      this.$emit('add-to-cart', item);
    },
  },
};
</script>

<style scoped>
  .goods-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 10px 20px;
  }
  .goods-item {
    width: 48%;
    margin-bottom: 20px;
    box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
    background-color: #fff;
    overflow: hidden;
  }
  .goods-img {
    height: 150px;
    overflow: hidden;
  }
  .goods-img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .goods-info {
    padding: 10px;
    font-weight: bold;
  }
  .goods-name {
    font-size: 16px;
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
  }
  .goods-price {
    font-size: 14px;
    color: red;
    margin-bottom: 10px;
    float: left;
  }
  .goods-stock {
    font-size: 14px;
    color: blue;
    margin-bottom: 10px;
    float: right;
  }
  .goods-add {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 30px;
    background-color: #f0f0f0;
    cursor: pointer;
  }
  .goods-add:hover {
    background-color: #e0e0e0;
  }
</style>

