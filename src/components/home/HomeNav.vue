<template>
  <div class="nav">
    <el-row>
      <el-col :span="4">
        <div class="logo-img">
          <img src="@/assets/images/logo_blue.png" alt="#">
        </div>
      </el-col>
      
      <el-col :span="12">
        <Tabs :items="tabItems" class="tab"/>
      </el-col>
      
      <el-col :span="8">
        <div class="login">
          <span class="icon iconfont" style="font-size: 14px;color:#606266;margin:10px">&#xeb0d;切换旧版本</span>
          <TwoButton
              :font-size="14"
              :wide="90"
              left-bt-value="登录"
              right-bt-value="注册"
              right-type="primary"
          left-path-name="login"
          right-path-name="register"/>
        </div>
      </el-col>
    </el-row>
  </div>

</template>
<script>
import TwoButton from "@/components/home/TwoButton";
import Tabs from "@/components/home/Tabs";

export default {
  data() {
    return {
      leftBtValue: '登录',
      rightBtValue: '注册',
      tabItems:[
        {
          labelName:'首页',
          turn:'first'
        },
        {
          labelName:'产品功能',
          turn:'second'
        },
        {
          labelName:'机构版',
          turn:'third'
        },
        {
          labelName:'渠道合作',
          turn:'fourth'
        },
        {
          labelName:'会员权益',
          turn:'fifth'
        },
        {
          labelName:'帮助中心',
          turn:'sixth'
        }
      ],
      index:'0'
    }

  },

  components: {
    TwoButton,
    Tabs
  },
  methods:{
    setIndex(index){
      this.index = index;
      console.log(index)
    }
  },

  mounted() {
    // console.log('School',this)
    this.$bus.$on('getIndex',this.setIndex)
  },
  beforeDestroy() {
    this.$bus.$off('getIndex')
  },
}
</script>

<style scoped lang="less">
.nav {
  margin: auto;
  padding: 0;
  width: 1240px;
}
/deep/ .el-tabs__item{
  color: black;
}
.logo-img {
  float: left;
  width: 128px;
  margin-right: 48px;
  padding: 17px 0;
  cursor: pointer;
}

.logo-img img {
  border: none;
  width: 160px;
}

.nav Tabs {
  white-space: nowrap;
  position: relative;
  float: left;
  z-index: 2;
}

.login {
  float: right;
  position: relative;
  display: flex;
  top: 20px;
}
/deep/ .el-button{
  height: 36px;
}
</style>