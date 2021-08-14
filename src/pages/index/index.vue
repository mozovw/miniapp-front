<template>
  <view>

    <Layout>
      <view class="grid" v-for="(parentItem,parentIndex) in sumList" :key="parentIndex">
        <view class="grid-title">{{ parentItem.title }}</view>
        <u-grid :col="3" :border="false">
          <u-grid-item v-for="(item,index) in parentItem.list" :key="index" @click="toNext(item.url)">
            <u-icon :name="item.image" :size="46"></u-icon>
            <view class="grid-text">{{ item.text }}</view>
          </u-grid-item>
        </u-grid>
      </view>
    </Layout>

  </view>
</template>

<script>

import Layout from '@/slots/layout/index.vue'

export default {
  components: {
    Layout
  },
  data () {
    return {
      sumList: [{
        title: '财务工具',

        list: [{
          image: 'order',
          text: '贴现率估值',
          url: '/pages/financial_tools/txlgz/index'
        }, {
          image: 'photo',
          text: '待定',
          url: 'waiting'
        }]
      }, {
        title: '金融数据',

        list: [{
          image: 'order',
          text: '综合分析',
          url: '/pages/financial_datas/comprehensive/index'
        }, {
          image: 'order',
          text: '基金选择',
          url: '/pages/financial_datas/fundselection/index'
        }, {
          image: 'order',
          text: '估值分析',
          url: '/pages/financial_datas/valuation/index'
        }, {
          image: 'photo',
          text: '待定',
          url: 'waiting'
        }]
      }],

      current: 0
    }
  },
  created () {
    this.initToken()
  },
  methods: {
    toNext (url) {
      if (url === 'waiting') {
        this.$u.toast('敬请期待！')
      } else {
        this.$u.route(url)
      }
    },
    initToken () {
      if (this.tokenInfo) {
        const {
          accessToken
        } = this.tokenInfo

        if (accessToken) return
      }

      this.$u.api.getToken().then(res => {
        const tokenInfo = {
          accessToken: res.access_token,
          expiresIn: res.expires_in
        }
        this.$u.vuex('tokenInfo', tokenInfo)
      })
    }
  }
}
</script>

<style scoped lang="scss">

	.grid {
    margin: 15rpx 0;
		padding-bottom: 10rpx;
		border-radius: 10rpx;
		background-color: #FFFFFF;
	}

	.grid-text {
		font-size: 28rpx;
		margin-top: 4rpx;
		color: $u-type-info;
	}

	.grid-title {
		color: $u-main-color;
		font-size: 30rpx;
		font-weight: bold;
		padding-left: 20rpx;
		padding-top: 20rpx;
	}

	.grid-text {
		font-size: 28rpx;
		margin-top: 4rpx;
		color: $u-type-info;
	}
</style>
