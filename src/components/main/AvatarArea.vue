<template>
  <div class="avatar-area">
    <span class="iconfont">&#xe60a;</span>
    <el-popover
        placement="bottom-end"
        width="430"
        trigger="click">
      <div class="popover">
        <Tabs :items="items"/>
        <div class="msgList">
          <ul>
            <li></li>
          </ul>
        </div>
        <div class="footer">
          <div class="left"><span class="iconfont">&#xe63d;</span>
            <p>一键标为已读</p></div>
          <div class="right"><span class="iconfont">&#xe62b;</span>
            <p>查看全部</p></div>
        </div>
      </div>

      <span class="iconfont" slot="reference">&#xe61d;</span>
    </el-popover>
    <el-popover
        placement="bottom"
        width="150"
        trigger="click">
      <div class="list">
        <ul>
          <li><span class="iconfont">&#xe6ee;</span>开通VIP</li>
          <li><span class="iconfont">&#xe6b6;</span>机构用户认证</li>
          <li><span class="iconfont">&#xe601;</span>个人设置</li>
          <li @click="logout"><span class="iconfont">&#xe630;</span>退出登录</li>
        </ul>
      </div>
      <el-avatar shape="circle" size="medium" :src="avatarUrl" slot="reference"/>
    </el-popover>
  </div>
</template>

<script>
import Tabs from "@/components/home/Tabs";
import store from "@/store";



export default {
  name: "AvatarArea",
  data() {
    return {
      items: [
        {
          labelName: '全部',
          turn: 'first'
        },
        {
          labelName: '教学活动',
          turn: 'second'
        },
        {
          labelName: '教务通知',
          turn: 'third'
        },
        {
          labelName: '系统通知',
          turn: 'fourth'
        }
      ]
    }
  },
  props: [
    'avatarUrl'
  ],
  components: {
    Tabs
  },
  methods:{
    logout(){
      this.$store.dispatch("user/logout")
    }
  }

}
</script>

<style lang="less" scoped>
/deep/ .el-tabs__item {
  height: 70px;
  line-height: 88px;
  font-size: 18px;
}

/deep/ .el-tabs__active-bar {
  height: 2px;
}

/deep/ .el-tabs__nav-wrap::after {
  height: 2px;
  background-color: white;
}

/deep/ .el-popover {
  padding: 0 !important;
}

.popover {
  padding: 0 13px;
}

.msgList {
  height: 200px;
  border: black solid;
}

.footer {
  display: flex;
  gap: 50px;
}

.left, .right {
  cursor: pointer;
  color: #68a3ff;
  display: flex;
  gap: 3px;
  padding: 20px;

  & p {
    margin-top: 5px;
  }
}

.list ul {
  margin: 10px -12px;

  & li:hover {
    background-color: rgb(232, 240, 255);
  }
}

.list ul li {
  width: 100%;
  height: 40px;
  cursor: pointer;
  & span {
    margin-left: 20px;
    margin-right: 10px;
  }
}

</style>