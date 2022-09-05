<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane v-for="item in items" :label="item.labelName" :name="item.turn">
      <slot></slot>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
export default {
  data() {
    return {
      activeName: 'first',
      index:"0"
    };
  },
  props:[
    "items"
  ],
  methods: {
    handleClick(tab) {
      this.index = tab.index;
    }
  }
}
</script>
<style lang="less" scoped>
/deep/ .el-tabs__item {
  height: 84px;
  line-height: 88px;
  font-size: 18px;
}

/deep/ .el-tabs__active-bar {
  height: 4px;
}

/deep/ .el-tabs__nav-wrap::after {
  height: 4px;
  background-color: white;
}
/deep/ .el-tabs__content{
  display: none;
}
/deep/ .el-tabs__nav-wrap {
  margin-bottom: -20px;
}
</style>