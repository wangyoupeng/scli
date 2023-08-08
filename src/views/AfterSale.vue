<template>
  <div>
    <h2>联系我们：</h2>
    <el-card>
      <div class="contact-item" v-for="contact in contacts" :key="contact.id" @click="handleContanc(contact)">
        <el-avatar :size="40" :src="contact.avatar" :alt="contact.name" ></el-avatar>
        <div class="contact-info">
          <h3>{{ contact.name }}</h3>
          <p>{{ contact.message }}</p>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { Card, Avatar } from 'element-ui';

export default {
  components: {
    'el-card': Card,
    'el-avatar': Avatar
  },
  data() {
    return {
      contacts: [
        { id: 1, name: '北京服务群', avatar: 'https://example.com/avatar1.jpg', message: '欢迎群聊沟通' },
        { id: 2, name: '河北服务群', avatar: 'https://example.com/avatar2.jpg', message: '欢迎群聊沟通' },
        { id: 3, name: 'Tom-专属客服', avatar: 'https://example.com/avatar3.jpg', message: 'just contact me!' },
        { id: 4, name: 'Tina-专属客服', avatar: 'https://example.com/avatar3.jpg', message: 'See you at the party!' },
        { id: 5, name: 'keven-专属客服', avatar: 'https://example.com/avatar3.jpg', message: 'See you at the party!' },
        // 其他通讯录联系人
      ]
    }
  },
  methods: {
    handleContanc(conn) {
      this.$router.push({
        name: 'chat',
        query: {
          conn_id: conn.id,
          name: conn.name
         }
      })
    },
  }
}
</script>

<style>
/* 导入 Element UI 样式文件 */
.el-card__body {
  margin-bottom: 60px;
  overflow-y:scroll;
}
.contact-item {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

.el-avatar {
  margin-right: 16px;
}

/* 可以根据你的需要自定义样式 */
</style>