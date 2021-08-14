<template>
  <Layout>
    <view class="u-flex user-box u-p-l-30 u-p-r-20 u-p-b-20 u-p-t-20">
      <view class="u-m-r-10">
        <u-avatar :src="userInfo.avatar" size="140"></u-avatar>
      </view>
      <view class="u-flex-1">
        <view class="u-font-18 u-p-b-15">{{ userInfo.fullname }}</view>
        <view class="u-font-12 u-tips-color">{{ userInfo.titleDesc }}</view>
        <view class="u-font-12 u-tips-color">{{ userInfo.departNamePath }}</view>

      </view>
    </view>
  </Layout>
</template>
<script>
import Layout from '@/slots/layout/index.vue'

import {
  mapState
} from 'vuex'

export default {
  components: {
    Layout
  },
  computed: {
    ...mapState(['userInfo'])
  },

  data () {
    return {

    }
  }
}
</script>
