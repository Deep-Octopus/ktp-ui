<template>
  <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
  <div class="forgot-box">
    <h2>忘记密码</h2>

      <el-form-item prop="account">
        <el-input
            v-model="ruleForm.account"
            placeholder="请输入邮箱/手机号/账号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width: 100%;height: 48px">{{btValue}}</el-button>
      </el-form-item>
      <div style="float: right">
        <p>以上方式均不可用您可以申述？<a style="color: #68a3ff">{{otherWay}}</a></p>
      </div>
  </div>
  </el-form>
</template>
<script>


export default {
  data() {
    return {
      ruleForm: {
        account:""
      },
      rules: {
        account: [
          {require:true,message:'格式不正确',trigger:blur}
        ],

      },
      btValue:'下一步',
      otherWay:'申述'
    }
  },
  props: [],
  computed: {},
  methods: {},
  watch: {},
  components: {}
}
</script>

<style lang="less" scoped>
::v-deep .el-input__inner {
  height: 48px;
}

.forgot-box{
  //position: relative;
  padding: 10px;
  width: 431px;
  //box-shadow: 0 0 61px 0 rgb(85 108 144 / 7%);
  background: #fff;
  & h2{
    ont-size: 22px;
    line-height: 32px;
    color: rgb(31, 32, 35);
  }
}

</style>