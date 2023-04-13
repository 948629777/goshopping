<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <p v-if="goodsList[0]">空空如也</p>
        <ul class="cart-list" v-for="item in goodsList" :key="item.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" v-model="item.isChecked" @click="checkout($event,item.skuId)">
          </li>
          <li class="cart-list-con2">
            <img :src="item.imgUrl">
            <div class="item-msg">{{ item.skuName }}</div>
          </li>
          <li class="cart-list-con3">
            <div class="item-txt">语音升级款</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ item.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <el-input-number v-model="item.skuNum" size="mini" :min="1" :max="10" label="描述文字" @blur="editGoods(item.skuId,item.skuNum)"></el-input-number>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ item.skuNum*item.skuPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click.prevent="removeGoods(item.skuId)">删除</a>
            <br>
            <a href="#none" @click.prevent="$message.success('收藏成功')">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="allChecked" @click="allCheck">
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#none">删除选中的商品</a>
        <a href="#none" @click.prevent="$message.success('移到我的关注')">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>{{ goodsSum }}</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ priceSum }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" href="###" target="_blank" @click.prevent="payVisible=true">结算</a>
        </div>
      </div>
    </div>

    <el-dialog
  title="提示"
  :visible.sync="payVisible"
  width="30%"
  :close="handleClose">
  <img src="../../images/erweima.gif" width="100%" alt="">
  <span>即将支付{{ priceSum }}元</span>
</el-dialog>

  </div>
</template>

<script>
  export default {
    name: 'ShopCart',
    data(){
      return {
        payVisible:false,
        timer:undefined,
        goodsList:[],
        allCheckbox:false,
      }
    },
    methods:{
      getCarList(){
        this.$axios({
        method:'get',
        url:'/api/cart/cartList'
      }).then(res=>{
        this.goodsList = res.data.data[0].cartInfoList
        console.log(this.goodsList);
      })
      },
      allCheck(e){
        this.goodsList.forEach(item=>{
          item.isChecked = e.target.checked?1:0
        })
      },
      checkout(e,id){
        if(this.timer){
          clearTimeout(this.timer)
        }
        this.timer=setTimeout(()=>{
          this.$axios({
            method:'get',
            url:`/api/cart/checkCart/${id}/${e.target.checked?'1':'0'}`
          }).then(res=>{
              this.timer=undefined
            if(res.data.code===200){
              this.$message.success('切换成功')
            }else{
              this.$message.error(res.data.message)
            }
          })
        },1500)
      },
      handleClose(){
        // 支付框关闭
      },
      removeGoods(id){
        this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios({
            method:'delete',
            url:'/api/cart/deleteCart/'+id+''
          }).then(res=>{
            if(res.data.code===200){
              this.$message.success('删除成功')
              this.getCarList()
            }else{
              this.$message.error(res.data.message)
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      editGoods(id,num){
        this.$axios({
          method:'post',
          url:`/api/cart/addToCart/${id}/${num}`
        }).then(res=>{
          console.log(res);
        })
      }
    },
    computed:{
      priceSum(){
        var arr = this.goodsList.filter(item=>{
          return item.isChecked
        })
        var sum = 0
        arr.forEach(item=>{
          sum+=item.skuNum*item.skuPrice
        })
        return sum
      },
      goodsSum(){
        var arr = this.goodsList.filter(item=>{
          return item.isChecked
        })
        var sum = 0
        arr.forEach(item=>{
          sum+=item.skuNum
        })
        return sum
      },
      allChecked(){
        var arr = []
        arr = this.goodsList.filter(item=>{
          return item.isChecked==0
        })
        if(arr.length==0&&this.goodsList[0]){
          return true
        }
        return false
        
      }
    },
    mounted(){
      this.getCarList()
    }
  }
</script>

<style lang="less" scoped>
  .cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
      margin: 9px 0;
      font-size: 14px;
      line-height: 21px;
    }

    .cart-main {
      .cart-th {
        background: #f5f5f5;
        border: 1px solid #ddd;
        padding: 10px;
        overflow: hidden;

        &>div {
          float: left;
        }

        .cart-th1 {
          width: 25%;

          input {
            vertical-align: middle;
          }

          span {
            vertical-align: middle;
          }
        }

        .cart-th2 {
          width: 25%;
        }

        .cart-th3,
        .cart-th4,
        .cart-th5,
        .cart-th6 {
          width: 12.5%;

        }
      }

      .cart-body {
        margin: 15px 0;
        border: 1px solid #ddd;

        .cart-list {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          overflow: hidden;

          &>li {
            float: left;
          }

          .cart-list-con1 {
            width: 4.1667%;
          }

          .cart-list-con2 {
            width: 25%;

            img {
              width: 82px;
              height: 82px;
              float: left;
            }

            .item-msg {
              float: left;
              width: 150px;
              margin: 0 10px;
              line-height: 18px;
            }
          }

          .cart-list-con3 {
            width: 20.8333%;

            .item-txt {
              text-align: center;
            }
          }

          .cart-list-con4 {
            width: 12.5%;

          }

          .cart-list-con5 {
            width: 12.5%;

            .mins {
              border: 1px solid #ddd;
              border-right: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }

            input {
              border: 1px solid #ddd;
              width: 40px;
              height: 33px;
              float: left;
              text-align: center;
              font-size: 14px;
            }

            .plus {
              border: 1px solid #ddd;
              border-left: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }
          }

          .cart-list-con6 {
            width: 12.5%;

            .sum {
              font-size: 16px;
            }
          }

          .cart-list-con7 {
            width: 12.5%;

            a {
              color: #666;
            }
          }
        }
      }
    }

    .cart-tool {
      overflow: hidden;
      border: 1px solid #ddd;

      .select-all {
        padding: 10px;
        overflow: hidden;
        float: left;

        span {
          vertical-align: middle;
        }

        input {
          vertical-align: middle;
        }
      }

      .option {
        padding: 10px;
        overflow: hidden;
        float: left;

        a {
          float: left;
          padding: 0 10px;
          color: #666;
        }
      }

      .money-box {
        float: right;

        .chosed {
          line-height: 26px;
          float: left;
          padding: 0 10px;
        }

        .sumprice {
          width: 200px;
          line-height: 22px;
          float: left;
          padding: 0 10px;

          .summoney {
            color: #c81623;
            font-size: 16px;
          }
        }

        .sumbtn {
          float: right;

          a {
            display: block;
            position: relative;
            width: 96px;
            height: 52px;
            line-height: 52px;
            color: #fff;
            text-align: center;
            font-size: 18px;
            font-family: "Microsoft YaHei";
            background: #e1251b;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>