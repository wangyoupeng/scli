<template>
  <div>
    <el-button @click="showCartDialog">{{ cartItemNumber }} 件商品 | ¥ {{ cartTotalPrice }}</el-button>
    <el-dialog :title="'购物车（'+cartItemNumber+'件）'" :visible.sync="cartDialogVisible" width="50%">
      <el-table :data="cartList" style="width: 100%">
        <el-table-column prop="name" label="商品名称"></el-table-column>
        <el-table-column prop="price" label="单价"></el-table-column>
        <el-table-column prop="quantity" label="数量"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="{ row }">
            <el-button type="danger" size="small" @click="removeItem(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cartList: [], // 购物车列表数据
      cartItemNumber: 0, // 购物车商品数量
      cartTotalPrice: 0, // 购物车总价
      cartDialogVisible: false, // 购物车对话框是否可见
    };
  },
  methods: {
    showCartDialog() {
      // 显示购物车对话框的逻辑
      this.cartDialogVisible = true;
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
    removeItem(item) {
      // 删除购物车中某个商品的逻辑
      const index = this.cartList.findIndex((cartItem) => cartItem.id === item.id);
      if (index === -1) {
        return;
      }
      if (this.cartList[index].quantity <= 1) {
        this.cartList.splice(index, 1);
      } else {
        this.cartList[index].quantity--;
      }
      this.cartItemNumber--;
      this.cartTotalPrice -= item.price;
    },
  },
};
</script>