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
          <div class="grid-content bg-purple-light goodslist">
            商品列表
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
        categories: [
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
      }
    },
    computed: {
      filteredProducts() {
        if (this.activeCategory) {
          return this.products.filter(product => product.category === this.activeCategory);
        }
        return this.products;
      },
    },
    methods: {
      handleCategorySelect(category) {
        this.activeCategory = category;
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

  .groupandgoods-cont{
    /* height: 100%; */
  }
  .goods-list-cont {
    /* height: 100%; */
  }
  .banner {
    height: 150px;
  }
  .groupslist {
    height: 100%;
  }
  .goodslist {
    height: 100%;
  }
</style>