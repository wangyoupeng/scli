<template>
  <div class="chat">
    <div style="display: flex;">
      
      <div style="width:95%">
        <h3 style="text-align: center;margin-top:10px">{{ this.$route.query.name }}</h3>
      </div>
      <div style="text-align:right; width:5%">
        <el-button class="close-btn" type="text" icon="el-icon-close" @click="closePage"></el-button>
      </div>
    </div>
    
    <div class="chat-container" ref="chatContainer">
      <ul class="chat-messages">
        <li v-for="(message, index) in messages" :key="index" class="chat-message">
          <div v-if="message.send" class="message_content_send">
            <div class="message_content_send_left">
                <cite class = "web__main-user_cite">
                  <i style="padding-left: 15px;font-style: normal;">{{ message.datetime || "message.datetime" }}</i>
                </cite>
              <div class="text">{{ message.text }}</div> 
            </div>

            <div class="message_content_send_right">
              <div class="web__main-user_img" >
                <img class="web__main-user_head_img" :src="message.headimgurl" alt="message.name"/>
              </div>
            </div>
          </div>

          <div v-else class="message_content_received" >
            <div class="message_content_received_left">
              <div class="web__main-user_img" >
                <!-- str.slice(-2); -->
                <img class="web__main-user_head_img" :src="message.headimgurl" :alt="message.name" /> 
              </div>
            </div>
            <div class="message_content_received_right">
                <cite class = "web__main-user_cite" >
                  <i style="padding-left: 15px;font-style: normal;">{{ message.datetime || "message.datetime" }}</i>
                </cite>
              <div class="text">{{ message.text }}</div> 
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div v-if="emoji_show" >
      <div style="text-align:right; width:100%; text-align:right;" @click="visibleEmoji">
        <el-button class="close-btn" type="text" icon="el-icon-close" >关闭表情</el-button>
      </div>
      <div class="row">
        <Picker :data="emojiIndex"
          :showPreview="false" 
          :showSearch="false" 
          :showSkinTones="false"
          set="google" 
          @select="showEmoji"
        />
      </div>
    </div>
    
    <div class="input-container" @keydown.enter="emitMessage">
      <div style="width:65%">
        <el-input type="text" v-model="newMessage" placeholder="输入消息..." />
      </div>
      <div class="emoji-botton" @click="visibleEmoji">
        <div class="emoji-botton-text">😊</div>
      </div>
      <div style="width:15%" >
        <el-button @click="emitMessage" >发送</el-button>
      </div>
    </div>
  </div>
</template>

