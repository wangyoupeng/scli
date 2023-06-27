<template>
  <div>
    <el-table :data="orderList" style="width: 100%">
      <el-table-column prop="id" label="订单编号"></el-table-column>
      <el-table-column prop="date" label="下单日期"></el-table-column>
      <el-table-column label="商品列表">
        <template slot-scope="{ row }">
          <el-tag v-for="product in row.products" :key="product.id" closable type="info">
            {{ product.name }} x {{ product.quantity }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="totalPrice" label="订单总价"></el-table-column>
    </el-table>
    <el-pagination
      :page-size="pageSize"
      :total="orderList.length"
      :current-page.sync="currentPage"
      layout="total, sizes, prev, pager, next, jumper"
      :page-sizes="[10, 20, 50]"
    />
  </div>
</template>

<style>
/* 订单列表 */
.el-table__header tr th {
  background-color: #f5f5f5;
}
.el-tag {
  margin-right: 5px;
}

/* 分页控件 */
.el-pagination {
  text-align: right;
}
.el-pagination__total {
  margin-right: 20px;
}
</style>

<script>
export default {
  data() {
    return {
      orderList: [
        //订单列表数据
      ],
      pageSize: 10, // 分页大小
      currentPage: 1, // 当前页码
    };
  },
};
</script>