<template>
  <div class="item-content">
    <img :src="item.imgUrl" alt="#">
    <div class="right">
      <p class="title">
        {{ item.title }}
      </p>
      <p class="detail">
        {{ item.detail }}
      </p>
      <el-button type="primary" style="height: 38px;width: 108px">{{ btValue }}</el-button>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      btValue: '查看详情'
    }
  },
  props: [
    'item'
  ],
  computed: {},
  methods: {},
  watch: {},
  components: {}
}
</script>

<style lang="css" scoped>
.item-content {
  padding: 8px;
  position: relative;
}

img {
  width: 240px;
  height: 320px;
  position: absolute;
  left: 38px;
  top: 40px;
  border-radius: 8px;
  z-index: 1;
}
.right{
  height: 384px;
  box-sizing: border-box;
  background-color: #fff;
  padding: 30px 30px 30px 300px;
  border-radius: 5px;
  box-shadow: 0 0 10px #e7ebf0;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
.detail{
  transform: translate(-30px,-20px);
  text-align: left;
  font-size: 14px;
  line-height: 24px;
  color: #74787c;
}
.title{
  text-align: left;
  font-size: 24px;
  font-weight: 600;
}
</style>