<template>
  <div class="goods-list-cont">
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark banner">
          <Banner />
        </div>
      </el-col>
    </el-row>
    <el-row>
      <div class="groupandgoods-cont">
        <el-col :span="5">
          <div class="grid-content bg-purple groupslist">
            <el-menu
              :default-active="activeCategory"
              @select="handleCategorySelect"
              style="width: 100%;"
            >
              <el-menu-item style="padding:0px;"
                v-for="(category, index) in categories"
                :key="index"
                :index="category.value"
              >
                {{ category.label }}
              </el-menu-item>
            </el-menu>
          </div>
        </el-col>
        <el-col :span="19">
          <div class="grid-content bg-purple-light goods-list">
            <div class="goods-item" v-for="(item, index) in goodsList" :key="index">
              <el-row style="margin: 10px 5px;">
                <el-col :span="11">
                  <div class="goods-img">
                    <img :src="item.imageUrl"  @error="handleImageError" />
                  </div>
                </el-col>
                <el-col :span="13">
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
        </el-col>
      </div>
      
    </el-row>
  </div>
  
</template>

<script>
  import Banner from '@/components/Banner.vue';
  export default {
    components: {
      Banner,
    },
    data(){
      return {
        activeCategory: '',
        defaultImageSrc: 'http://localhost:3000/images/1689233971863_defaultimg.png',
        categories: [
          { label: '全部', value: 'all' },
          { label: '分类1', value: 'category1' },
          { label: '分类2', value: 'category2' },
          { label: '分类3', value: 'category3' },
          { label: '分类4', value: 'category4' },
          { label: '分类5', value: 'category5' },
          { label: '分类6', value: 'category6' },
          { label: '分类7', value: 'category7' },
          { label: '分类8', value: 'category8' },
          { label: '分类9', value: 'category9' },
          { label: '分类10', value: 'category10' },
        ],
        goodsList: [],
      }
    },
    created(){

    },
    computed: {
      filteredProducts() {
        if (this.activeCategory) {
          return this.products.filter(product => product.category === this.activeCategory);
        }
        return this.products;
      },
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
      handleCategorySelect(category) {
        this.activeCategory = category;
      },
      addToCart(item) {
      // 将商品添加到购物车中
      // console.log('-------- add to cart:', item)
      const params = { goods_id: item.id, amount: 1, user_id: 10000 }
      this.$axios.post('/appapi/cart/add',params)
        .then(res => {
          res
          this.$message.success('添加成功')
        })
        .catch(error => {
          error
        });
      },
      handleImageError(event) {
        event.target.src = this.defaultImageSrc; // 将默认图片的 URL 赋给 src 属性
      },
    },

  }
</script>

<style>
  .el-row {
    margin-bottom: 20px;
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .banner {
    height: 150px;
  }

  .el-menu-item:focus {
    background-color: #e5e9f2; /* 修改选中时的背景颜色 */
  }

  .groupslist {
    height: 100%;
  }
  .goods-list {
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0px 5px;
  }
  .goods-item {
    width: 99%;
    margin: 5px 0px;
    box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
    background-color: #fff;
    overflow: hidden;

    border-radius: 10px;  /* 添加圆角效果，数字可以根据需要进行调整 */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);  /* 添加阴影效果，可以根据需要进行调整 */
  }
  .goods-img {
    max-width: 100%;
    height: auto;
    overflow: hidden;

    border-radius: 10px;
  }
  .goods-img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .goods-info {
    width:90%;
    height: 10px;
    padding:10px;
    font-weight: bold;
    position: relative;
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
  .el-carousel__container {
    height:150px;
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