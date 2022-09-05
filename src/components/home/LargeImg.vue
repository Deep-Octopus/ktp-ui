<template>
  <el-carousel arrow="never" trigger="click" height="150px">
    <el-carousel-item>
      <div class="imgBg">
      </div>
<!--      <img src="" alt="#">-->
    </el-carousel-item>
  </el-carousel>
</template>

<script>

</script>

<style lang="less" scoped>
/deep/ .el-carousel__container {
  height: 470px!important;
}
.imgBg{
  background-image: url("../../assets/images/banner-home10.89c5c9ad.png");
  //min-width: 100%;
  height: 470px;
  background-position: 50%;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>