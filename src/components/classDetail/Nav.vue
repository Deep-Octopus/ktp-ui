<template>
  <div class="nav">
    <div class="side">
      <el-button type="text" @click="menu = true" class="el-icon-s-fold"></el-button>
      <el-drawer
          :modal-append-to-body='false'
          :visible.sync="menu"
          direction="ltr"
          size="20%">
        <div slot="title" class="logo">
          <img :src="logo" alt="#">
        </div>
        <div class="content">
          <ul>
            <li @click="goMyClass">我的课堂</li>
            <li  v-if="isTeacher" @click="goMyClass">备课区</li>
            <li v-if="isTeacher" @click="goMyClass">虚拟教研室</li>
          </ul>
          <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item v-if="isTeacher" title="我教的课程" name="1">
              <template v-for="part in $store.state.user.teachLesson">
                <div class="lesson" v-for="lesson in part.lessons">
                  <el-avatar shape="circle" size="large"></el-avatar>
                  <div class="content">
                    <p class="c-title">{{ lesson.lessonName }}</p>
                    <p class="c-des">{{ lesson.grade }}</p>
                  </div>
                </div>
              </template>

            </el-collapse-item>
            <el-collapse-item title="我学的课程" name="1">
              <template v-for="part in $store.state.user.studyLesson">
                <div class="lesson" v-for="lesson in part.lessons">
                  <el-avatar shape="circle" size="large"></el-avatar>
                  <div class="content">
                    <p class="c-title">{{ lesson.lessonName }}</p>
                    <p class="c-des">{{ lesson.grade }}</p>
                  </div>
                </div>
              </template>

            </el-collapse-item>
            <el-collapse-item title="我协助的课程" name="2">
              <div>
                <template v-for="part in parts">
                  <div class="lesson" v-for="lesson in part.lessons">
                    <el-avatar shape="circle"></el-avatar>
                    <div class="content">
                      <p class="c-title">{{ lesson.lessonName }}</p>
                      <p class="c-des">{{ lesson.grade }}</p>
                    </div>
                  </div>
                </template>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </el-drawer>
    </div>
    <!--    -->
    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ name: 'main' }">我的课堂</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ name: 'classDetail' }">课程内容</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="avatar-area">
      <AvatarArea></AvatarArea>
    </div>

  </div>

</template>
<script>
import Tabs from "@/components/home/Tabs";
import AvatarArea from "@/components/main/AvatarArea";
import Side from "@/components/main/Side";
import th from "element-ui/src/locale/lang/th";

export default {
  name: 'Nav',
  data() {
    return {
      logo: require('@/assets/images/logo_blue.png'),
      menu: false,
      activeNames: [],

    }
  },
  props: [],
  computed: {
    parts() {
      return this.$store.state.mainAbout.parts
    },
    isTeacher(){
      return this.$store.state.user.isTeacher
    }
  },
  methods: {
    goMyClass(){
      this.$router.push({
        name:"main"
      })
    },
    handleChange() {

    }
  },
  watch: {},
  components: {
    Side,
    AvatarArea
  }
}
</script>

<style lang="less" scoped>
.nav {
  height: 64px;
  width: 100%;
  margin-bottom: 12px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  position: fixed;
  background-color: #fff;
  z-index: 999;
  top: 0;
  left: 0;
  padding: 0 28px;
  min-width: 900px;
  flex-flow: row nowrap;
  align-items: center;
  box-shadow: 0 1px 0 0 #dfdfdf;
}

::v-deep .el-breadcrumb__inner {
  font-weight: 400;
  color: black;
  cursor: text;
}

::v-deep .el-breadcrumb__inner.is-link:hover {
  color: black;
  cursor: pointer;
}

::v-deep .el-breadcrumb__item:last-child .el-breadcrumb__inner, .el-breadcrumb__item:last-child .el-breadcrumb__inner a, .el-breadcrumb__item:last-child .el-breadcrumb__inner a:hover, .el-breadcrumb__item:last-child .el-breadcrumb__inner:hover {
  font-weight: 400;
  color: #606266;
  cursor: text;
}

.side ::v-deep .el-icon-s-fold {
  font-size: 24px;
  float: left;
  width: 80px;
  height: 60px;
}

.logo {
  flex: 1;
  display: flex;

  & img {
    display: block;
    margin: 0 auto;
    height: 24px;
    width: 96px;
    border: none;
  }
}
::v-deep .el-drawer{
  z-index: 10000;
}
::v-deep .el-drawer__close-btn {
  border: none;
  cursor: pointer;
  font-size: 20px;
  color: inherit;
  background-color: transparent;

}

::v-deep .el-drawer__header {
  padding: 12px 12px 12px;
  margin: 0;
  flex-flow: row-reverse;
}

.content ul {
  border-right: 0;
  padding-bottom: 12px;
  list-style: none;
  position: relative;
  margin: 10px 0 0 0;
  padding-left: 0;
  cursor: pointer;

  & li {
    padding: 0 12px !important;
    height: 46px;
    line-height: 46px;
    font-size: 16px;
    font-weight: 500;
    color: #1f2023;
  }

  & :hover {
    background-color: #ecf3fe;
  }
}

::v-deep .el-collapse {
  border-top: none;
}

::v-deep .el-collapse-item__header {
  display: flex;
  align-items: center;
  height: 48px;
  line-height: 48px;
  background-color: #fff;
  color: #303133;
  cursor: pointer;
  border-top: none;
  border-bottom: 1px solid #ebeef5;
  font-weight: 500;
  transition: border-bottom-color .3s;
  outline: 0;
  padding: 0 12px;
  font-size: 14px;
}

::v-deep .el-collapse-item__header.is-active {
  border-bottom-color: transparent;
}

.avatar-area {
  float: right;
  display: flex;
  gap: 20px;
  margin-right: 25px;
  margin-top: 7px;
  line-height: 40px;
  color: black;
  font-weight: bold;
  cursor: pointer;
}

.lesson {
  display: flex;
  padding: 0 10px;
}

.content {
  display: block;
  margin-left: 5px;
}

.c-title {
  font-size: 16px;
  font-weight: 500;
  color: #3c4043;
  line-height: 24px;
}

.c-des {
  text-align: left;
  font-size: 14px;
  font-family: PingFangSC, PingFangSC-Regular;
  font-weight: 400;
  color: #74787c;
  line-height: 22px;
}

.breadcrumb {
  flex: 1;
  padding: 0 42px;
  font-size: 14px;
  color: black;
}

::v-deep .el-breadcrumb {
  font-size: 14px;
  line-height: 1;
}
</style>