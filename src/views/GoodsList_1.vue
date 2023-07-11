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
            分类
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
    }
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