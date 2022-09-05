<template>
  <ul>
    <li v-for="item in items">
      <div class="title">
        <img src="@/assets/images/圆圈.png" alt="#">
        {{item.title}}
      </div>
      <div class="detail">
        {{item.detail}}
      </div>
    </li>
  </ul>
</template>
<script>
export default{
  props:[
      'items'
  ],
}
</script>

<style lang="css">
ul{
  text-align: left;
}
li{
  list-style-type: none;
}
img{
  margin-top: 10px;
  margin-right: 10px;
  width: 20px;
  float: left;
}
.title {
  margin-top: 20px;
  line-height: 40px;
  font-weight: 600;
  color: #1f2023;
  font-size: 24px;
  margin-bottom: 8px;
}
.detail {
  margin-left: 30px;
  font-size: 18px;
  color: #74787c;
  line-height: 35px;
}


</style>