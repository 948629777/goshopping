<template>
    <div>
        <!-- 头部 -->
			<div class="outer">
                <header class="header">
				<!-- 头部的第一行 -->
				<div class="top">
					<div class="container">
						<div class="loginList">
							<p>尚品汇欢迎您！</p>
							<p  v-if="!$store.state.flag">
								<span>请</span>
								<router-link to="/login" style="color: green;">登录</router-link>
								<router-link to="/register" class="register" style="color: red;">免费注册</router-link>
							</p>
                            <p v-else>
                                {{ $store.state.userName }}<span @click="out" style="color: green;cursor: pointer;">[退出登录]</span>
                            </p>
						</div>
						<div class="typeList">
							<router-link class="hovercolor" to="/orders">我的订单</router-link>
							<router-link class="hovercolor" to="/car">我的购物车</router-link>
							<router-link class="hovercolor" to="/users">我的尚品汇</router-link>
							<router-link class="hovercolor" to="/vip">尚品汇会员</router-link>
							<router-link class="hovercolor" to="/item">企业采购</router-link>
							<router-link class="hovercolor" to="/about">关注尚品汇</router-link>
							<router-link class="hovercolor" to="/cooperate">合作招商</router-link>
							<router-link class="hovercolor" to="/merchant">商家后台</router-link>
						</div>
					</div>
				</div>
				<!--头部第二行 搜索区域-->
				<div class="bottom">
					<h1 class="logoArea">
						<a class="logo" title="尚品汇" href="#/" target="_parent">
							<img src="./images/Logo.png" alt="">
						</a>
					</h1>
					<div class="searchArea">
						<form action="###" class="searchForm">
							<input type="text" id="autocomplete" class="input-error input-xxlarge" />
							<button class="sui-btn btn-xlarge btn-danger" type="button">搜索</button>
						</form>
					</div>
				</div>
			</header>
            </div>
    </div>
</template>

<script>
    export default {
        name:'headernav',
        data(){
            return {
                
            }
        },
        methods:{
            out(){
                this.$store.commit('noLogin')
                sessionStorage.removeItem('token')
                sessionStorage.removeItem('userName')
            }
        },
        mounted(){
            if(sessionStorage.getItem('userName')){
                this.$store.commit('isLogin')
            }
        }
    }
</script>

<style lang="less" scoped>

</style>