<template>
  <view>
    <u-popup mode="left" v-model="s" width="55%" @close="closePopup" >
      <view style="padding:20px 5px 20px 5px;">
        <u-field
          label-align="right"
          label-width="120"
          v-model="form.symbol"
          label="代码"
          disabled
          :border-bottom="false"
        />
        <u-field
          label-align="right"
          label-width="120"
          v-model="form.name"
          label="名称"
          disabled
          :border-bottom="false"
        />
        <u-field
          label-align="right"
          label-width="120"
          v-model="form.current"
          label="当前价格"
          disabled
          :border-bottom="false"
        />
        <u-field
          label-align="right"
          label-width="120"
          v-model="form.yinianzuidi"
          label="一年最低"
          disabled
          :border-bottom="false"
        />
        <u-field
          label-align="right"
          label-width="120"
          v-model="form.yinianzuigao"
          label="一年最高"
          disabled
          :border-bottom="false"
        />
        <u-field
          label-align="right"
          label-width="120"
          v-model="form.gaodi"
          label="价格情况"
          disabled
          :border-bottom="false"
        />
        <u-field
          label-align="right"
          label-width="120"
          v-model="form.shiyinglv_TTM"
          label="市盈率"
          disabled
          :border-bottom="false"
        />
        <u-field
          label-align="right"
          label-width="120"
          v-model="form.shijinglv"
          label="市净率"
          disabled
          :border-bottom="false"
        />
        <u-field
          label-align="right"
          label-width="120"
          v-model="form.guxilv_TTM"
          label="股息率"
          disabled
          :border-bottom="false"
        />
        <u-field
          label-align="right"
          label-width="120"
          v-model="form.platename"
          label="行业版块"
          disabled
          :border-bottom="false"
        />

        <u-field
          label-align="right"
          label-width="120"
          v-model="form.zongshizhi"
          label="总市值"
          disabled
          :border-bottom="false"
        />
        <u-field
          label-align="right"
          label-width="120"
          v-model="form.zongguben"
          label="总股本"
          disabled
          :border-bottom="false"
        />
        <u-field
          label-align="right"
          label-width="120"
          v-model="form.liutongzhi"
          label="流通值"
          disabled
          :border-bottom="false"
        />
        <u-field
          label-align="right"
          label-width="120"
          v-model="form.liutonggu"
          label="流通股"
          disabled
          :border-bottom="false"
        />

        <slot name="customize" :f="form">

        </slot>
      </view>
    </u-popup>
  </view>
</template>

<script>

export default {
  props: {
    form: { type: Object, default: null },
    show: { type: Boolean, default: false }
  },

  data () {
    return {
      s: false
    }
  },
  watch: {
    show (v) {
      this.s = v
    }
  },

  methods: {
    closePopup () {
      this.$emit('closePopup', this.s)
    }
  }
}
</script>

<style scoped lang="scss">

</style>
