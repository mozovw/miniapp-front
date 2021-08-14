
<template>
  <Layout>
    <view class="page-content1">

      <u-input v-model="result" :border="true" placeholder="483.9" type="textarea" disabled />

      <u-form :model="form" ref="uForm" :rules="rules">

        <u-form-item label-width="0rpx" prop="zyxjl">
          <u-input v-model.number="form.zyxjl" :border="true" type="digit" placeholder="自由现金流：8.28" />
        </u-form-item>
        <u-form-item label-width="0rpx" prop="txl">
          <u-input v-model.number="form.txl" :border="true" type="digit" placeholder="贴现率：0.09" />
        </u-form-item>
        <u-form-item label-width="0rpx" prop="zzl">
          <u-input v-model.number="form.zzl" :border="true" type="digit" placeholder="增长率：0.15" />
        </u-form-item>
        <u-form-item label-width="0rpx" prop="n">
          <u-input v-model.number="form.n" :border="true" type="digit" placeholder="年：10" />
        </u-form-item>
        <u-form-item label-width="0rpx" prop="nhzzl">
          <u-input v-model.number="form.nhzzl" :border="true" type="digit" placeholder="年后增长率：0.05" />
        </u-form-item>

        <u-button @click="submit">计算</u-button>

      </u-form>
      <u-line margin="20rpx 0rpx" />

      <u-image mode="widthFix" :src="src"></u-image>

    </view>
  </Layout>
</template>

<script>
import Layout from '@/slots/layout/index.vue'

export default {
  components: {
    Layout

  },
  data () {
    return {
      src: '/static/images/txlgz.png',
      form: {
        zyxjl: null,
        txl: null,
        zzl: null,
        n: null,
        nhzzl: null
      },
      result: null,
      rules: {
        zyxjl: [{
          required: true,
          type: 'number',
          min: 0,
          message: '请填写正确的内容',
          trigger: ['change']
        }],
        txl: [{
          required: true,
          type: 'number',
          min: 0,
          max: 1,
          message: '请填写正确的内容',
          trigger: ['change']
        }],
        zzl: [{
          required: true,
          type: 'number',
          min: 0,
          message: '请填写正确的内容',
          trigger: ['change']
        }],
        n: [{
          required: true,
          type: 'number',
          min: 0,
          message: '请填写正确的内容',
          trigger: ['change']
        }],
        nhzzl: [{
          required: true,
          type: 'number',
          min: 0,
          message: '请填写正确的内容',
          trigger: ['change']
        }]
      }
    }
  },
  onReady () {
    this.$refs.uForm.setRules(this.rules)
  },
  methods: {
    submit () {
      this.$refs.uForm.validate(valid => {
        if (valid) {
          console.log('验证通过')
          this.result = this.calc()
        } else {
          console.log('验证失败')
        }
      })
    },
    calc () {
      const zyxjl = this.form.zyxjl - 0
      const txl = this.form.txl - 0
      const zzl = this.form.zzl - 0
      const n = this.form.n - 0
      const nhzzl = this.form.nhzzl - 0
      if (nhzzl >= zzl) {
        this.$u.toast('增长率必须大于年后增长率')
        return
      }
      let ziyouxianjin = 0
      // eslint-disable-next-line camelcase
      let sum_zhexian = 0
      for (var i = 0; i < n; i++) {
        ziyouxianjin = zyxjl * Math.pow((1 + zzl), i + 1)
        // eslint-disable-next-line camelcase
        sum_zhexian += ziyouxianjin / Math.pow((1 + txl), i + 1)
      }
      // eslint-disable-next-line camelcase
      const sum_zhexian_yihou = ziyouxianjin * (1 + nhzzl) * (1 + txl) / (txl - nhzzl) /
					Math.pow((1 + txl), n + 1)

      // eslint-disable-next-line camelcase
      const sum = sum_zhexian_yihou + sum_zhexian
      return sum.toFixed(1)
    }
  }
}
</script>
<style scoped>

</style>
