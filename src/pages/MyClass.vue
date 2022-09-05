<template>
  <div>
    <Nav :isTeacher=isTeacher :logo="logo" ref="nav"/>
    <div class="container">
      <div v-if="hasTopLesson" class="container-top">
        <div class="container-top-top">
          <h2 style="float: left;font-size: 20px">置顶课程</h2>
          <el-button
              type="primary"
              style="font-size: 14px"
              v-text="`${isTeacher?'+创建/加入课程':'加入课程'}`"
              @click="dialogFormVisibleForStu=true"></el-button>
        </div>
        <div class="top-lesson">
          <!--                       置顶课程-->
          <template v-for="part in $store.state.mainAbout.parts">
            <LessonCard v-for="(lesson,ind) in part.lessons" v-if="lesson.isTop" :key="ind"
                        :lesson="lesson"></LessonCard>
          </template>
        </div>
      </div>
      <div v-if="!hasTopLesson"
           class="container-top-top"
           style="border: none">
        <div></div>
        <el-button
            type="primary"
            style="font-size: 14px;"
            v-text="`${isTeacher?'+创建/加入课程':'加入课程'}`"
            @click="dialogFormVisibleForStu=true"></el-button>
      </div>

      <div class="lesson">
        <div class="lesson-nav">
          <el-tabs v-model="activeName" @tab-click="handleClick($event)">
            <template v-if="isTeacher">
              <el-tab-pane label="我教的" name="first"></el-tab-pane>
              <el-tab-pane label="我协助的" name="second"></el-tab-pane>
              <el-tab-pane label="我学的" name="third"></el-tab-pane>
            </template>
            <template v-if="!isTeacher">
              <el-tab-pane label="我学的" name="first"></el-tab-pane>
              <el-tab-pane label="我协助的" name="second"></el-tab-pane>
            </template>
          </el-tabs>
          <div class="right">
            <el-button>归档管理</el-button>
            <el-input
                type="search"
                :v-model="searchValue"
                autocomplete="off"
                :placeholder="`搜索${activeLabel}内容`"/>
            <span class="iconfont">&#xe6e4;</span>
          </div>
        </div>
        <div class="lesson-box">
          <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item v-for="(part,index) in $store.state.mainAbout.parts" :name=index>
              <div class="my-collapse" slot="title">
                <div class="title">{{ part.year }}</div>
                <div>
                  <i class="iconfont" v-html="activeNames.includes(index)?'&#xe602;':'&#xe603;'"></i>
                  <span v-text="activeNames.includes(index)?'收起':'展开'"></span>
                </div>
              </div>
              <LessonCard
                  :isTeacher="isTeacher"
                  v-for="(lesson,ind) in part.lessons" :lesson="lesson" :key=ind></LessonCard>
            </el-collapse-item>
          </el-collapse>
        </div>
      </div>
    </div>
    <!--    侧边-->
    <Side/>
    <!--    学生弹窗-->
    <el-dialog class="join-lesson" title="加入课程" :visible.sync="dialogFormVisibleForStu">
      <el-form :model="ruleForm"
               status-icon
               :rules="rules"
               label-width="50px"
               class="demo-ruleForm">
        <el-form-item label="加课码" :label-width="formLabelWidth" prop="joinLessonCode">
          <el-input
              v-model="ruleForm.joinLessonCode"
              autocomplete="off"
              placeholder="请输入课程加课码">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleForStu = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisibleForStu = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>


</template>

<script>
import Nav from "@/components/main/Nav";
import LessonCard from "@/components/main/LessonCard";
import Side from "@/components/main/Side";

export default {
  name: "MyClass",
  data() {
    return {
      activeName: 'first',
      searchValue: '',
      logo: require("@/assets/images/logo_blue.png"),
      index: '0',
      activeLabel: '我教的',
      activeNames: [],
      dialogFormVisibleForStu: false,
      dialogFormVisibleForTea: false,
      formLabelWidth: '100px',
      ruleForm: {
        joinLessonCode: ''
      },
      rules: {
        joinLessonCode: [
          {required: true, message: '必填项', trigger: 'blur'}
        ]
      }

    }
  },
  computed: {
    hasTopLesson() {
      return this.$store.getters["mainAbout/hasTopLesson"];
    },
    isTeacher() {
      return this.$store.state.mainAbout.isTeacher;
    }
  },
  mounted() {

  },
  components: {
    Nav, LessonCard, Side
  },
  methods: {
    handleClick(tab) {
      this.activeLabel = tab.$options.propsData.label;
    },
    handleChange() {
      console.log(this.activeNames)
    },
    setIndex(index) {
      switch (index) {
        case '1':
          this.$router.push({
            name: "main"
          });
          break;
        case '2':
          this.$router.push({
            // name: "lessonPreparationArea"
            name: "main"
          });
          break;
        case '3':
          this.$router.push({
            // name: "TeachingResearch"
            name: "main"
          });
          break;
        default :
          alert("错误");
      }
    }
  }
}
</script>

