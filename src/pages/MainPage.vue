<template>
  <div>
    <Nav :isTeacher=isTeacher :logo="logo" ref="nav"/>
    <div class="container">
      <div v-if="hasTopLesson" class="container-top">
        <div class="container-top-top">
          <h2  style="float: left;font-size: 20px">置顶课程</h2>
          <el-popover
              :disabled=!isTeacher
              placement="bottom"
              width="150"
              trigger="click">
           <ul class="create-lesson">
             <li @click="$store.state.mainAbout.dialogFormVisibleForCreate=true">创建课堂</li>
             <li @click="$store.state.mainAbout.dialogFormVisibleForJoin=true">加入课堂</li>
           </ul>
            <el-button
                type="primary"
                slot="reference"
                style="font-size: 14px;"
                v-text="`${isTeacher?'+创建/加入课程':'加入课程'}`"
                @click="isTeacher?false:$store.state.mainAbout.dialogFormVisibleForJoin=true"></el-button>
          </el-popover>
        </div>
        <div class="top-lesson">
          <!--                       置顶课程-->
          <template v-if="isTeacher" v-for="part in $store.state.user.teachLesson">
            <LessonCard v-for="(lesson,ind1) in part.lessons" v-if="JSON.parse(lesson.isTop)" :key="ind1" :lesson="lesson"></LessonCard>
          </template>
          <template v-for="part in $store.state.user.studyLesson">
            <LessonCard v-for="(lesson,ind2) in part.lessons" v-if="JSON.parse(lesson.isTop)" :key="lesson.lid" :lesson="lesson"></LessonCard>
          </template>
        </div>
      </div>
      <div v-if="!hasTopLesson"
           class="container-top-top"
           style="border: none">
        <div></div>
        <el-popover
            :disabled=!isTeacher
            placement="bottom"
            width="200"
            trigger="click">
          <ul class="create-lesson">
            <li @click="$store.state.mainAbout.dialogFormVisibleForCreate=true">创建课堂</li>
            <li @click="$store.state.mainAbout.dialogFormVisibleForJoin=true">加入课堂</li>
          </ul>
          <el-button
              type="primary"
              slot="reference"
              style="font-size: 14px;"
              v-text="`${isTeacher?'+创建/加入课程':'加入课程'}`"
              @click="isTeacher?false:$store.state.mainAbout.dialogFormVisibleForJoin=true"></el-button>
        </el-popover>

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
<!--        我学的-->
        <div class="lesson-box" v-if="(!isTeacher&&activeName==='first')||(isTeacher&&activeName==='third')">
          <el-empty v-if="studyLesson.length===0||activeName==='second'" description="暂无数据" :image="emptyPng" :image-size="500"></el-empty>
          <el-collapse v-if="studyLesson.length!==0" v-model="activeNames" @change="handleChange">
            <el-collapse-item v-for="(part,index) in studyLesson" :name=index v-if="part.lessons.length!==0">
              <div class="my-collapse" slot="title">
                <div class="title">{{ part.semester }}</div>
                <div>
                  <i class="iconfont" v-html="activeNames.includes(index)?'&#xe602;':'&#xe603;'"></i>
                  <span v-text="activeNames.includes(index)?'收起':'展开'"></span>
                </div>
              </div>
              <LessonCard
                  :isTeacher="isTeacher"
                  v-for="(lesson,ind) in part.lessons" :lesson="lesson" :key=ind ></LessonCard>
            </el-collapse-item>
          </el-collapse>
        </div>

<!--        我教的-->
        <div class="lesson-box" v-if="isTeacher&&activeName==='first'">
          <el-empty v-if="teachLesson.length===0||activeName==='second'" description="暂无数据" :image="emptyPng" :image-size="500"></el-empty>
          <el-collapse v-if="teachLesson.length!==0" v-model="activeNames" @change="handleChange">
            <el-collapse-item v-for="(part,index) in teachLesson" :name=index v-if="part.lessons.length!==0">
              <div class="my-collapse" slot="title">
                <div class="title">{{ part.semester }}</div>
                <div>
                  <i class="iconfont" v-html="activeNames.includes(index)?'&#xe602;':'&#xe603;'"></i>
                  <span v-text="activeNames.includes(index)?'收起':'展开'"></span>
                </div>
              </div>
              <LessonCard
                  :active-name="activeName"
                  :isTeacher="isTeacher"
                  v-for="(lesson,ind) in part.lessons" :lesson="lesson" :key=ind ></LessonCard>
            </el-collapse-item>
          </el-collapse>
        </div>
      </div>
    </div>
<!--    侧边-->
    <Side/>
<!--    加课对话框-->
    <el-dialog v-dialogDrag class="join-lesson" title="加入课程" :visible.sync="$store.state.mainAbout.dialogFormVisibleForJoin">
    <el-form :model="ruleForm"
             status-icon
             :rules="rules"
             ref="join"
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
      <el-button @click="$store.state.mainAbout.dialogFormVisibleForJoin = false">取 消</el-button>
      <el-button type="primary" @click="submitFormForJoin('join')">确 定</el-button>
    </div>
  </el-dialog>
