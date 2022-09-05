<template>
<div class="welcome">
<div class="content">
  <div class="head">
    {{title}}
  </div>
  <div class="detail">
    {{detail}}
  </div>
  <div class="buttonContent">
    <TwoButton
        :height="40"
        :wide="120"
        :left-bt-value="`${btLeftValue}`"
        :right-bt-value="`${btRightValue}`"
        right-path-name="register"
        />
  </div>
</div>
</div>

</template>
<script>
import TwoButton from "@/components/home/TwoButton";
export default {
  components:{
    TwoButton
  },
  props:[
    'title',
    'detail',
      'btLeftValue',
      'btRightValue'
  ]

}
</script>

<style scoped lang="less">
.welcome{
  background-image: url("../../assets/images/welcome-bg.1865e6b9.jpg");
  background-position: 50%;
  height: 400px;
  width: 100%;
  position: relative;
  overflow: hidden;
  margin: 0 auto;
  display: flex;
  justify-content: center;
}
.content{
  margin-top:88px ;
}
.head{
  font-weight: 500;
  line-height: 48px;
  font-size: 48px;
  color: white;
}
.detail{
  font-size: 20px;
  margin-top: 24px;
  margin-bottom: 37px;
  color: white;
}
TwoButton{
  display: flex;
  justify-content: space-around;
}
/deep/.left{
  background-color: #5393ff;
  color: white;
  border-color: white;
}
/deep/.left:hover{
  border-color: white;
}
/deep/.right{
  background-image:none;
  color: #5293ff;
  background-color: white;
}
/deep/.right:hover{
  background-image:none;
  color: #5293ff;
  background-color: white;
}
</style>