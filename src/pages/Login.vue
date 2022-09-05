<template>
  <LoginModel :large-img="largeImg" :logo-img="logo" class="container">
    <div>
      <LoginBox @turn="change" ref="loginBox"/>
      <div class="changeIcon">
        <img src="@/assets/images/电脑二维码.png" alt="#" ref="turnImg" @click="changeWay">
      </div>
    </div>

  </LoginModel>

</template>
<script>
import LoginModel from "@/components/login/LoginModel";
import LoginBox from "@/components/login/LoginBox";

export default {
  name: 'Login',
  data() {
    return {
      largeImg: require('@/assets/images/bgLogin (1).png'),
      logo: require('@/assets/images/logo_blue.png')
    }
  },
  components: {LoginModel, LoginBox},
  methods: {
    change(tab) {
      this.$refs.turnImg.style.transform =
          `rotateY(180deg) translateY(${tab.index === "2" ? -160 : 0}px) `;
    },
    changeWay(){
      let insert = this.$refs.loginBox.activeName = this.$refs.loginBox.activeName==="third"?"first":"third";
      this.$refs.loginBox.loginByWX = insert==="third";
      this.change({index:insert==="third"?"2":"0"});
      // this.$refs.loginBox.$emit('tab-click');
    }
  }
}
</script>

<style lang="css">
.container {
  width: 70px;
  height: 70px;
}

.changeIcon {
  position: absolute;
  border: #1f2023 solid;
  height: 80px;
  width: 80px;
  bottom: 0;
  overflow: hidden;
}

.changeIcon img {
  cursor: pointer;
  margin-top: -5px;
  transform: rotateY(180deg);
  height: 320px;
  width: 80px;
  /*transform: rotate(90deg);*/
}
</style>