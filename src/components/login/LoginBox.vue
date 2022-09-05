<template>
  <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm"  class="login-box demo-ruleForm">

    <h2 class="head-title">
      <span>{{ headTitle }}</span>
    </h2>

    <el-tabs :model="activeName" class="login-way" @tab-click="handelClick">
      <el-tab-pane :label="ways[0]" name="0">
        <div>
          <el-form-item prop="username">
            <el-input v-model="ruleForm.username" placeholder="请输入邮箱/手机号/账号"></el-input>
          </el-form-item>
          <el-form-item prop="password" >
            <el-input placeholder="请输入密码" v-model="ruleForm.password" show-password auto-complete="off"></el-input>
          </el-form-item>
        </div>
      </el-tab-pane>
      <el-tab-pane :label="ways[1]" name="1">
        <div>
          <el-form-item prop="phoneNumber">
            <el-input v-model="ruleForm.phoneNumber" placeholder="请输入手机号" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item prop="verificationCode">
            <div class="ver-code">
              <el-input v-model="ruleForm.verificationCode" placeholder="请输入验证码"></el-input>
              <el-button type="primary" style="height: 48px">发送验证码</el-button>
            </div>
          </el-form-item>

        </div>
      </el-tab-pane>
      <el-tab-pane :label="ways[2]" name="2">
        <!--          二维码-->
        <div class="QR-code">
          <img src="" alt="#">
          <div v-if="needMask" class="mask">
            <div class="maskIcon">
              <i class="iconfont">&#xe62f;</i>
              <p>已失效，请刷新</p>
            </div>
          </div>
        </div>
        <div class="code-bottom">
          <p>二维码两分钟后失效</p>
          <el-checkbox style="float: left;margin-top: 15px;margin-left: 50px">下次自动登录</el-checkbox>
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-form-item>
    <div v-if="!loginByWX" class="footer">
      <el-checkbox v-model="checked" style="float: left">下次自动登录</el-checkbox>
      <a  style="float: right" @click="goForgot">忘记密码？</a>

        <el-button
            type="primary"
            style="height: 48px;
          margin-top: 20px;
          width: 100%"
        @click="submitForm('ruleForm')">登录
        </el-button>

      <div class="toRegister">
        还没有账号？<a style="color: #4285f4" @click="goRegister">去注册</a>
      </div>
    </div>
    </el-form-item>
  </el-form>
</template>
<script>

export default {
  data() {

    return {
      activeName: '1',
      headTitle: '账号登录',
      ways: [
        '账号登录',
        '手机号登录',
        '微信登录'
      ],
      checked: false,
      loginByWX: false,
      needMask: true,

      ruleForm:{
        username: '',
        password: '',
        phoneNumber: '',
        verificationCode: '',
      },
      rules:{
        username:[
          {trigger: 'blur'}
        ],
        password:[
          { required:true, trigger: 'blur'}
          // { validator:validatePass, trigger: 'blur'}
        ],
        phoneNumber:[
          // { required:true, trigger: 'blur'}

          // {validator:checkPhoneNumber, trigger: 'blur'}
        ],
        verificationCode:[
          {trigger: 'blur'}
        ]
      }
    }
  },
  props: [],
  computed: {},
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.dispatch("user/login",this.ruleForm)
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    getAccount() {
      return this.account.replaceAll(" ", "");
    },
    getPhoneNumber() {
      return this.phoneNumber.replaceAll(" ", "");
    },
    handelClick(tab) {
      this.$emit("turn", tab);
      this.loginByWX = tab.index === "2";
    },
    goRegister() {
      this.$router.push({
        name: 'register'
      })
    },
    goForgot(){
      this.$router.push({
        name:'forgot'
      })
    }
  },
  watch: {},
}
</script>

<style lang="less" scoped>
a {
  cursor: pointer;
}

.login-way /deep/ .el-tabs__item {
  //margin: 0 18px;
  color: #818788;
  line-height: 88px;
  height: 80px;
  font-size: 18px;
}

::v-deep .el-tabs__item {
  padding-right: 40px; //此属性可使得激活的下划线和文字对齐
}

::v-deep .el-tabs__nav {
  //margin-left: 25px;
}

.login-way /deep/ .el-tabs__nav-wrap::after {
  display: none;
}

.login-way, .footer {
  margin: auto;
  width: 360px;
}

::v-deep .el-input__inner {
  height: 48px;
}

.login-box {
  padding: 10px;
  width: 431px;
  //box-shadow: 0 0 61px 0 rgb(85 108 144 / 7%);
  background: #fff;
  //border: 1px solid #eee;

}

.head-title {
  margin-top: 15px;
}


.ver-code {
  display: flex;
  gap: 15px;
}

.footer {
  //margin-top: 20px;
}

a {
  text-decoration: none;
}

.toRegister {
  margin: 20px 0 60px 0;
  float: right;
}

.QR-code {
  margin: auto;
  width: 300px;
  height: 300px;
  border: #68a3ff solid;
}

.code-bottom {
  margin-top: 10px;

}

.code-bottom p {
  font-weight: bold;
}

.mask {
  border: #1f2023 solid;
  position: absolute;
  background-color: black;
  opacity: 0.9;
  width: 300px;
  height: 300px;
  transition: opacity .3s;
  z-index: 10;
}

.maskIcon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #4285f4;
  opacity: 1;
  z-index: 110;
}

</style>