<template>
  <div class="all">
    <div v-if=logoImg class="logo-box">
      <img :src="logoImg" alt="logo">
    </div>
    <div class="content">
      <div v-if=largeImg class="large-img-box">
        <img :src="largeImg" alt="largeImg">
      </div>
      <div class="right">
        <!--        放入登录或者注册盒子组件-->
        <slot></slot>
      </div>
    </div>
  </div>

</template>
<script>

export default {
  data() {
    return {}
  },
  props: [
    'logoImg',
    'largeImg',
  ],
  computed: {},
  methods: {},
  watch: {},
  components: {}
}
</script>

<style lang="css" scoped>
.all {
  width: 1455px;
}

.logo-box {
  width: 140px;
  height: 40px;
  position: absolute;
  margin: 65px;
  z-index: 1;
}

.logo-box img {
  margin: 0;
  width: 100%;
  border-style: none;
}
.content{
  position: absolute;
  top: 50%;
  left: 50%;
  transform:translate(-50%,-50%);
  width: 100%;
  z-index: -1;
}
.large-img-box{
  margin-left:180px ;
}
.large-img-box img{
  display: block;
  height: auto;
  width: 800px;
}
.right{
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 431px;
  height:100%;
  right: 200px;
  padding: 10px 0;
  background: #fff;;
  /*border: 1px solid #eee;*/
  z-index: 2;
  box-shadow: rgb(85 108 144 / 7%) 0 0 61px 0;
}
</style>