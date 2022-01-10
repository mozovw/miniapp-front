
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
          <u-th class="th">利润增长</u-th>
          <u-th class="th">市场热度</u-th>
        </u-tr>
        <u-tr class="tr" v-for="(item,index) in list" :key="index">
          <u-td><view @click="showPopup(item)">{{ item.symbol }}</view><view @click="showPopup(item)">{{ item.name }}</view></u-td>
          <u-td><view>{{ item.current }}</view><view>{{ item.gaodi }}&nbsp;{{ item.shiyinglv_TTM }}</view></u-td>
          <u-td><view>{{ item.report_date }}</view><view>{{ item.jingliruntongbizengzhang }}</view></u-td>
          <u-td>{{ item.count }}</u-td>
        </u-tr>

      </u-table>

      <u-loadmore :status="status" @loadmore="loadmore" />
      <Popup :form="form" :show="show" @closePopup="closePopup">
        <template #customize="{f}">
          <u-field
            label-align="right"
            label-width="120"
            v-model="f.jinglirun"
            label="净利润"
            disabled
            :border-bottom="false"
          />
          <u-field
            label-align="right"
            label-width="120"
            v-model="f.count"
            label="市场热度"
            disabled
            :border-bottom="false"
          />
          <u-field
            label-align="right"
            label-width="120"
            v-model="f.jingzichanshouyilv"
            label="净产收益"
            disabled
            :border-bottom="false"
          />
          <u-field
            label-align="right"
            label-width="120"
            v-model="f.zichanfuzhailv"
            label="资产负债"
            disabled
            :border-bottom="false"
          />
          <u-field
            label-align="right"
            label-width="120"
            v-model="f.yingyeshouru"
            label="营业收入"
            disabled
            :border-bottom="false"
          />
          <u-field
            label-align="right"
            label-width="120"
            v-model="f.yingyeshourutongbizengzhang"
            label="营收增长"
            disabled
            :border-bottom="false"
          />
          <u-field
            label-align="right"
            label-width="120"
            v-model="f.jinglirun"
            label="净利润"
            disabled
            :border-bottom="false"
          />
          <u-field
            label-align="right"
            label-width="120"
            v-model="f.jingliruntongbizengzhang"
            label="净利增长"
            disabled
            :border-bottom="false"
          />
        </template>
      </Popup>
    </view>
  </Layout>
</template>

<script>
import Layout from '@/slots/layout/index.vue'
import Popup from '@/slots/popup/index.vue'

export default {
  components: {
    Layout,
    Popup
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
    closePopup (show) {
      this.show = show
    },
    search () {
      this.status = 'loading'
      setTimeout(() => {
        this.$u.api.pageComprehensive({
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
            e.zongshizhi = this.$u.lodash.ceil((e.zongshizhi / 100000000), 3) + '亿'
            e.liutonggu = this.$u.lodash.ceil((e.liutonggu / 10000), 3) + '万'
            e.zongguben = this.$u.lodash.ceil((e.zongguben / 10000), 3) + '万'
            e.jingzichanshouyilv = e.jingzichanshouyilv + '%'
            e.zichanfuzhailv = e.zichanfuzhailv + '%'
            e.yingyeshouru = this.$u.lodash.ceil((e.yingyeshouru / 100000000), 3) + '亿'
            e.yingyeshourutongbizengzhang = e.yingyeshourutongbizengzhang + '%'
            e.jinglirun = this.$u.lodash.ceil((e.jinglirun / 100000000), 3) + '亿'
            e.jingliruntongbizengzhang = e.jingliruntongbizengzhang + '%'
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
