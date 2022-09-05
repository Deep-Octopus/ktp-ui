<template>
  <LoginModel :large-img="largeImg" :logo-img="logo" class="container">
    <RegisterBox/>
  </LoginModel>
</template>
<script>
import LoginModel from "@/components/login/LoginModel";
import RegisterBox from "@/components/register/RegisterBox";
export default{
  data() {
    return {
      largeImg:require('@/assets/images/bgregister.png'),
      logo:require('@/assets/images/logo_blue.png')
    }
  },
  components: {
    LoginModel,RegisterBox
  }
}
</script>

<style lang="less" scoped>
.container /deep/ .large-img-box{
  width: 100px;
}
/deep/ .right{
  transform:translateY(-60%);
}


</style>