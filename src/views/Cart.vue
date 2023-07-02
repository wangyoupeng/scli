<template>
  <div>
    <!-- <el-dialog :title="'购物车（'+cartItemNumber+'件）'" :visible.sync="cartDialogVisible" width="100%"> -->
      <el-table :data="cartList" key="slot" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="name" label="商品名称"></el-table-column>
        <el-table-column prop="price" label="单价"></el-table-column>
        <el-table-column prop="quantity" label="数量" text-align="center" width="120">
          <template slot-scope="scope">
            <div class="quantity-container">
            <el-button @click="handleDecrease(scope.row)" size="mini">-</el-button>
            <span class="quantity">{{ scope.row.quantity }}</span>
            <el-button @click="handleIncrease(scope.row)" size="mini">+</el-button>
          </div>
          </template>
        </el-table-column>
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
      cartList: [{amount: 0}], // 购物车列表数据
      cartItemNumber: 0, // 购物车商品数量
      cartTotalPrice: 0, // 购物车总价
      cartDialogVisible: true, // 购物车对话框是否可见
    };
  },
  // mounted() {
  //   this.$nextTick(() => {
  //     this.tableData.forEach(row => {
  //       this.$refs.table.toggleRowSelection(row, true);
  //     });
  //   });
  // },
  activated() {
    // this.methods.handleSearch()
    console.log("aaaa")
    this.reloadPage()
  },
  methods: {
    handleSelectionChange(selection) {
      this.selectedRows = selection;
    },
    handleDecrease(row) {
      console.log('row --', row)
      if (row.quantity > 0) {
        row.quantity--;
        this.$axios.post('/appapi/cart/dec',{goods_id: row.id} )
        .then(() => {
        })
        .catch(error => {
          console.log('xxxxx error::',error);
        });
      }
    },
    handleIncrease(row) {
      console.log('row ++', row)
      row.quantity++;
      this.$axios.post('/appapi/cart/inc',{goods_id: row.id} )
      .then(() => {
      })
      .catch(error => {
        console.log('xxxxx error::',error);
      });
      
    },
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
      if(this.selectedRows.length < 1){
        this.$message.success('请选择商品 。。。')
        return;
      } 
      let list = this.selectedRows.map((item) => {
        return {goods_id: item.id, amount: item.quantity}
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
    },
    
  }
};

</script>


<style scoped>

.quantity-container {
  display: flex;
  align-items: center;
}

.quantity {
  margin: 0 10px;
}

.float-right {
  float: right;
}

.el-button--primary {
  background-color: blue;
  border-color: blue;
}
</style>