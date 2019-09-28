<!-- 悬浮菜单 <tabs-sticky v-model="index" :fixed="false" @change="changeTab"></tabs-sticky> -->
<template>
	<view class="tabs-sticky" :class="{'tabs-fixed': fixed}">
		<view class="tab" v-for="(tab, i) in tabs" :key="i" :class="{active: value==i}" @click="changeTab(i)">{{tab.name}}</view>
		<view class="search" v-show="showipt">
			<input class="uni-input" placeholder="请输入搜索关键字" v-model="curWord" />
		</view>
		<text class="iconfont" @click="showSearch">&#xe607;</text>
	</view>
</template>

<script>
	export default {
		props: {
			tabs: Array, // 菜单 [{name:'全部'},{name:'母婴'},{name:'图书'}]
			value: { // 当前菜单下标 (使用v-model语法糖: 1.props需为value; 2.需回调input事件)
				type: Number,
				default () {
					return 0
				}
			},
			fixed: Boolean // 是否悬浮
		},
		data() {
			return {
				showipt: false,
				curWord:'',
				timer:null
			}
		},
		watch:{
			//关键词变化的时候,重置列表数据
			curWord(){
				if (this.timer) {
				          clearTimeout(this.timer)
				        }
				        this.timer = setTimeout(() => {
				          this.$emit('search',this.curWord)
				        }, 1000)
				
			}
		},
		methods: {
			// 切换tab
			changeTab(i) {
				if (this.value != i) {
					this.$emit('input', i);
					this.$emit('change', i);
				}
			},
			showSearch() {
				this.showipt = !this.showipt;
			}
		},
	}
</script>

<style>
	/*菜单*/
	.tabs-sticky {
		display: flex;
		height: 80rpx;
		line-height: 80rpx;
		font-size: 28upx;
		text-align: center;
		background: #fff;
/* 		border-bottom: 1upx solid #ddd; */
	}

	.tabs-sticky .tab {
		flex: 1;
	}





	/*悬浮样式*/
	.tabs-sticky.tabs-fixed {
		z-index: 9999;
		position: fixed;
		top: var(--window-top);
		left: 0;
		width: 100%;
	}
</style>
<style lang="scss">
	.tabs-sticky {
		position: relative;

		.active {
			border-bottom: 2px solid $uni-bg-color;
			color: #FF6990;
		}

		.iconfont {
			width: 60rpx;
			color: $uni-bg-color;
			font-size: 40rpx;
		}

		.search {
			position: absolute;
			height: 44rpx;
			top: 0px;
			bottom: 0;
			margin: auto;
			right: 64rpx;
			z-index: 999;

			.uni-input {
				width: 200rpx;
				height: 44rpx;
				padding: 0 30rpx;

				border-radius: 30rpx;
				font-size: $uni-font-size-ssm;
				background-color: #fce0f5;
			}
		}
	}
</style>
