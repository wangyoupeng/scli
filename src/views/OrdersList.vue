<template>
  <div style="padding-bottom: 50px;">
    <el-table :data="orderList" style="width: 100%">
      <el-table-column prop="id" label="订单编号" style="width: 100%"></el-table-column>
      <el-table-column prop="created_at" label="下单时间"></el-table-column>
      <el-table-column label="订单列表">
        <template slot-scope="{ row }">
          <el-tag v-for="product in row.orderItems" :key="product.id" type="info">
            {{ product.goods_name }} x {{ product.amount }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="price" label="订单总价">
        <template slot-scope="{ row }">
          {{ formatPrice(row.price) }}
        </template>
      </el-table-column>
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
        {
          id: 11,
          date: "",
          price: 232,
          orderItems:[{
            id: 3233,
            name:'矿泉水',
            amount: 2,
          },{
            id: 3234,
            name:'矿泉水',
            amount: 2,
          },{
            id: 3235,
            name:'矿泉水',
            amount: 2,
          }]
        }
      ],
      pageSize: 10, // 分页大小
      currentPage: 1, // 当前页码
    };
  },
  activated() {
    // this.methods.handleSearch()
    this.reloadPage()
  },
  methods: {
    reloadPage(){
      const params = { user_id: 10000 }
        this.$axios.get('/appapi/orders/list',params )
          .then(res => {
            this.orderList = res.data.list;
            // alert(res.data.list.length)
          })
          .catch(error => {
            console.error("errorrrr:::: ", error);
          });
    },
    formatPrice(price) { // 分转元
      return (price / 100).toFixed(2)
    },
  },
  
};
</script>