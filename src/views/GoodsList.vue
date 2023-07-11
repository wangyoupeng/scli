<template>
  <div>
    <Banner />
    <div class="goods-list">
    <div class="goods-item" v-for="(item, index) in goodsList" :key="index">
      <el-row>
        <el-col :span="12">
          <div class="goods-img">
            <img :src="item.imageUrl" />
          </div>
        </el-col>
        <el-col :span="12">
          <div class="goods-info">
            <div class="goods-name">{{ item.name }}</div>
            <div class="goods-price">{{ (item.price / 100).toFixed(2) }} ¥ </div>
            <div class="goods-stock">{{ item.stock }} 件</div>
            <div class="goods-add" @click="addToCart(item)">
              <span>加入购物车</span>
            </div>
          </div>
        </el-col>
      </el-row>
      
      
    </div>
  </div>
  </div>
  
</template>

<script>
import Banner from '@/components/Banner.vue';
export default {
  components: {
    Banner,
  },
  data() {
    return {
      goodsList: [],
    };
  },
  created(){

  },
  activated() {
    // this.methods.handleSearch()
    const params = { }
    this.$axios.get('/appapi/goods',{ params })
      .then(res => {
        this.goodsList = res.data.list;
        this.total = res.data.total;
      })
      .catch(error => {
        error
        // console.log("errorrrr:::: ", error);
      });
  },
  methods: {
    addToCart(item) {
      // 将商品添加到购物车中
      // console.log('-------- add to cart:', item)
      const params = { goods_id: item.id, amount: 1, user_id: 10000 }
      this.$axios.post('/appapi/cart/add',params)
        .then(res => {
          res
          // this.goodsList = res.data.list;
          // this.total = res.data.total;
          // console.log('------------ this: ', res.data)
          this.$message.success('添加成功')
        })
        .catch(error => {
          error
          // console.log("errorrrr:::: ", error);
        });
      },
  },
};
</script>

<style scoped>
  .goods-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 150px;
    padding: 10px 20px;
  }
  .goods-item {
    width: 99%;
    margin-bottom: 20px;
    box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
    background-color: #fff;
    overflow: hidden;
  }
  .goods-img {
    height: 150px;
    width: 100%;
    overflow: hidden;
  }
  .goods-img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .goods-info {
    width:49%;
    /* padding: 2px; */
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

