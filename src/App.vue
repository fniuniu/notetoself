<template>
		<div id="app">

			<form >
				<label for="noteColor">颜色:</label>
				<select v-model="selected">
					<option v-for="bgcolor in bgcolors" :value="bgcolor">{{ bgcolor }}</option>
				</select>
				<input type="text" v-model="sth" placeholder="在此输入" @keyup.enter="addSticky">
				<input type="button" value="添加" @click="addSticky">
				<input type="button" id="clearButton" value="清空" @click="clearStickies">
			</form>

			<div id="stickies">
				<li class="sticky"
				:id="gerneraterId(index)" v-for="(stickyObj, index) in stickiesArray" @click="deleteSticky($event)"
				:style="'background-color:' + stickyObj.color +';'">
				{{ stickyObj.value }}</li>
			</div>

		</div>
	</template>

	<script>
		//存在两个方法，fetch和save
	import store from './store'
	export default {
		name: 'App',

		data() {
			return {
				selected: 'LightYellow',
				bgcolors: ['LightYellow', 'LightPink', 'PaleGreen', 'LightBlue',],
				sth: '',
				stickyObj: {},
				//stickiesArray: [],
				//查看localstorage中fetch方法，存在数据直接渲染，反之则是个空数组
				stickiesArray: store.fetch(),
			}
		},
		//监听stickiesArray
		watch: {
			stickiesArray: {
				handler(val, oldVal) {
					store.save(val)
				},
				deep: true,
			}
		},

		methods: {
			//v-for 设置不同id方法
			gerneraterId(index) {
				return index
			},

			//添加贴纸
			addSticky() {
				 //把颜色和字条内容传进对象stickyObj
				 var stickyObj = {
					'value': this.sth,
					'color': this.selected,
				}
				//把对象stickyObj传进数组stickiesArray
				this.stickiesArray.push(stickyObj)
				this.sth = ''
			 //localStorage

			},

			//删除贴纸
			deleteSticky(e) {
				// e.target 是你当前点击的元素
				// e.currentTarget 是你绑定事件的元素
				this.stickiesArray.splice(e.currentTarget.id, 1)
			},

			//清空贴纸
			clearStickies() {
				this.stickiesArray = []
			}
		},
	}
	</script>








	<style scoped>
		form {
			height: 80px;
			padding-bottom: 20px;
			border-bottom: 1px solid #adadad;
			color: rgb(127, 129, 131);
			text-align: center;
			line-height: 80px;
   	 	border-radius: 5px;
    	font-family: 'Microsoft YaHei', Aril, serif;
		}
		label {
			font-size: 20px;

    	font-family: 'Microsoft YaHei', SimHei, Aril, cursive;
		}
		select {
			width: 100px;
			height: 28px;
			border: 2px solid rgb(127, 129, 131);
		}
		[type=text] {
			width: 200px;
			height: 22px;
			border: 2px solid rgb(127, 129, 131);

		}
		[type=button] {
			background-color: rgb(127, 129, 131);
    	color: rgb(255, 255, 255);
    	font-size: 18px;
    	font-family: 'Microsoft YaHei', SimHei, Aril, cursive;
		}

	/* 贴纸字体及大小  */
	li.sticky {
		font-family: Verdana, Helvetica, sans-serif;
		font-size: 200%;
	}
	 /* 贴纸形状大小颜色阴影  */
	 li.sticky {
		display: block;
		list-style: none;
		z-index: 1;
		float: left;
		margin: 30px;
		padding: 15px 15px 50px 15px;
		width: 200px;
		height: 200px;
		border: 1px solid #bfbfbf;
		background-color: LightGoldenRodYellow;  /* use #fafad2 if name doesn't work */
		color: black;
		text-decoration: none;
		-webkit-box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
		-moz-box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
		-o-box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
		box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
		-webkit-transition: all 0.5s ease-in;
		-moz-transition: all 0.5s ease-in;
		-o-transition: all 0.5s ease-in;
		-ms-transition: all 0.5s ease-in;
		transition: all 0.5s ease-in;
		overflow: hidden;
	}

	 /* 点击贴纸时放大,优先与其他样式  */
	 #stickies li.sticky:hover {
		-webkit-transform: rotate(0deg) scale(1.25);
		-moz-transform: rotate(0deg) scale(1.25);
		-o-transform: rotate(0deg) scale(1.25);
		-ms-transform: rotate(0deg) scale(1.25);
		transform: rotate(0deg) scale(1.25);
		box-shadow: 5px 5px 6px rgba(0, 0, 0, 0.4);
		z-index: 10;
	}
	 /* 贴纸区各个贴纸角度不同  */

	#stickies .sticky:nth-child(even) {
		-webkit-transform: rotate(2deg);
		-moz-transform: rotate(2deg);
		-o-transform: rotate(2deg);
		-ms-transform: rotate(2deg);
		transform: rotate(2deg);
	}

	#stickies .sticky:nth-child(odd) {
		-webkit-transform: rotate(-1deg);
		-moz-transform: rotate(-1deg);
		-o-transform: rotate(-1deg);
		-ms-transform: rotate(-1deg);
		transform: rotate(-1deg);
	}

	#stickies .sticky:nth-child(3n) {
		-webkit-transform: rotate(1deg);
		-moz-transform: rotate(1deg);
		-o-transform: rotate(1deg);
		-ms-transform: rotate(1deg);
		transform: rotate(1deg);
	}
	</style>
