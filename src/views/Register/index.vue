<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>注册新用户
        <span class="go">我有账号，去 <a href="#/login" target="_parent">登陆</a>
        </span>
      </h3>
      <div class="content">
        <label>手机号:</label>
        <input type="text" placeholder="请输入你的手机号" v-model.trim.number.lazy="regForm.phone">
        <span class="error-msg">{{ regForm.phone|phoneRule }}</span>
      </div>
      <div class="content">
        <label>验证码:</label>
        <input type="text" placeholder="请输入验证码" v-model="regForm.code">
        <span><span @click="sendCode" v-if="flag">【发送验证码】</span>您的验证码是：{{ code }}</span>
        <span class="error-msg" v-show="regForm.code.length>=6">{{ regForm.code==code?'':'验证码不正确'}}</span>
      </div>
      <div class="content">
        <label>登录密码:</label>
        <input type="text" placeholder="请输入你的登录密码" v-model.trim.lazy="regForm.password">
        <span class="error-msg">{{regForm.password|passwordRule}}</span>
      </div>
      <div class="content">
        <label>确认密码:</label>
        <input type="text" placeholder="请输入确认密码" v-model.trim.lazy="passwordAffrim">
        <span class="error-msg">{{passwordAffrim==regForm.password?'':'两次输入的密码不一致'}}</span>
      </div>
      <div class="controls">
        <input name="m1" type="checkbox" v-model="agreement">
        <span>同意协议并注册《尚品汇用户协议》</span>
        <span class="error-msg">{{agreementMsg}}</span>
      </div>
      <div class="btn" @click.enter="regFormSub">
        <button>完成注册</button>
      </div>
    </div>
      <!--  -->
<!--  -->
    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Register',
    data(){
      return {
        agreementMsg:'',
        passwordAffrim:'',
        regForm:{
          phone:'',
          code:'',
          password:'',
        },
        agreement:false,
        code:'',
      }
    },
    methods:{
      postUser(){
        this.$axios({
        method:'post',
        url:'/api/user/passport/register',
        data:this.regForm
      }).then((res)=>{
        if(res.data.code==200){
          this.$message.success('注册成功,即将跳转至登陆界面')
          setTimeout(()=>{
            this.$router.push('/login')
          },2000)
        }else{
          this.$message,error('注册失败，请核对填写的信息')
        }
      })
      },
      sendCode(){
        this.$axios({
        method:'get',
        url:'/api/user/passport/sendCode/'+this.regForm.phone
      }).then(res=>{
        this.code = res.data.data
      })
      },
      regFormSub(){
        if(this.agreement){
          this.agreementMsg = ''
        }else{
          this.agreementMsg = '需勾选用户协议'
          return
        }
        var errorMsg = document.querySelectorAll('.error-msg')
        var flag = [...errorMsg].some(item=>{
          return item.innerText!=''
        })
        if(flag) return
        this.postUser()
      }
    },
    mounted(){
      
    },
    filters:{
      phoneRule(val){
        if(/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(val)||val.length==0){
          return ''
        }else{
          return '手机号格式不正确'
        }
      },
      passwordRule(val){
        if(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/.test(val)||val.length==0){
          return ''
        }else{
          return '密码不合法'
        }
      }
    },
    computed:{
      flag(){
        if(/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(this.regForm.phone)){
          return true
        }else{
          return false
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .register-container {
    .register {
      width: 1200px;
      height: 445px;
      border: 1px solid rgb(223, 223, 223);
      margin: 0 auto;

      h3 {
        background: #ececec;
        margin: 0;
        padding: 6px 15px;
        color: #333;
        border-bottom: 1px solid #dfdfdf;
        font-size: 20.04px;
        line-height: 30.06px;

        span {
          font-size: 14px;
          float: right;

          a {
            color: #e1251b;
          }
        }
      }

      div:nth-of-type(1) {
        margin-top: 40px;
      }

      .content {
        padding-left: 390px;
        margin-bottom: 18px;
        position: relative;

        label {
          font-size: 14px;
          width: 96px;
          text-align: right;
          display: inline-block;
        }

        input {
          width: 270px;
          height: 38px;
          padding-left: 8px;
          box-sizing: border-box;
          margin-left: 5px;
          outline: none;
          border: 1px solid #999;
        }

        img {
          vertical-align: sub;
        }

        .error-msg {
          position: absolute;
          top: 100%;
          left: 495px;
          color: red;
        }
      }

      .controls {
        text-align: center;
        position: relative;

        input {
          vertical-align: middle;
        }

        .error-msg {
          position: absolute;
          top: 100%;
          left: 495px;
          color: red;
        }
      }

      .btn {
        text-align: center;
        line-height: 36px;
        margin: 17px 0 0 55px;

        button {
          outline: none;
          width: 270px;
          height: 36px;
          background: #e1251b;
          color: #fff !important;
          display: inline-block;
          font-size: 16px;
        }
      }
    }
  }
</style>