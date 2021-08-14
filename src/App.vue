<script>
export default {
  onLaunch: function () {
    console.log('App Launch')
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  }
}
</script>

<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";

	/*每个页面公共css */
	page {
		background-color: #f7f7f7;
	}

	.page-content{
		background-color: #f7f7f7;
		margin: 20rpx;
		border-radius: 10rpx;
	}
</style>
