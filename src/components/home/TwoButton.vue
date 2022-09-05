<template>
  <div>
    <el-button
        :style="`{'--fontSize':'${fontSize}'};
        width:${wide}px;
        height:${height}px;
        font-size:${fontSize}px;`"
        class="left"
        :type="`${leftType}`"
        @click="leftShow">
      {{ leftBtValue }}
    </el-button>
    <el-button
        :style="`{'--fontSize':'${fontSize}'};
        width:${wide}px;
        height:${height}px;
        font-size:${fontSize}px;`"
        class="right"
        :type="`${rightType}`"
        @click="rightShow">
      {{ rightBtValue }}
    </el-button>
  </div>
</template>

<script>
export default {
  name: 'TwoButton',
  data() {
    return {}
  },
  props: [
    'leftBtValue',
    'rightBtValue',
    'wide',
    'height',
    'fontSize',
    'leftType',
    'rightType',
      'leftPathName',
      'rightPathName'
  ],
  methods: {
    leftShow() {
      this.$router.push({
        name:this.leftPathName
      })
    },
    rightShow() {
      this.$router.push({
        name:this.rightPathName
      })
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .el-button--medium {
  font-size: var(--fontSize);
}

.left {
  color: #4285f4;
  border-color: #4285f4;
}

.left:hover {
  border-color: #4285f4;
}

.right {
  background-image: linear-gradient(to right, #68a3ff, #257aff);
}

.right:hover {
  background-image: linear-gradient(to right, #68a3ff, #257aff);
}

</style>