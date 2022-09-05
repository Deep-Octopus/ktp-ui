<template>
  <ul>
    <li v-for="item in items" class="box">
      <div class="heading">
        <img :src="item.imgUrl" alt="#">
      </div>
      <div class="title">{{ item.title }}</div>
      <div class="detail">{{ item.detail }}</div>
    </li>
  </ul>
</template>
<script>

import TwoButton from "@/components/home/TwoButton";
export default {
  components: {TwoButton},
  data() {
    return {}
  },
  props: [
    'items'
  ],

}
</script>

<style lang="css" scoped>
li, ul {
  list-style-type: none;
}

ul {
  width: 100%;
  font-family: PingFangSC, PingFangSC-Medium, serif;
  min-width: 1200px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  align-content: flex-start;
}

li {
  display: list-item;
  height: 300px;
  text-align: center;
  width: 300px;
  background: linear-gradient(180deg, #fff, #f4f8ff 130%);
  border-radius: 8px 8px 0 8px;
  margin-top: 24px;
  padding: 40px 24px;

}

img {
  width: 64px;
  height: 64px;
  display: block;
  margin: 0 auto;
}

.heading {
  width: 64px;
  margin: 0 auto 24px auto;
  height: 64px;
}

.title {
  font-weight: 600;
  color: #1f2023;
  font-size: 24px;
  margin-bottom: 8px;
}

.detail {
  font-size: 14px;
  color: #74787c;
  line-height: 24px;
}

</style>