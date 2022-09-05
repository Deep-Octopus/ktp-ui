<template>
  <LoginModel :logo-img=logoImg>
    <div>
      <ForgotBox/>
    </div>
  </LoginModel>
</template>
<script>
import LoginModel from "@/components/login/LoginModel";
import ForgotBox from "@/components/forgot/ForgotBox";

export default {
  data() {
    return {
      logoImg:require('@/assets/images/logo_blue.png')
    }
  },
  props: [],
  computed: {},
  methods: {},
  watch: {},
  components: {
    ForgotBox,
    LoginModel
  }
}
</script>

<style lang="less" scoped>
::v-deep .right{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-500%);
  z-index: 999;
  background: rgb(255, 255, 255);
  border: 1px solid rgb(238, 238, 238);
  box-shadow: rgb(85 108 144 / 7%) 0px 0px 61px 0px;
}

</style>