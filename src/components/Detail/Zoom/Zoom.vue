<template>
  <div class="spec-preview">
    <img :src="info.skuDefaultImg" />
    <div class="event"></div>
    <div class="big">
      <img :src="info.skuDefaultImg" class="bigImg"/>
    </div>
    <div class="mask"></div>
  </div>
</template>

<script>
  export default {
    name: "Zoom",
    props:['info'],
    methods:{
      
    },
    methods:{
      setFD(){
        window.addEventListener('load', function () {
        var preview_img = document.querySelector('.spec-preview')
        var mask = document.querySelector('.mask')
        var big = document.querySelector('.big')
        // 鼠标经过 preview_img 显示和隐藏 mask 遮挡层 和 big 大盒子
        preview_img.addEventListener('mouseover', function () {
          mask.style.display = 'block'
          big.style.display = 'block'
        })
        preview_img.addEventListener('mouseout', function () {
          mask.style.display = 'none'
          big.style.display = 'none'
        })
        //鼠标移动的时候，遮挡层的盒子跟着鼠标来走
        preview_img.addEventListener('mousemove', function (e) {
          // 计算鼠标在小盒子内的坐标
          var x = e.pageX - this.offsetLeft
          var y = e.pageY - 245
          // mask 移动的距离
          var maskX = x - mask.offsetWidth / 2
          var maskY = y - mask.offsetHeight / 2
          // 遮挡层的最大移动距离
          var maskMaxX = preview_img.offsetWidth - mask.offsetWidth
          var maskMaxY = preview_img.offsetHeight - mask.offsetHeight
          if (maskX <= 0) {
            maskX = 0
          } else if (maskX >= maskMaxX) {
            maskX = maskMaxX
          }
          if (maskY <= 0) {
            maskY = 0
          } else if (maskY >= maskMaxY) {
            maskY = maskMaxY
          }
          mask.style.left = maskX + 'px'
          mask.style.top = maskY + 'px'
          // 大图
          var bigIMg = document.querySelector('.bigImg')
          // 大图片最大移动距离
          var bigMaxX = bigIMg.offsetWidth - big.offsetWidth
          var bigMaxY = bigIMg.offsetHeight - big.offsetHeight
          // 大图片的移动距离 X Y
          var bigX = maskX * bigMaxX / maskMaxX
          var bigY = maskY * bigMaxY / maskMaxY
          bigIMg.style.left = -bigX + 'px'
          bigIMg.style.top = -bigY + 'px'
        })
      })
      }
    },
    mounted(){
      // 放大镜
      this.setFD()
    },
    activated(){
      this.setFD()
    }
  }
</script>

<style lang="less">
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>