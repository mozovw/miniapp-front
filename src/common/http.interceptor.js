
// 这里的Vue为Vue对象(非创建出来的实例)，vm为main.js中“Vue.use(httpInterceptor, app)”这一句的第二个参数，
// 为一个Vue的实例，也即每个页面的"this"
// 如果需要了解这个install方法是什么，请移步：https://uviewui.com/components/vueUse.html
const install = (Vue, vm) => {
  // 此为自定义配置参数，具体参数见上方说明
  Vue.prototype.$u.http.setConfig({
    baseUrl: vm.globalConfig.apiUrl,
    loadingText: '努力加载中~',
    loadingTime: 800,
    originalData: true, // 是否在拦截器中返回服务端的原始数据
    dataType: 'json', // 设置为json，返回后会对数据进行一次JSON.parse()
    // 设置自定义头部content-type
    header: {
      'content-type': 'application/json;charset=UTF-8'
    }
  })

  // 请求拦截部分，如配置，每次请求前都会执行
  Vue.prototype.$u.http.interceptor.request = (config) => {
    // 获取accessToken
    if (!vm.$store.state.tokenInfo) return
    const { accessToken } = vm.$store.state.tokenInfo
    // 如果没有，通过/oauth/token，并更新store
    config.header.Authorization = `Bearer ${accessToken || ''}`
    return config
  }
  // 响应拦截，如配置，每次请求结束都会执行本方法
  Vue.prototype.$u.http.interceptor.response = (res) => {
    if (!res.data) {
      vm.$u.toast('系统繁忙，请稍后再试')
      return false
    }
    const {
      data,
      success,
      errors
    } = res.data
    if (success) {
      return data
    } else {
      if (!errors) return false
      const msgArr = []
      for (let i = 0; i < errors.length; i++) {
        const e = errors[i]
        if (e.error === 'invalid_token') {
          vm.$u.api.getToken().then(res => {
            const tokenInfo = {
              accessToken: res.access_token,
              expiresIn: res.expires_in
            }
            vm.$u.vuex('tokenInfo', tokenInfo)
          })
          vm.$u.toast('会话刷新，请重新操作')
          return false
        }
        msgArr.push(e.message)
      }
      vm.$u.toast(msgArr.join('；'))
      return false
    }
  }
}

export default {
  install
}
