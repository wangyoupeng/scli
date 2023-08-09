// socket.js - 定义socket插件文件

import io from 'socket.io-client';
function init(){
  let token = localStorage.getItem('token')
  let options = {
    reconnectDelay: 3000,
    pingInterval: 10000, // 设置心跳间隔（单位：毫秒）
    pingTimeout: 5000, // 设置心跳超时时间（单位：毫秒）
    auth:{ token }
  }
  console.log("===== options::", options)
  const socket = io("localhost:3000", options); // 连接socket服务器

  // 监听socket连接事件
  socket.on('connect', () => {
    console.log('Socket connected success ...');
  });

  // 监听socket断开连接事件
  socket.on('disconnect', () => {
    console.log('Socket disconnected');
    // 断线后，尝试自动重新连接
    setTimeout(() => {
      socket.io.open();
    }, options.reconnectDelay);
  });
  return socket
}

export default init;