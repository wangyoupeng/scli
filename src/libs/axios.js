import Axios from 'axios';
import moment from 'moment'

function refreshedToken(){
  let refreshtoken = localStorage.getItem('refreshToken')
  if(refreshtoken){
    Axios.post('/api/refresh/token', { refreshtoken }).then((res) => {
      if(res.data && res.data.message == "ok"){
        if(res.data.token) localStorage.setItem('token', res.data.token)
        if(res.data.tokenExp) localStorage.setItem('tokenExp', res.data.tokenExp)
        if(res.data.refreshToken) localStorage.setItem('refreshToken', res.data.refreshToken)
        if(res.data.refreshTokenExp) localStorage.setItem('refreshTokenExp', res.data.refreshTokenExp)
      } else {
        // this.$message.error(res.data.message)
      }
    });
  }
}

function checkTokenExp(){
  localStorage.getItem('tokenExp')
  // 判断是否临期
  // 如果临期 refreshedToken
  let current = moment().unix()
  let tokenExp = localStorage.getItem('tokenExp')
  if(tokenExp - current > 0 && tokenExp - current < 600){ // 最后10min自动刷新
    setTimeout(()=>{
      refreshedToken()
    }, 200)
  }
}

Axios.interceptors.request.use(
  request => {
    if(request.url != "/api/login" && request.url != "/api/login" != "/api/refreshed/token"){
      checkTokenExp()
    }
    let token = localStorage.getItem('token')
    if(
      (!token) && 
        (
          request.url.indexOf("cart") > -1 ||
          request.url.indexOf("order") > -1 ||
          request.url.indexOf('aboutus') > -1
        )
      ){
      window.location.href = '/#/login'
      return null;
    }
    request.headers.Authorization = `Bearer ${token}`;
    return request;
  },
  error => {
    return Promise.reject(error);
  }
);
// 响应拦截器
Axios.interceptors.response.use(
  response => {
    // 对响应数据进行处理
    if (response.data.status === 401) {
      window.location.href = '/#/login'
    }
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);



export default Axios