<template>
  <view>
    <u-navbar :is-back="false" :title-bold="true" title="DELTA"></u-navbar>

    <view class="page-content">
      <slot>

      </slot>
    </view>

    <!-- 与包裹页面所有内容的元素u-page同级，且在它的下方 -->
    <u-tabbar v-model="current" :list="TabbarList" :mid-button="false" :before-switch="beforeSwitch"></u-tabbar>
  </view>
</template>

<script>

export default {
  data () {
    return {
      TabbarList: [{
        iconPath: 'home',
        selectedIconPath: 'home-fill',
        text: '首页',
        customIcon: false,
        pageUrl: '/pages/index/index'
      },
      {
        iconPath: 'photo',
        selectedIconPath: 'photo-fill',
        text: '放映厅',
        customIcon: false,
        pageUrl: 'waiting'
      },
      {
        iconPath: 'play-right',
        selectedIconPath: 'play-right-fill',
        text: '直播',
        customIcon: false,
        pageUrl: 'waiting'
      },
      {
        iconPath: 'account',
        selectedIconPath: 'account-fill',
        text: '我的',
        customIcon: false,
        pageUrl: '/pages/account/index'
      }
      ],
      current: 0
    }
  },

  methods: {
    toNext (url) {
      if (url === 'waiting') {
        this.$u.toast('敬请期待！')
      } else {
        this.$u.route({
          url: url,
          params: {
            current: this.current
          }
        })
      }
    },
    beforeSwitch (index) {
      const pageUrl = this.TabbarList[index].pageUrl
      this.current = index
      this.toNext(pageUrl)
    }
  }
}
</script>

<style scoped lang="scss">

</style>
