
<template>
  <Layout>
    <view class="page-content1">

      <u-search
        placeholder="请输入..."
        class=""
        v-model="query"
        @search="search"
        @blur="search"
        :show-action="false"
        :clearabled="true"
      ></u-search>
      <u-line class="u-line" margin="20rpx"></u-line>

      <u-table :th-style="{}" >
        <u-tr class="tr">
          <u-th class="th">代码|名称</u-th>
          <u-th class="th">价格|况|市盈</u-th>
          <u-th class="th">估值</u-th>
          <u-th class="th">估市比</u-th>
        </u-tr>
        <u-tr class="tr" v-for="(item,index) in list" :key="index">
          <u-td><view @click="showPopup(item)">{{ item.symbol }}</view><view @click="showPopup(item)">{{ item.name }}</view></u-td>
          <u-td><view>{{ item.current }}</view><view>{{ item.gaodi }}&nbsp;{{ item.shiyinglv_TTM }}</view></u-td>
          <u-td><view>{{ item.xianjinliu_current }}</view></u-td>
          <u-td><view>{{ item.report_date }}</view><view>{{ item.gushibi }}</view></u-td>
        </u-tr>

      </u-table>

      <u-loadmore :status="status" @loadmore="loadmore" />
      <u-popup mode="left" v-model="show" width="55%">
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

          <u-field
            label-align="right"
            label-width="120"
            v-model="form.yy_current"
            label="营收估值"
            disabled
            :border-bottom="false"
          />
          <u-field
            label-align="right"
            label-width="120"
            v-model="form.jl_current"
            label="净利估值"
            disabled
            :border-bottom="false"
          />
          <u-field
            label-align="right"
            label-width="120"
            v-model="form.report_date"
            label="财报日期"
            disabled
            :border-bottom="false"
          />
          <u-field
            label-align="right"
            label-width="120"
            v-model="form.gushibi"
            label="估市比"
            disabled
            :border-bottom="false"
          />
        </view>
      </u-popup>
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
      list: [],
      pageNum: 1,
      pageSize: 15,
      total: 0,
      status: 'loadmore',
      query: null,
      show: false,
      form: {}
    }
  },

  onReachBottom () {
    this.loadmore()
  },
  onShow () {
    this.search()
  },
  methods: {
    showPopup (form) {
      this.show = !this.show
      this.form = form
    },
    search () {
      this.status = 'loading'
      setTimeout(() => {
        this.$u.api.pageValuation({
          query: this.query,
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }).then(res => {
          this.list = res.list
          this.total = res.total
          if (this.pageSize === this.total) {
            this.status = 'nomore'
          } else {
            this.status = 'loadmore'
          }
          this.list.forEach(e => {
            e.liutongzhi = this.$u.lodash.ceil((e.liutongzhi / 100000000), 3) + '亿'
            e.zongshizhi = this.$u.lodash.ceil((e.zongshizhi / 100000000), 2) + '亿'
            e.liutonggu = this.$u.lodash.ceil((e.liutonggu / 10000), 3) + '万'
            e.zongguben = this.$u.lodash.ceil((e.zongguben / 10000), 3) + '万'
            e.huanbi_bilv = this.$u.lodash.ceil((e.huanbi_bilv * 100), 3) + '%'
            e.huanbi_bilv_5 = this.$u.lodash.ceil((e.huanbi_bilv_5 * 100), 3) + '%'
            e.yinianzuidi = e['52zhouzuidi']
            e.yinianzuigao = e['52zhouzuigao']
            e.gaodi = this.$u.lodash.ceil((e.gaodi * 100), 1) + '%'
            e.shiyinglv_TTM = this.$u.lodash.ceil((e.shiyinglv_TTM), 1)
          })
        })
      }, 200)
    },
    loadmore () {
      if (this.pageSize === this.total) {
        this.status = 'nomore'
        return
      }
      this.pageSize += 10
      if (this.pageSize > this.total && this.total > 0) {
        this.pageSize = this.total
      }
      this.search()
    }
  }
}
</script>
<style lang="scss" scoped>
  .tr {
    height: 100rpx;
  }
</style>
