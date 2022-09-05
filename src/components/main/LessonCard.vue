<template>
  <div class="lesson-card" >
    <div class="header-info"
    ref="header-info"
    @click="goDetail">
      <p class="time">{{ lesson.semester }}</p>
      <h3 title="熟悉  互动课堂" class="lesson-name">{{ lesson.lessonName }}</h3>
      <p class="class-name">201</p>
      <div class="qrcode">
        <img src='@/assets/images/qr.0b314396.svg'>
        <el-popover
            v-if="$store.state.mainAbout.isTeacher"
            placement="bottom"
            width="150"
            trigger="click">
          <ul class="operate">
            <li>停用</li>
            <li>重置</li>
          </ul>
          <div class="dropdown" slot="reference">
          <span style="color: rgb(255, 255, 255);cursor: pointer">
            课堂码: {{ lesson.lessonCode }}
            <i class="iconfont">&#xe6aa;</i>
          </span>
          </div>
        </el-popover>
        <div v-if="!$store.state.mainAbout.isTeacher" class="dropdown" slot="reference">
          <span style="color: rgb(255, 255, 255);cursor: pointer">
            课堂码: {{ lesson.lessonCode }}
          </span>
        </div>
      </div>
    </div>
    <!--    -->
    <div class="content-info">


    </div>
    <div class="user-info">
      <div class="left">
        <span>
          <span v-if="isTeacher">成员{{ lesson.numOfStudent }}人</span>
          <span v-if="!isTeacher">
            <span v-if="lesson.isTop" style="
            border: #68a3ff solid 1px;
            color: #68a3ff;
            padding: 2px 3px;
            border-radius: 3px;
            margin-right: 5px">学</span>
            负责人:{{ lesson.principal }}
          </span>
        </span>
      </div>
      <div class="right">
        <div class="setTop">
          <div v-if="!JSON.parse(lesson.isTop)" @click="setTop">
            <img src="@/assets/images/top.6cb08607.svg">
            置顶
          </div>
          <div v-if="JSON.parse(lesson.isTop)" @click="setTop">
            取消置顶
          </div>
        </div>
        <el-popover
            placement="bottom"
            width="132"
            trigger="click">
          <ul class="operate" v-if="isTeacher">
            <li @click="deleteLesson">删除</li>
            <li>编辑</li>
            <li>归档</li>
            <li>复制成新课程</li>
            <li>复制到已有课程</li>
            <li>打包下载</li>
            <li>复制到教研室</li>
            <li>转让</li>
          </ul>
          <ul class="operate" v-if="!isTeacher">
            <li @click="dropOut">退课</li>
            <li>归档</li>
          </ul>

          <div class="more" slot="reference">
            <img src="@/assets/images/and-so-on.svg">
          </div>
        </el-popover>

      </div>
    </div>
  </div>
</template>
<script>


import {mymessage} from "@/utils/myMessage";
import {getSessionStorage, setSessionStorage} from "@/store/auth";

export default {
  data() {
    return {

      imgS:[
        require('../../assets/images/海绵宝宝.jpg'),
        require('../../assets/images/海绵宝宝2.jpg'),
        require('../../assets/images/海绵宝宝3.jpg'),
        require('../../assets/images/海绵宝宝4.jpg'),
        require('../../assets/images/人.jpg'),
        require('../../assets/images/哑铃.png'),
        require('../../assets/images/flash6451.jpg'),
        require('../../assets/images/熊.jpg'),
      ],

    }
  },
  props: [
    //  vuex
    'lesson',
      'activeName'

  ],
  computed: {
    isTeacher(){
      //去vuex找
      let teachLessons = getSessionStorage("teachLesson")
      for (let i = 0; i < teachLessons.length; i++) {
        if (teachLessons[i].lessonCode===this.lesson.lessonCode){
          return true;
        }
      }
      return false;
      // return this.$store.state.user.isTeacher
    }
  },
  methods: {
    getRandomImg(){
      return this.imgS[parseInt(Math.random()*9+'')]
    },
    setTop(){
      this.$store.dispatch("user/setTop",{
        isTop:(!JSON.parse(this.lesson.isTop)).toString(),
        lessonCode:this.lesson.lessonCode,
        username:this.$store.state.user.userInfo.username
      })
    },
    goDetail(){
      setSessionStorage("currentLessonInfo",JSON.stringify({
        lesson:this.lesson,
        isTeacher:this.isTeacher
      }))
      this.$router.push({
        name:'classDetail'
      })
    },
    dropOut(){
      if (confirm("你确定退出该课吗")){
        this.$store.dispatch("user/dropOut",{
          username:this.$store.state.user.userInfo.username,
          lessonCode:this.lesson.lessonCode
        })
      }
    },
    deleteLesson(){
      if (this.$store.state.user.isTeacher){
        if (confirm("您确定删除该课程吗")){
          this.$store.dispatch("user/deleteLesson",{
            username:this.$store.state.user.userInfo.username,
            lessonCode:this.lesson.lessonCode,
          })
        }
      }else {
        mymessage.error("抱歉，您没有操作权限")
      }

    }
  },
  watch: {},
  components: {},
  mounted() {
    this.$refs["header-info"].style.backgroundImage=`url("${this.getRandomImg()}")`;
    this.$refs["header-info"].style.backgroundColor=`rgba(${parseInt(Math.random()*256+'')},
    ${parseInt(Math.random()*256+'')},${parseInt(Math.random()*240+'')},${0.9})`;
  }
}
</script>

<style lang="less" scoped>
* {
  outline: none;
  font: inherit;
  font-weight: 400;
  vertical-align: baseline;
  font-family: Roboto, Helvetica, Arial, sans-serif;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

.lesson-card {
  width: 255px;
  height: 234px;
  background: #fff;
  border: 1px solid #e2e6ed;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
}

.header-info {
  text-align: left;
  cursor: pointer;
  padding: 18px 24px;
  height: 152px;
  color: #fff;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50%;
  background-blend-mode:multiply;

  & .time {
    font-size: 12px;
    opacity: .6;
  }

  & .lesson-name {
    font-size: 18px;
  }

  & .class-name {
    font-weight: 500;
    text-align: left;
    color: #fff;
    line-height: 24px;
    font-size: 12px;
  }

  & .qrcode {
    margin-top: 18px;
    display: flex;
    position: relative;
    font-size: 12px;
    font-weight: 500;
    text-align: left;
    color: #fff;
    line-height: 16px;

    & img {
      margin: 0 10px 0 0;
    }

    & .dropdown {
      font-size: 16px;
      //transform: translateY(2px);
    }
  }
}

.content-info {
  cursor: pointer;
  height: 40px;
  padding: 0 20px 16px 20px;
}

.user-info {
  font-family: PingFangSC, PingFangSC-Regular, serif;
  font-weight: 400;
  text-align: left;
  color: #3c4043;
  display: flex;
  justify-content: space-between;
  height: 40px;
  padding: 8px 14px 12px;
  font-size: 12px;
  line-height: 16px;

  &.left, .right {
    display: flex;
    align-items: center;
    cursor: pointer;
    flex-wrap: wrap;

    & .setTop div {
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 3px;
    }

    & img {
      margin: 0;
      display: block;
      width: 14px;
    }

  }
}

.more {
  display: inline-block;
  cursor: pointer;
  margin-left: 11px;
  position: relative;
  color: #606266;
  font-size: 14px;
}

.operate {
  margin: -6px -12px;

  & li {
    padding: 0 17px;
    height: 30px;
    font-size: 14px;
    line-height: 32px;

    &:hover {
      background-color: #ecf3fe;
      color: #68a3ff;
    }
  }
}
</style>