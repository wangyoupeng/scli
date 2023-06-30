<template>
  <div>
    <el-button @click="showCartDialog">总计： {{ cartItemNumber }} 件商品 | ¥ {{ cartTotalPrice }}</el-button>
    <!-- <el-dialog :title="'购物车（'+cartItemNumber+'件）'" :visible.sync="cartDialogVisible" width="100%"> -->
      <el-table :data="cartList" key="slot" style="width: 100%">
        <el-table-column prop="name" label="商品名称"></el-table-column>
        <el-table-column prop="price" label="单价"></el-table-column>
        <el-table-column prop="quantity" label="数量"></el-table-column>
        <el-table-column label="操作">
          <template  slot-scope="{ row }">
            <el-button type="danger" size="small" @click="removeItem( row )">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    <!-- </el-dialog> -->
    <el-button type="primary" class="float-right" @click="careateOrder(data)">去下单</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cartList: [], // 购物车列表数据
      cartItemNumber: 0, // 购物车商品数量
      cartTotalPrice: 0, // 购物车总价
      cartDialogVisible: true, // 购物车对话框是否可见
    };
  },
  activated() {
    // this.methods.handleSearch()
    // console.log("aaaa")
    this.reloadPage()
  },
  methods: {
    showCartDialog() {
      // 显示购物车对话框的逻辑
      if(this.cartList.length > 0){
        this.cartDialogVisible = true;
      }
    },
    reloadPage(){
      const params = { user_id: 10000 }
        this.$axios.get('/appapi/cart/list',params )
          .then(res => {
            this.cartList = res.data.list;
            this.cartItemNumber = res.data.list.length
            this.cartTotalPrice = 888
            // this.total = res.data.total;
          })
          .catch(error => {
            console.error("errorrrr:::: ", error);
          });
    },
    addItem(item) {
      // 向购物车添加商品的逻辑
      const index = this.cartList.findIndex((cartItem) => cartItem.id === item.id);
      if (index === -1) {
        this.cartList.push({ ...item, quantity: 1 });
      } else {
        this.cartList[index].quantity++;
      }
      this.cartItemNumber++;
      this.cartTotalPrice += item.price;
    },
    removeItem(itemObj) {
      // 删除购物车中某个商品的逻辑
      let goods_id = itemObj.goods_id
      // const params = { goods_id }
      this.$axios.post('/appapi/cart/goodsdel',{goods_id} )
      .then(() => {
        this.$message.success('添加成功')

        this.reloadPage()
      })
      .catch(error => {
        console.log('xxxxx error::',error);
      });
    },
    careateOrder(){
      let list = this.cartList.map((item) => {
        return {goods_id: item.goods_id, amount: item.amount}
      })
      const params = { list, user_id: 10000 }
      this.$axios.post('/appapi/orders/new',params)
        .then(() => {
          // this.goodsList = res.data.list;
          // this.total = res.data.total;
          // console.log('------------ order/new: ', res.data)
          this.$message.success('下单成功')
          this.reloadPage()
        })
        .catch(error => {
          error
          // console.log("errorrrr:::: ", error);

        });
    }
  }
};

</script>


<style scoped>
.float-right {
  float: right;
}

.el-button--primary {
  background-color: blue;
  border-color: blue;
}
</style>