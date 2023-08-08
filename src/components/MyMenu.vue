<template>
  <div class="footer-menu" v-if="isMobile">
    <el-row :gutter="0">
      <el-col
        v-for="(item, index) in menuList"
        :key="index"
        :span="6"
      >
        <div @click="jump_to(item.path)" :class="item.path === $route.path ? 'active' : ''">
          <i :class="'el-icon-' + item.icon"></i>
          <span>{{ item.title }}</span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isMobile: true, // 是否为移动设备
        menuList: [ // 移动端菜单
          {
            title: '商品',
            path: '/goods',
            // icon: 's-goods', // Element UI 图标名称
          },
          {
            title: '购物车',
            path: '/cart',
            // icon: 's-list',
          },
          {
            title: '我的订单',
            path: '/orders',
            // icon: 'el-icon-tickts',
          },
          {
            title: '联系我们',
            path: '/aftersale',
            // icon: 'el-icon-tickts',
          }
        ],
      };
    },
    mounted() {
      this.checkIsMobile();
      window.addEventListener('resize', this.checkIsMobile);
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.checkIsMobile);
    },
    methods: {
      // 检测是否为移动设备
      checkIsMobile() {
        this.isMobile = window.innerWidth < 10000;
      },
      jump_to(path) {
        // console.log('-------- jump to  ', path)
        this.$router.push({ path })
      },
    },
  };
</script>

<style scoped>
/* 移动端底部菜单样式 */
.footer-menu {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
  background-color: #000;
  color: #fff;
}

.footer-menu .el-row {
  height: 100%;
  padding: 10px;
}

.footer-menu .el-row .el-col {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.footer-menu .el-row .el-col div {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.footer-menu .el-row .el-col div i {
  font-size: 20px;
  margin-bottom: 3px;
}

.footer-menu .el-row .el-col div span {
  font-size: 12px;
}

.footer-menu .el-row .el-col div.active {
  color: #f00;
}

.footer-menu .el-row .el-col div.active i {
  color: #f00;
}
</style>