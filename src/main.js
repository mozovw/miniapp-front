import Vue from 'vue'
import App from './App'
import uView from 'uview-ui'
import store from '@/store'
import config from '@/common/config.js'
// http拦截器，此为需要加入的内容，如果不是写在common目录，请自行修改引入路径
import httpInterceptor from '@/common/http.interceptor.js'

// http接口API集中管理引入部分
import httpApi from '@/common/http.api.js'

import lodash from '@/utils/$u.lodash.js'
import vuexStore from '@/utils/$u.mixin.js'

Vue.config.productionTip = false
Vue.prototype.globalConfig = config
App.mpType = 'app'

const app = new Vue({
  store,
  ...App
})

// 这里需要写在最后，是为了等Vue创建对象完成，引入"app"对象(也即页面的"this"实例)
Vue.mixin(vuexStore)
Vue.use(uView)
Vue.use(httpInterceptor, app)
Vue.use(httpApi, app)
Vue.use(lodash, app)

app.$mount()