<!--    创建课程对话框-->
    <el-dialog v-dialogDrag class="create-lesson" title="创建课程" :visible.sync="$store.state.mainAbout.dialogFormVisibleForCreate"  >
      <el-tabs v-model="activeName1">
        <el-tab-pane label="基本信息（必填）" name="first">
          <div>
            <el-form :model="ruleFormForCreate" ref="create" :rules="rulesForCreate">
              <el-form-item label="课程名称" prop="lessonName" label-width="fit-content" class="lesson-name">
                <el-input v-model="ruleFormForCreate.lessonName" :maxlength="50" show-word-limit></el-input>
              </el-form-item>
              <el-form-item label-width="fit-content" label="教学班级" prop="grade" class="lesson-grade">
                <el-input v-model="ruleFormForCreate.grade" :maxlength="50" show-word-limit></el-input>
              </el-form-item>
              <div class="lesson-semester">
                <el-form-item label="选择学年-学期" prop="schoolYear term" >
                  <el-select value="" placeholder="请选择学年" v-model="ruleFormForCreate.schoolYear">
                    <el-option label="2021-2022" value="2021-2022"></el-option>
                    <el-option label="2022-2023" value="2022-2023"></el-option>
                    <el-option label="2023-2024" value="2023-2024"></el-option>
                    <el-option label="2024-2025" value="2024-2025"></el-option>
                    <el-option label="2025-2026" value="2025-2026"></el-option>
                  </el-select>
                  <el-select value="" placeholder="请选择学期" v-model="ruleFormForCreate.term">
                    <el-option label="全年" value="全年"></el-option>
                    <el-option label="第一学期" value="第一学期"></el-option>
                    <el-option label="第二学期" value="第二学期"></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane label="报名设置" name="second">
          <div class="registration-settings">
            <label class="iconfont">报名设置&#xe632;</label>
            <el-switch v-model="openRegistrationSettings"></el-switch>
          </div>
        </el-tab-pane>
      </el-tabs>
      <div slot="footer">
        <el-button @click="$store.state.mainAbout.dialogFormVisibleForCreate = false">取 消</el-button>
        <el-button type="primary" @click="submitFormForCreate('create')">确 定</el-button>
      </div>
    </el-dialog>
  </div>


</template>

<script>
import Nav from "@/components/main/Nav";
import LessonCard from "@/components/main/LessonCard";
import Side from "@/components/main/Side";
import png from "@/assets/images/img_empty.84d0931c.png"
import {mymessage} from "@/utils/myMessage";
import {delSessionStorage, getSessionStorage} from "@/store/auth";

export default {
  name: "Main",
  data() {
    return {
      emptyPng:png,
      activeName: 'first',
      searchValue: '',
      logo: require("@/assets/images/logo_blue.png"),
      index: '0',
      activeLabel: '我教的',
      activeNames: [],

      formLabelWidth: '100px',
      ruleForm:{
        joinLessonCode:''
      },
      rules:{
        joinLessonCode:[
          {required:true, message: '必填项', trigger: 'blur'}
        ]
      },
      activeName1:'first',
      ruleFormForCreate:{
        lessonName:'',
        grade:'',
        schoolYear:'',
        term:''
      },
      rulesForCreate:{
        lessonName:[
          {required:true,trigger:"blur"}
        ],
        grade:[
          {required:true,trigger:"blur"}
        ]
      },


      openRegistrationSettings:false
    }
  },
  computed:{
    teachLesson(){
      return this.$store.state.user.teachLesson;
    },
    studyLesson(){
      return this.$store.state.user.studyLesson;
    },
    hasTopLesson() {
      return this.$store.getters["mainAbout/hasTopLesson"];
    },
    isTeacher(){
      return this.$store.state.user.isTeacher;
    },
    semester(){
      return this.ruleFormForCreate.schoolYear+" "+this.ruleFormForCreate.term;
    }
  },
  mounted() {
    if (getSessionStorage("currentLessonInfo")){
      //清空
      delSessionStorage("currentLessonInfo");
      this.$store.state.homework.homeworks.splice(0,this.$store.state.homework.homeworks.length)
    }
  },
  components: {
    Nav, LessonCard,Side
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
    },
    submitFormForCreate(formName){
      this.$refs[formName].validate((valid) => {
        if (valid){
          this.$store.dispatch("user/createLesson",{
            lessonName:this.ruleFormForCreate.lessonName,
            grade:this.ruleFormForCreate.grade,
            semester:this.semester,
            teacher:this.$store.state.user.userInfo.username
          })
        }else {
          mymessage.error("参数错误")
        }
      })
    },

    submitFormForJoin(formName){
      this.$refs[formName].validate((valid) => {
        if (valid){
          this.$store.dispatch("user/joinLesson",{
            username:this.$store.state.user.userInfo.username,
            lessonCode:this.ruleForm.joinLessonCode,
            identity:"student"
          })
        }else {
          mymessage.error("参数错误")
        }
      })
    }
  },


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
  margin-top: 0!important;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}
::v-deep .el-dialog__header{
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
::v-deep .el-icon-close:before{
  font-size:24px ;
}

.create-lesson{
  list-style: none;
  padding: 5px 0;
  & li{
    list-style: none;
    width: 120%;
    margin-left: -12px;
    height: 30px;
    text-align: center;
    padding-top: 5px;
    cursor: pointer;
  }
  & li:hover{
     background-color: #ecf3fe;
     color: #68a3ff;
   }
}





.create-lesson{
  &::v-deep .el-tabs__content {
    display: block;
  }
  & ::v-deep .el-tabs__nav-wrap::after{
    display: none;
  }
  & ::v-deep .el-tabs__header{
    float: none;
  }
  & ::v-deep .el-form-item{
    //display: flex;
    //justify-content: left;
  }
  & ::v-deep .el-input{
    width: 80%;
  }
}
.registration-settings{
  display: flex;
  justify-content: left;
  gap: 50px;
}
</style>