<template>
  <div class="mobile-layout">
    <el-container>
      <!-- 主内容区域 -->
      <el-main style="padding:0%">
        <!-- 你的内容放在这里 -->
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </el-main>
      
      <!-- 底部菜单区域 -->
      <el-footer style="position: fixed; bottom: 0; left: 0; right: 0;">
        <MyMenu></MyMenu>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import MyMenu from "./components/MyMenu.vue";

export default {
  components: {
    "MyMenu": MyMenu,
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.mobile-layout {
  height: 100%;
}
.main-el-footer {
  height:100px;
}
</style>