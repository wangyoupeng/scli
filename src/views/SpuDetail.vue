<template>
  <div class="product-detail">
    <div class="product-image">
      <img :src="sku_image" alt="Product Image" />
    </div>
    <div class="product-info">
      <div class="product-price">价格 ：{{ sku_price }} ¥</div>
      <div class="product-title">库存 ：{{ sku_stock }}</div>
      <div class="product-title">名称 ：{{ sku_name }}</div>

      <div class="product-options" 
        v-for="(attItem, index) in spuItem.attributes"
        :key="`${attItem.id}`"
        :index="`${attItem.id}`">
        <div class="option-row">
          <div class="option-label">{{ attItem.name }}</div>
          <el-radio-group v-model="selectedValues[index]">
            <el-radio :label="opt.id" v-for="opt in attItem.options" :key="opt.id">
              {{ opt.name }}
            </el-radio>
          </el-radio-group>
        </div>
      </div>
      <div class="product-actions">
        <el-button type="primary" @click="addToCart">加入购物车</el-button>
        <!-- <el-button @click="buyNow">立即购买</el-button> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      spuItem: {},
        // name: '商品名称',
        // price: '22.00',
        // image: 'http://localhost:3000/api/images/1688966661775_gaifan.png',
        // attributes: [
        //   {
        //     id: 111,
        //     name: '颜色',
        //     options: [
        //       { id: 1, name: '红色', value: 'red' },
        //       { id: 2, name: '蓝色', value: 'blue' },
        //       { id: 3, name: '绿色', value: 'green' }
        //     ],
        //     selected: 1,
        //   }
        // ],
      
      skuList:[],
        // {
        //   id: 1111,
        //   spu_id:"",
        //   image: 'http://localhost:3000/api/images/1688966661775_gaifan.png',
        //   name: "sku1",
        //   price: 1100,
        //   stock: 55,
        //   attribute_value_ids:[10001,10004]
        // },
      
      selectd_sku_index: 0,

      selectedValues: [] // 用于存储每个组选中值的数组 opt
    };
  },
  create(){
      
  },
  methods: {
    addToCart() {
      // 将商品添加到购物车中
      let item = this.skuList[this.selectd_sku_index]
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
    buyNow() {
      // 执行立即购买操作
    }
  },
  activated() {
    let spuItem = this.$route.params.spuItem || {id:10004};
    this.$axios.get('/appapi/spus/detail',{ params:{spu_id: spuItem.id} })
    .then(res => {
      this.spuItem = res.data.item;
      this.skuList = res.data.skuList;
      this.selectedValues = res.data.item.attributes.map(i=>i.options[0]?i.options[0].id:"")
    })
    .catch(error => {
      error
      // console.log("errorrrr:::: ", error);
    });
  },
  computed: {
    computedSelectedValues() {
      return this.selectedValues;
    },
    sku_name(){
      return this.skuList[this.selectd_sku_index]?this.skuList[this.selectd_sku_index].name : ""
    },
    sku_price(){
      return  (this.skuList[this.selectd_sku_index]?this.skuList[this.selectd_sku_index].price / 100 : 0).toFixed(2)
    },
    sku_stock(){
      return this.skuList[this.selectd_sku_index]?this.skuList[this.selectd_sku_index].stock:0
    },
    sku_image(){
      return this.skuList[this.selectd_sku_index]?this.skuList[this.selectd_sku_index].image :''
    }
  },
  watch: {
    computedSelectedValues: {
      handler(newValues) {
        console.log('选中值发生变化:', newValues);
        // 在这里可以执行你想要的操作, 如触发其他函数或进行其他逻辑处理
        let selectd_sku_index = 0;
        for(let i = 0; i <this.skuList.length; i++){
          let skuItem = this.skuList[i]
          if(newValues.every(item => skuItem.attribute_value_ids.includes(item))){
            selectd_sku_index = i
            break;
          }
        }
        this.selectd_sku_index = selectd_sku_index;

      },
      deep: true
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
  min-height:300px;
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
  margin-top: 50px;
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}
</style>