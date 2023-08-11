<template>
  <div>
    <h2>联系我们：</h2>
    <el-card>
      <div class="contact-item" v-for="contact in contacts" :key="contact.name" @click="handleContanc(contact)">
        <el-avatar :size="40" :src="contact.headimgurl" :alt="contact.name" ></el-avatar>
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
import { mapGetters,mapMutations } from 'vuex'

export default {
  components: {
    'el-card': Card,
    'el-avatar': Avatar
  },
  data() {
    return {
      contacts: []
    }
  },
  methods: {
    ...mapGetters(['getSocket']),
    ...mapMutations(['getNewSocket']),
    handleContanc(conn) {
      this.$router.push({
        name: 'chat',
        query: {
          id: conn.id,
          name: conn.name,
          type: conn.type,
          toUserId: conn.user_id
         }
      })
    },
  },
  activated() {
    let Socket = this.getSocket()
    if(!(Socket && Socket.connected)){
      Socket = this.getNewSocket()
    }
    let that = this;
    if(!Socket){
      console.log('socket not ok yet')
    } else {
      console.log('socket ok ... ')
      Socket.emit("init info")
      Socket.on("init info",(list) => {
        that.contacts = list
      })
    }
    
  },
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
.el-card{
  border:none;
}

/* 可以根据你的需要自定义样式 */
</style>