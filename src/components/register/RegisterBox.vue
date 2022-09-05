<template>
  <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="register-box demo-ruleForm">
    <div class="head">
      <h2>注册账号</h2>
    </div>
    <div class="inputMsg">
      <el-form-item prop="username">
        <el-input v-model="ruleForm.username" placeholder="请输入邮箱/手机号"></el-input>
      </el-form-item>
      <el-form-item prop="firstPassword">
        <el-input placeholder="请输入密码" v-model="ruleForm.firstPassword" show-password></el-input>
      </el-form-item>
      <el-form-item prop="secondPassword">
        <el-input placeholder="请再次输入密码确认" v-model="ruleForm.password" show-password></el-input>
      </el-form-item>
      <div class="identity">
        <h3>选择身份</h3>
        <div class="identity-img">
          <div class="teacher" ref="teacher" @click="check('teacher')">
            <img src="@/assets/images/teacher.b1111283.svg" alt="#">
            <span>老师</span>
          </div>
          <div class="student" ref="student" @click="check('student')">
            <img src="@/assets/images/student.0ba0711e.svg" alt="#">
            <span>学生</span>
          </div>
        </div>
      </div>
      <el-form-item prop="name">
        <el-input v-model="ruleForm.name" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item prop="school">
        <el-input placeholder="请输入学校/机构" v-model="ruleForm.school"></el-input>
      </el-form-item>
      <el-form-item prop="id" v-if="isTeacher">
        <el-input
            placeholder="请输入学号"
            v-model="ruleForm.stuId"></el-input>
      </el-form-item>
      <el-form-item>
        <div class="com-code">
          <el-input placeholder="请输入计算结果" v-model="code"></el-input>
          <div class="code-img">
            <img :src="codeUrl" alt="加载失败">
          </div>
        </div>
      </el-form-item>
    </div>
    <div class="modal">
      <el-form-item>
        <el-button type="primary" style="height: 48px;width: 100%" @click="submitForm('ruleForm')">注册</el-button>
      </el-form-item>
      <p>已有账号？<a style="color: #4285f4" @click="goLogin">去登录</a></p>
    </div>
  </el-form>
</template>
<script>

import axios from "axios";
import {doPost} from "@/utils/api";
import {mymessage} from "@/utils/myMessage";

export default {
  data() {
    return {
      ruleForm: {
        username: '',
        firstPassword: '',
        password: '',
        name: '',
        school: '',
        stuId: '',
        identity: 'teacher'
      },
      rules: {
        username: [
          {require: true}
        ],
        firstPassword: [
          {require: true}
        ],
        secondPassword: [
          {require: true}
        ],
        name: [
          {require: true}
        ],
        school: [
          {require: true}
        ],
        stuId: [
          {require: true, type: 'number', message: '请输入学号', trigger: 'change'}
        ]
      },

      codeUrl: '',
      code: ''
    }
  },
  props: [],
  computed: {
    isTeacher: {
      get() {
        return this.ruleForm.identity === 'student';
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName][0].validate((valid) => {
        if (valid) {
          if (this.ruleForm.password === this.ruleForm.firstPassword) {
            this.$store.dispatch('user/register', this.ruleForm)
          } else {
            mymessage.error("两次输入的密码不一致！！")
          }
        }else {
          mymessage.error('参数不符合要求!!');
          return false;
        }
      });
    },
    check(type) {
      this.ruleForm.identity = type;
      this.$refs.teacher.style.borderColor = `${this.isTeacher ? "white" : "#68a3ff"}`;
      this.$refs.student.style.borderColor = `${!this.isTeacher ? "white" : "#68a3ff"}`;
    },
    goLogin() {
      this.$router.push({
        name: 'login'
      })
    }
  },
  watch: {},
  mounted() {

  },
  components: {}
}
</script>

<style lang="less" scoped>

a {
  text-decoration: none;
  cursor: pointer;
}

.register-box {
  width: 431px;
  //height: 600px; /*测试*/
  display: block;
  padding: 0 35px;
  background: #fff;
  border: 1px solid #eee;
  box-shadow: 0 0 61px 0 rgb(85 108 144 / 7%);
}

/deep/ .el-input__inner {
  height: 48px;
}

.head {
  padding: 20px 0;
}

.identity h3 {
  margin: 5px 0 20px 0;
  text-align: left;
}

.teacher, .student {
  border: white solid 1px;
  width: 172px;
  height: 60px;
  padding-left: 25px;

  & img {
    width: 42px;
    height: 42px;
    margin-top: 8px;
  }

  & span {
    display: block;
    margin-top: 16px;
    margin-right: 30px;
  }
}

.teacher {
  border-color: #68a3ff;
}

.identity {
  padding-bottom: 15px;
}

.identity-img {
  display: flex;
  gap: 15px;
}

.com-code {
  display: flex;
  gap: 20px;
}

.modal {
  margin-top: 10px;
}

.modal p {
  margin: 15px 0;
  text-align: right;
}

.code-img {
  border: #68a3ff solid;
  border-radius: 10px;
  height: 48px;
  width: 220px;
}
</style>