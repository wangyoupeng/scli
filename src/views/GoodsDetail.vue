<template>
  <div class="product-detail">
    <div class="product-image">
      <img :src="product.image" alt="Product Image" />
    </div>
    <div class="product-info">
      <div class="product-price">{{ product.price }} ¥</div>
      <div class="product-title">{{ product.name }}</div>
      <div class="product-options">
        <div class="option-row">
          <div class="option-label">颜色：</div>
          <el-radio-group v-model="selectedProduct.color">
            <el-radio :label="color.value" v-for="color in product.colors" :key="color.id">
              {{ color.name }}
            </el-radio>
          </el-radio-group>
        </div>
        <div class="option-row">
          <div class="option-label">尺寸：</div>
          <el-radio-group v-model="selectedProduct.size">
            <el-radio :label="size.value" v-for="size in product.sizes" :key="size.id">
              {{ size.name }}
            </el-radio>
          </el-radio-group>
        </div>
      </div>
      <div class="product-actions">
        <el-button type="primary" @click="addToCart">加入购物车</el-button>
        <el-button @click="buyNow">立即购买</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      product: {
        name: '商品名称',
        price: '22.00',
        image: 'http://localhost:3000/api/images/1688966661775_gaifan.png',
        sizes: [
          { id: 1, name: 'S', value: 'S' },
          { id: 2, name: 'M', value: 'M' },
          { id: 3, name: 'L', value: 'L' }
        ],
        colors: [
          { id: 1, name: '红色', value: 'red' },
          { id: 2, name: '蓝色', value: 'blue' },
          { id: 3, name: '绿色', value: 'green' }
        ]
      },
      selectedProduct: {
        size: '',
        color: ''
      }
    };
  },
  methods: {
    addToCart() {
      // 执行加入购物车操作
    },
    buyNow() {
      // 执行立即购买操作
    }
  }
};
</script>

<style>
.product-detail {
  /* display: flex; */
  align-items: flex-start;
}

.product-image {
  width: 100%;
  margin-right: 20px;
  border-radius:10px;
}

.product-image img {
  width: 100%;
  height: auto;
}

.product-info {
  width: 100%;
}

.product-price {
  font-size: 20px;
  font-weight: bold;
  color:red;
  margin-bottom: 10px;
  /* text-align:center; */
}

.product-title {
  font-size: 18px;
  margin-bottom: 10px;
  /* text-align:center; */
}

.product-options {
  margin-bottom: 10px;
}

.option-row {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.option-label {
  width: 80px;
}

.product-actions {
  margin-top: 20px;
}
</style>