<style scoped lang="less">
.container {
  margin: auto;
  position: relative;
  width: 1150px;
}

.container-top {
  border: 1px solid #dadce0;
  padding: 18px;
  border-radius: 5px;
}

.container-top-top {
  display: flex;
  padding-top: 18px;
  padding-bottom: 8px;
  width: 100%;
  justify-content: space-between;
}

.top-lesson {
  max-height: 320px;
  gap: 30px;
  margin: 8px -10px 0;
  display: flex;
  flex-flow: row wrap;
  overflow-y: auto;
}


.lesson-nav {
  padding: 12px 0;
  height: 78px;
}

::v-deep .el-tabs__header {
  float: left;
  width: auto;

}

//             ============================
::v-deep .el-icon-arrow-right:before {
  display: none;
}

//.is-active{
//  transform: rotateX(180deg);
//}
.my-collapse {
  display: flex;
  width: 100%;
  justify-content: space-between;

  & div:nth-child(1) {
    font-size: 16px;
  }

  & div:nth-child(2) {
    font-size: 14px;
    color: #68a3ff;
    transform: translateY(10px);

    & i {
      margin-right: 10px;
      font-size: 13px;
    }
  }
}


.active {
  transform: rotateX(180deg);
}

//::v-deep .el-icon-arrow-right:before{
//  content: "\e603展开";
//  font-size: 14px;
//  color: #68a3ff;
//  font-family: "iconfont";
//}
//::v-deep .el-icon-arrow-right.is-active{
//  transform: rotateX(180deg);
//}
//=========================================================。
::v-deep .el-collapse-item__content {
  text-align: center;
  display: flex;
  gap: 30px;
  align-content: center;
  flex-flow: row wrap;
  overflow-y: auto;
}

::v-deep .lesson-card {
  //flex: 0 0 20%;
}

::v-deep .el-tabs__item {
  font-size: 16px;

  & :hover {
    color: #4285f4;
    cursor: pointer;
  }

}

/deep/ .el-tabs__content {
  display: none;
}

.right {
  //width: 300px;
  position: absolute;
  right: 0;
  padding: 0;

  &::v-deep .el-button {
    margin: 9px 12px 9px 0;
  }

  &::v-deep .el-input {
    font-size: 16px;
    width: 60%;
    margin-right: -20px;
  }

  & span {
    position: absolute;
    line-height: 55px;
    right: 10px;
    color: #c0c4cc;
  }
}


.right ::v-deep .el-input__inner {
  border-radius: 51px;
  height: 36px;
  line-height: 36px;
  width: 100%;
  outline: 0;
  padding: 0 30px 0 15px;
  transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
}

.lesson-box {
  margin-bottom: 24px;

  &::v-deep .el-collapse-item {
    background: #f8f9fa;
    border: 1px solid #dadce0;
    border-radius: 8px;
    padding: 18px;
    margin: 8px -10px 0;
  }

  &::v-deep .el-collapse-item__header {
    height: 25px;
    font-size: 16px;
    color: #000000;
    background: #f8f9fa;
    display: flex;
    flex-flow: nowrap;
    justify-content: space-between;
  }

  &::v-deep .el-collapse-item__content {
    margin-top: 30px;
  }

  & ::v-deep .el-collapse-item__wrap {
    background: #f8f9fa;
    border-bottom: none;
  }

  & ::v-deep .el-collapse-item__header {
    border-bottom: none;
  }


}

::v-deep .el-dialog {
  position: absolute;
  margin-top: 0 !important;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

::v-deep .el-dialog__header {
  padding: 18px 24px;
  border-bottom: 1px solid #dadce0;
}

::v-deep .el-dialog__body {
  padding: 30px 15px 15px 15px;
  color: #606266;
  font-size: 14px;
  word-break: break-all;
}

::v-deep .el-form-item__label {
  padding: 3px 0 0 40px;
  font-size: 12px;
  text-align: left;
  line-height: 36px;
}

::v-deep .el-dialog__footer {
  padding: 10px 20px 10px;
  text-align: right;
  box-sizing: border-box;
  border-top: 1px solid #dadce0;
}

::v-deep .el-icon-close:before {
  font-size: 24px;
}
</style>