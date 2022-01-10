
<template>
  <Layout>
    <view >

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
          <u-th class="th">PEG</u-th>
          <!-- <u-th class="th">估市比</u-th> -->
        </u-tr>
        <u-tr class="tr" v-for="(item,index) in list" :key="index">
          <u-td><view @click="showPopup(item)">{{ item.symbol }}</view><view @click="showPopup(item)">{{ item.name }}</view></u-td>
          <u-td><view>{{ item.current }}</view><view>{{ item.gaodi }}&nbsp;{{ item.shiyinglv_TTM }}</view></u-td>
          <u-td><view>{{ item.peg }}</view></u-td>
          <!-- <u-td><view>{{ item.report_date }}</view><view>{{ item.gushibi }}</view></u-td> -->
        </u-tr>

      </u-table>

      <u-loadmore :status="status" @loadmore="loadmore" />

      <Popup :form="form" :show="show" @closePopup="closePopup">
        <template #customize="{f}">
          <u-field
            label-align="right"
            label-width="120"
            v-model="f.peg"
            label="PEG"
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
        this.$u.api.pagePEG({
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