<script>
// import { MessageBox } from 'element-ui';
import { mapGetters, mapMutations } from 'vuex'
import { Picker, EmojiIndex } from "emoji-mart-vue-fast/src";
import data from "emoji-mart-vue-fast/data/all.json";
import 'emoji-mart-vue-fast/css/emoji-mart.css';
let emojiIndex = new EmojiIndex(data);
const topicMap = {
  room: "room message",
  conv: "private message",
  publick: "broadcast message"
}
export default {
  components: {
    Picker,
  },
  data() {
    return {
      messages: [],
      newMessage: '',
      emojiIndex: emojiIndex,
      emoji_show: false,
    };
  },
  methods: {
    ...mapGetters(['getSocket']),
    ...mapMutations(['getNewSocket']),
    closePage() {
      this.$router.push('/aboutus')
    },
    sendMessage() {
      if (this.newMessage) {
        this.messages.push({
          text: this.newMessage,
          send: true,
          headimgurl: 'URL_TO_AVATAR',
        });
        this.newMessage = '';

        this.$nextTick(() => {
          this.scrollToBottom();
        });
      }
    },
    emitMessage() {
      if(!this.newMessage){
        return;
      }
      // 判断type
      let topic = topicMap.publick
      let emitMsg = {
        id: this.$route.query.id,
        type: this.$route.query.type,
        message:  this.newMessage,
      }
      if(this.$route.query.type === "room"){
        topic = topicMap.room
      } else {
        topic = topicMap.conv
        emitMsg.toUserId = this.$route.query.toUserId
      }
      // 组织数据，发送， 监听 , 渲染展示
      let Socket = this.getSocket()
      if(!(Socket&&Socket.connected)){
        // Socket = this.refreshSocket()
        console.log('socket 连接断开， 稍后重试 ..')
        return;
      }
      console.log('emit:::', topic, emitMsg)
      Socket.emit(topic, emitMsg)
    },
    showEmoji(emoji) {
      this.newMessage = this.newMessage + emoji.native;
    },
    visibleEmoji(){
      this.emoji_show = !this.emoji_show;
    },
    scrollToBottom() {
      const chatContainer = this.$refs.chatContainer;
      chatContainer.scrollTop = chatContainer.scrollHeight;
    },
    refreshSocket(){
      let Socket = this.getSocket()
      if(!(Socket && Socket.connected)){
        Socket = this.getNewSocket()
      }
      if(!(Socket && Socket.connected)){
        console.log('socket not ok yet, try again later')
        return;
      }
      let topic = topicMap.publick
      if(this.$route.query.type === "room"){
        topic = topicMap.room
      } else {
        topic = topicMap.conv
      }
      Socket.off(topic)
      console.log('socket.on :::', topic)
      Socket.on(topic,(msg) => {
        console.log('socket get msg:::',topic, msg)
        this.messages.push(msg)
        this.newMessage = '';
        this.$nextTick(() => {
          this.scrollToBottom();
        });
      })
      // msg 初始化
      let initChatTopci = 'init chat'
      Socket.off(initChatTopci)
      console.log('socket.on :::', initChatTopci)

      Socket.emit(initChatTopci,{id: this.$route.query.id, type: this.$route.query.type})
      let that =this
      Socket.on(initChatTopci,(msg) => {
        console.log('socket get msg:::',initChatTopci, msg)
        console.log('fflag::', this == that)
        this.messages = msg
        this.newMessage = '';
        this.$nextTick(() => {
          this.scrollToBottom();
        });
      })
    }
  },
  activated() {
    this.refreshSocket()
  }
};
</script>

<style>
.chat {
  height: 580px;
  min-height: 500px;
  display: flex;
  flex-direction: column;
  margin-bottom: 70px;
}

.chat-container {
  flex: 1;
  overflow-y: auto;
  margin-bottom: 10px;
}

.chat-messages {
  list-style: none;
  padding: 0;
  margin: 0;
}
.chat-message {
  width:100%;
  min-height: 60px;
  margin:10px,0px;
}

.message_content_send {
  width:100%;
  min-height:60px;
  margin-top: 10px;

  display: flex;
  text-align: right;
  float: right;
}
.message_content_send_left {
  width:80%;
}
.message_content_send_right {
  width:20%;
  margin-left: 10px;
}

.message_content_received {
  width:100%;
  min-height:60px;
  margin-top: 10px;

  display: flex;
  text-align: left;
  float: left;
}
.message_content_received_right {
  width:80%;
}
.message_content_received_left {
  width:20%;
  margin-right: 10px;
}

.avatar {
  width: 40px;
  height: 40px;
  margin-right: 5px;
  flex: 1;
}

.text {
  background-color: #f5f5f5;
  width:90%;
  padding: 5px;
  border-radius: 10px;
  flex: 1;
}

.input-container {
  display: flex;
  align-items: center;
  margin-top: 20px;
}

.input-container input {
  flex: 1;
  margin-right: 5px;
  text-align: right;
}

.web__main-user {
  display: flex;
  text-align: right;
  cursor: pointer;
  left: 3px;
  flex: 1;
}
.web__main-user_img {
  width: 60px;
  height: 60px;
  border-radius: 100%;
  background-color: aquamarine;
  overflow: hidden;
}
.web__main-user_head_img {
  width: 100%; /* 图像宽度设置为容器宽度的百分比 */
  height: auto; /* 图像高度自适应 */
  object-fit: cover; /* 图像缩放以填充整个容器 */
}
.web__main-user_cite {
  /* left: 60px; */
  line-height: 24px;
  font-size: 12px;
  white-space: nowrap;
  color: #999;
  text-align: left;
  font-style: normal;
}

.el-message-box {
  width: 100%;
}
.row { 
  display: flex; 
  width:100%;
}
.emoji-botton {
  width:10%;
  border:solid 1px #CCC;
  height:40px;
  border-radius:20%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left:2px;
  margin-right:2px;
}
.emoji-botton-text {
  text-align: center;
}



</style>