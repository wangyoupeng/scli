<template>
  <div >
    <el-table :data="cartList" key="slot" style="width: 100%;height:90%" @selection-change="handleSelectionChange" v-if="cartList && cartList.length>0">
      <el-table-column type="selection" width="30%"></el-table-column>
      <el-table-column prop="imageUrl" label="图片" width="100%">
        <template slot-scope="{ row }">
          <div class="goods-img">
            <img :src="row.imageUrl" @error="handleImageError"/>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="商品名称" width="60%"></el-table-column>
      <el-table-column prop="price" label="单价" width="50%">
        <template slot-scope="{ row }">
          {{ formatPrice(row.price) }}
        </template>
      </el-table-column>
      <el-table-column prop="amount" label="数量" text-align="center" width="120%">
        <template slot-scope="scope">
          <div class="amount-container">
          <el-button @click="handleDecrease(scope.row)" size="mini">-</el-button>
          <span class="amount">{{ scope.row.amount }}</span>
          <el-button @click="handleIncrease(scope.row)" size="mini">+</el-button>
        </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100%">
        <template  slot-scope="{ row }">
          <el-button type="danger" size="small" @click="removeItem( row )">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <template >
      <div class="total" v-if="cartList && cartList.length>0">
        <template >
          已选择 {{ cartItemNumber }} 件  共: {{ formatPrice(cartTotalPrice) }} ¥
        </template>
        <el-button type="primary" class="float-right" @click="careateOrder(data)">去下单</el-button>
      </div>
    </template>
    <template >
        <el-card v-if="cartList && cartList.length<1" class="no_goods_parent">
          <img src="http://localhost:3000/images/1689232101029_konggouwuche.png">
          <div>
            <p>购物车为空</p>
            <el-button @click="jump_to('/goods')" type="primary">...去逛逛...</el-button>
          </div>
        </el-card>
        
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // {
      //   id: item.goods_id,
      //   name: item.name,
      //   amount: item.amount,
      //   imageUrl : item.image_url,
      //   price: item.price
      // }
      defaultImageSrc: 'http://localhost:3000/images/1689233971863_defaultimg.png',
      cartList: [], // 购物车列表数据
      selectedRows: [],
      cartItemNumber: 0, // 购物车商品数量
      cartTotalPrice: 0, // 购物车总价
    };
  },
  mounted() {
    // this.selectedRows = this.cartList.map((i) => i);
    
  },
  activated() {
    // this.methods.handleSearch()
    console.log("aaaa")
    this.reloadPage()
  },
  methods: {
    handleSelectionChange(val) {
      // this.multipleSelection = val;
      // console.log("---------- val::", val)

      this.selectedRows = val
      this.sumTotal(val)
    },
    sumTotal(list = []){
      this.cartItemNumber = list.length
      let total = 0
      list.map((i)=>{total += i.price * i.amount})
      this.cartTotalPrice = total
    },
    handleDecrease(row) {
      if (row.amount > 1) {
        let that = this;
        this.$axios.post('/appapi/cart/dec',{goods_id: row.id} )
        .then((res) => {
          if(res && res.status == 200){
            row.amount--;
            let fList = that.selectedRows.filter(i=>i.id==row.id)
            if(fList.length > 0){
              let newSlectRows = that.selectedRows.filter(i => (i.id != row.id))
              newSlectRows.push(row)
              that.selectedRows = newSlectRows
              that.sumTotal(newSlectRows)
            }
          }
        })
        .catch(() => {
          that.$message.error('太频繁了,稍后尝试 ..')
        });
      }
    },
    handleIncrease(row) {
      let that = this
      this.$axios.post('/appapi/cart/inc',{goods_id: row.id} )
      .then((res) => {
        if(res && res.status == 200){
          row.amount++;
          let fList = that.selectedRows.filter(i=>i.id==row.id)
          if(fList.length > 0){
            let newSlectRows = that.selectedRows.filter(i => (i.id != row.id))
            newSlectRows.push(row)
            that.selectedRows = newSlectRows
            that.sumTotal(newSlectRows)
          }
        }
      })
      .catch(() => {
        that.$message.error('太频繁了,稍后尝试 ..')
      });
      
    },
    reloadPage(){
      const params = { user_id: 10000 }
      this.$axios.get('/appapi/cart/list',params )
        .then(res => {
          // console.log("-------------- 000 res::", res)
          this.cartList = res.data.list;
          // this.cartItemNumber = res.data.list.length
          this.sumTotal()
        })
        .catch(error => {
          console.error("errorrrr:::: ", error);
        });
    },
    addItem(item) {
      // 向购物车添加商品的逻辑
      const index = this.cartList.findIndex((cartItem) => cartItem.id === item.id);
      if (index === -1) {
        this.cartList.push({ ...item, amount: 1 });
      } else {
        this.cartList[index].amount++;
      }
      this.cartItemNumber++;
      this.cartTotalPrice += item.price*item.amount;
    },
    removeItem(itemObj) {
      // 删除购物车中某个商品的逻辑
      let id = itemObj.id
      this.$axios.post('/appapi/cart/goodsdel',{goods_id: id} )
      .then(() => {
        this.$message.success('删除成功')
        this.cartList = this.cartList.filter(i => i.id != id)
        this.selectedRows = this.selectedRows.filter(i => i.id != id)
        this.sumTotal(this.selectedRows)
      })
      .catch(error => {
        console.log('xxxxx error::',error);
      });
    },
    careateOrder(){
      if(this.selectedRows.length < 1){
        alert('请选择商品 ...')
        return;
      } 
      let list = this.selectedRows.map((item) => {
        return {goods_id: item.id, amount: item.amount}
      })
      const params = { list, user_id: 10000 }
      this.$axios.post('/appapi/orders/new',params)
        .then(() => {
          this.$message.success('下单成功')
          // this.reloadPage()
          this.$router.push("/orders")
        })
        .catch(error => {
          error
          // console.log("errorrrr:::: ", error);

        });
    },
    formatPrice(price) { // 分转元
      return (price / 100).toFixed(2)
    },
    jump_to(path) {
      // console.log('-------- jump to  ', path)
      this.$router.push({ path })
    },
    handleImageError(events){
      events.target.src = this.defaultImageSrc; // 将默认图片的 URL 赋给 src 属性
    }

    
  }
};
</script>


<style scoped>
.total{
  margin-top:30px;
  margin-bottom:60px;
}
.amount-container {
  display: flex;
  align-items: center;
}

.amount {
  margin: 0 5px;
}

.float-right {
  float: right;
}

.el-button--primary {
  background-color: blue;
  border-color: blue;
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

  .no_goods_parent {
    display: flex;
    justify-content: center;
    align-items: center;
    /* 设置父元素的宽高等样式 */
    width: 100%;
    height: auto;
    text-align: center;
    border:0px;
  }


</style>