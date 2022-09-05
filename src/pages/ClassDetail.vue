<template>
  <div>
    <Nav/>
    <div class="container">
      <div class="header">
        <div class="head-layout">
          <img>
          <div class="head-top">
            <div class="left">
              <h1>{{ lesson.lessonName }}</h1>
              <h2>{{ lesson.grade }}</h2>
              <div class="code">
              <span>
                <i class="iconfont">&#xe600;</i>
                 加课码
                <span>{{ lesson.lessonCode }}</span>
              </span>
                <span>已有{{ lesson.numOfStudent }}人加入</span>
              </div>
            </div>
            <div class="right">
              <div v-if="isTeacher" class="lesson-setting">
                <ul>
                  <li class="iconfont">&#xe601; 课程设置</li>
                  <li class="iconfont">&#xe60c; 课堂评价</li>
                  <li class="iconfont">&#xeabe; 打包下载</li>
                  <li class="iconfont">&#xe631; 成员管理</li>
                  <li class="iconfont">&#xe666; 更换皮肤</li>
                </ul>
              </div>
              <div v-if="isTeacher">
                <span class="iconfont" style="font-size: 14px">&#xe62b;学生视角</span>
                <span class="iconfont" style="font-size: 14px">&#xed2e;分享 & 评审</span>
                <span>
                <el-button round>
                <i class="iconfont" style="margin-right: 10px">&#xe8a3;</i>
                <span>开始上课</span>
              </el-button>
              </span>
              </div>
              <div v-if="!isTeacher">
                <el-button round disabled class="notLesson">
                  <i class="iconfont" style="margin-right: 10px">&#xe8a3;</i>
                  <span>暂无课堂</span>
                </el-button>
              </div>
            </div>
          </div>
          <div class="header-footer">
            <!--        解决tabs卡死问题-->
            <div class="block">&nbsp;</div>
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane :label="`课程${isTeacher?'教学':'学习'}`" name="first"></el-tab-pane>
              <el-tab-pane label="学情分析" name="second"></el-tab-pane>
              <el-tab-pane label="成绩管理" name="third"></el-tab-pane>
              <el-tab-pane :label="`${isTeacher?'课程达成度':'课程介绍'}`" name="fourth"></el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </div>

      <!--    -->
      <div class="detail">
        <div class="detail-nav">
          <el-row>
            <el-col :span=24>
              <div v-if="isTeacher" class="custom-made">
                <span class="iconfont">&#xe60c; 定制</span>
              </div>
              <el-tabs v-model="activeName2">
                <el-tab-pane v-if="isTeacher" label="目录" name="0"/>
                <el-tab-pane
                    v-for="(item,index) in detailItems"
                    :label="item"
                    :name="`${index+1}`">
                  <div v-if="item==='作业'">
                    <div class="head-box">
                      <span style="font-size: 14px">共{{ numOfHomeworks }}个活动</span>
                      <div v-if="isTeacher" class="teacher-all-operate">
                        <ul>
                          <li class="iconfont">&#xe604;排序</li>
                          <li>
                            <el-button><span class="iconfont" style="font-size: 14px">&#xe61b;</span><span
                                style="font-size: 14px">批量操作</span></el-button>
                          </li>
                          <li class="iconfont">&#xe856;下载所有作业&#xe6aa;</li>

                          <li>
                            <el-button type="success" round @click="$store.state.homework.dialogFormVisibleForAdd=true">
                              + 添加作业
                            </el-button>
                          </li>
                        </ul>
                        <!--                      添加作业-->
                        <el-dialog v-dialogDrag class="add-homework-dialog" title="添加作业"
                                   :visible.sync="$store.state.homework.dialogFormVisibleForAdd">
                          <el-divider/>
                          <el-form :model="ruleForm"
                                   status-icon
                                   :rules="rules"
                                   ref="addHomework"
                                   label-width="50px"
                                   class="demo-ruleForm add-homework-form">

                            <div class="import-homework">
                              <i class="iconfont">&#xe60d;</i>导入作业
                            </div>
                            <el-form-item label="作业类型" label-width="fit-content">
                              <el-radio-group v-model="ruleForm.resource">
                                <el-radio label="个人作业"></el-radio>
                                <el-radio label="小组作业"></el-radio>
                                <el-radio label="评审型作业"></el-radio>
                                <div class="vip">
                                  <span>
                                    <i class="iconfont" style="font-size: 24px;color: red">&#xe65b;</i>
                                    <i class="iconfont" style="font-size: 20px">&#xe632;</i>
                                  </span>
                                </div>
                              </el-radio-group>
                            </el-form-item>
                            <el-form-item prop="title" label="作业标题" label-width="fit-content">
                              <el-input
                                  placeholder="作业标题"
                                  v-model="ruleForm.title"
                                  :maxlength=70
                                  show-word-limit></el-input>
                            </el-form-item>
                            <el-form-item label="作业描述" prop="homeworkDescription" label-width="fit-content">
                              <el-input type="textarea" v-model="ruleForm.homeworkDescription"></el-input>
                              <el-upload
                                  class="upload-demo"
                                  style="border: #68a3ff dotted;width: fit-content;margin-left:400px;height: fit-content"
                                  :action=uploadUrl
                                  :autoUpload=false
                                  :on-preview="handlePreview"
                                  :on-remove="handleRemove"
                                  :before-remove="beforeRemove"
                                  :on-success="uploadSuccess"
                                  multiple
                                  :limit="1"
                                  :on-exceed="handleExceed"
                                  :file-list="fileList"
                                  ref="attachments">
                                <el-button size="small" type="text" style="width: 100%">
                                  <span class="iconfont" style="font-size: 24px;color:#68a3ff;margin-right: 5px">&#xe60d;</span>
                                  <span style="font-size: 16px; color: #68a3ff">添加附件</span>
                                </el-button>
                              </el-upload>
                            </el-form-item>
                            <el-form-item prop="type" label="活动类型标签" label-width="fit-content" class="type">
                              <el-input v-model="ruleForm.type" :maxlength=10 show-word-limit></el-input>
                              <i class="iconfont">&#xe632;</i>
                            </el-form-item>
                            <div>
                              <el-form-item prop="applicationLink" label="应用环节" label-width="fit-content">
                                <el-select v-model="ruleForm.applicationLink" placeholder="请选择">
                                  <el-option label="课前" value="课前"></el-option>
                                  <el-option label="课中" value="课中"></el-option>
                                  <el-option label="课后" value="课后"></el-option>
                                  <el-option label="期中" value="期中"></el-option>
                                  <el-option label="期末" value="期末"></el-option>
                                </el-select>
                              </el-form-item>
                              <el-form-item prop="chapter" label="所属章节" label-width="fit-content">
                                <el-select v-model="ruleForm.chapter" placeholder="请选择">
                                  <el-option label="第一章" value="第一章"></el-option>
                                  <el-option label="第二章" value="第二章"></el-option>
                                </el-select>
                              </el-form-item>
                            </div>
                            <div class="homework-time">
                              <el-form-item prop="startTime" label="发布时间" label-width="fit-content">
                                <el-date-picker type="datetime"
                                                v-model="ruleForm.startTime"
                                                value-format="yyyy-MM-dd hh:mm:ss"
                                                :placeholder="currentTime"/>
                              </el-form-item>
                              <el-form-item prop="endTime" label="截止时间" label-width="fit-content">
                                <el-date-picker
                                    type="datetime"
                                    value-format="yyyy-MM-dd hh:mm:ss"
                                    v-model="ruleForm.endTime"
                                    placeholder="请选择日期时间"/>
                              </el-form-item>
                            </div>
                            <div class="all-score">
                              <el-form-item label="总分" prop="allScore" label-width="fit-content">
                                <el-input v-model="ruleForm.allScore"></el-input>
                              </el-form-item>
                              <el-form-item label-width="fit-content">
                                <el-switch v-model="ruleForm.delivery"></el-switch>
                                <label class="time-out">若超时，禁止提交</label>
                              </el-form-item>
                            </div>
                            <el-form-item label="进行查重" label-width="fit-content" class="check-duplicates">
                              <el-switch v-model="ruleForm.duplicates"></el-switch>
                            </el-form-item>
                          </el-form>
                          <el-divider/>
                          <div slot="footer" class="dialog-footer">
                            <el-button @click="$store.state.homework.dialogFormVisibleForAdd = false">取 消
                            </el-button>
                            <!--                            提交并关闭对话框-->
                            <el-button type="primary" @click="postHomework('addHomework')">确 定</el-button>
                          </div>
                        </el-dialog>
                      </div>
                    </div>
                    <div v-if="numOfHomeworks===0">
                      <div>
                        <img src="@/assets/images/img_empty.84d0931c.png">
                      </div>
                    </div>
                    <div v-if="numOfHomeworks!==0" class="course">
                      <div>
                        <ul class="course-list-box">
                          <li v-for="(homework,index) in homeworks" :key=index @click="goMyHomework(homework)">
                            <div class="homework-card">
                              <div class="layout-left">
                                <img src="@/assets/images/作业.png">
                                <div class="another-name">
                                  <span>作业</span>
                                </div>
                              </div>
                              <div class="layout-right">
                                <div class="layout-right-info">
                                  <h6 class="info-title">{{ homework.title }}</h6>
                                  <div class="status-bar">
                                  <span>
                                    提交截止日期：{{ homework.endTime }}
                                  </span>
                                    <span>|</span>
                                    <span v-text="`${isFinish?'已结束':'未结束'}`"></span>
                                    <span>|</span>
                                    <span>{{ homework.type }}</span>
                                  </div>
                                  <p v-if="!isTeacher&&!homework.isCorrect" class="learn-state" style="color: #ff941f">未提交</p>
                                  <p v-if="homework.isCorrect" class="learn-state">已批改 {{ homework.score }}分</p>
                                </div>
                                <!--                                学生-->
                                <div v-if="!isTeacher&&!homework.isCorrect" class="homework-operate">
                                  <ul>
                                    <li>
                                      <el-button type="primary">提交作业</el-button>
                                    </li>
                                  </ul>
                                </div>
                                <!--                              老师-->
                                <div v-if="isTeacher" class="homework-operate">
                                  <ul>
                                    <li>
                                      <p>{{homework.corrected}}</p>
                                      <p>已批完</p>
                                    </li>
                                    <li>
                                      <p>{{ homework.notCorrected }}</p>
                                      <p>未批完</p>
                                    </li>
                                    <li>
                                      <p>{{ homework.unsubmitted }}</p>
                                      <p>未交</p>
                                    </li>
                                    <li></li>
                                    <li>
                                      <i class="iconfont" style="font-weight: 600;margin-left:2px ">&#xe608;</i>
                                      <p>更多</p>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </el-tab-pane>
                <el-tab-pane v-if="!isTeacher" :name="`${detailItems.length+1}`">
                  <div style="display: inline-block" slot="label">
                    <i class="iconfont">&#xe69b;</i>
                    <span>目录</span>
                  </div>
                </el-tab-pane>
              </el-tabs>

            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from "@/components/classDetail/Nav";
import {quillEditor} from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import {formatDate} from "@/utils/tools";
import {mymessage} from "@/utils/myMessage";
import th from "element-ui/src/locale/lang/th";
import {delSessionStorage, getSessionStorage, setSessionStorage} from "@/store/auth";

export default {
  name: "ClassDetail",
  components: {Nav, quillEditor},
  data() {
    return {
      //作业附件
      fileList: [],
      //作业附件上传地址
      uploadUrl: 'http://localhost:8083/file/uploadAnnex',
      activeName: 'first',
      activeName2: '2',
      detailItems: [
        '互动课件',
        '作业',
        '测试',
        '资料',
        '腾讯会议',
        '公告',
        '话题',
        '互动答疑'
      ],
      ruleForm: {
        title: '',
        homeworkDescription: '',
        type: '作业',
        applicationLink: '',
        chapter: '',
        startTime: '',
        endTime: '',
        allScore: '0',
        delivery: false,
        duplicates: true
      },
      rules: {
        title: [
          {required: true, trigger: 'blur'}
        ],
        type: [
          {required: true, trigger: 'blur'}
        ],
        applicationLink: [
          {required: true, trigger: 'blur'}
        ], chapter: [
          {required: true, trigger: 'blur'}
        ], startTime: [
          {required: true, trigger: 'blur'}
        ], endTime: [
          {required: true, trigger: 'blur'}
        ], allScore: [
          {required: true, trigger: 'blur'}
        ],
      },
      content: null,
      editorOption: {},
      fileNames: []
    }
  },
  computed: {
    isFinish() {
      let endTime = new Date(this.lesson.endTime)
      return endTime.getTime() >= new Date().getTime()
    },
    dialogFormVisibleForAdd() {
      return this.$store.state.homework.dialogFormVisibleForAdd
    },
    lesson() {
      return getSessionStorage("currentLessonInfo").lesson;
    },
    isTeacher() {
      return getSessionStorage("currentLessonInfo").isTeacher;
    },
    numOfHomeworks() {
      return this.homeworks.length;
    },
    homeworks() {
      return this.$store.state.homework.homeworks;
    },
    currentTime() {
      return formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss')
    }

  },
  methods: {
    handleClick() {

    },
    postHomework(formName) {
      //上传作业附件
      // console.log("fileList",this.fileList)
      this.$refs[formName][0].validate((valid) => {
        // this.ruleForm.startTime = formatDate(this.ruleForm.startTime, 'yyyy-MM-dd hh:mm:ss')

        if (valid) {
          //发布作业
          this.$store.dispatch("homework/postHomework", {
            ...this.ruleForm,
            lessonCode: this.lesson.lessonCode
          })
        } else {
          mymessage.error("不符合要求")
        }
      })
    },
    goMyHomework(homework) {
      setSessionStorage("currentHomeworkInfo", JSON.stringify({
        homework: homework,
        isTeacher: this.isTeacher
      }))
      this.$router.push({
        name: "homework",
      })
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    uploadSuccess(res,fileList) {
      console.log("上传成功", fileList)
      if (res.data.status === 200) {
        this.fileNames.push(res.data.data.fileName)
      }
    },
    handleUpload() {
      if (this.fileList.length === 0) {
        console.log("fileList", this.fileList)
        this.$refs["attachments"][0].submit();
      }

    }
  },

  mounted() {
    if (getSessionStorage("currentHomeworkInfo")) {
      delSessionStorage("currentHomeworkInfo")
    }

    this.$store.dispatch("homework/initHomework", {
      lessonCode: this.lesson.lessonCode
    })

  }
}
</script>

<style scoped lang="less">
.container {
  width: 1224px;
  margin: 64px auto;
}

.header {
  display: block;
}

.head-layout {
  position: relative;
  background: #e8f0ff;
  border-radius: 8px 8px 0 0;
  height: 200px;

  & img {
    border-radius: 8px 8px 0 0;
    width: 1224px;
    height: 200px;
    background-color: #3367d5;
    border: none;
  }
}

.head-top {
  position: absolute;
  width: 1224px;
  height: 200px;
  left: 0;
  top: 0;
  padding: 24px;
  color: #fff;
  display: flex;
}

.left {
  flex: 1;
  text-align: left;

  & h1 {
    font-size: 36px;
  }

  & h2 {
    font-size: 20px;
    line-height: 32px;
    font-weight: 400;
  }
}

.code {
  margin-top: 55px;
  font-size: 14px;
  font-weight: 400;
  display: flex;
  align-items: center;

  & span:nth-child(1) {
    cursor: pointer;
    margin-right: 16px;
  }
}

.right {
  display: flex;
  flex-direction: column;
  font-size: 14px;

  ::v-deep .el-button {
    margin-left: 15px;
    min-width: 120px;
    margin-top: -20px;

    &.is-disabled {
      color: #c0c4cc;
    }

    &:hover {
      background-image: none;
      background-color: #fff;
      border-color: #ebeef5;
    }
  }

  & div:nth-child(2), div:last-child {
    display: flex;
    justify-content: right;
    gap: 10px;
    margin-top: 120px;
  }
}

.notLesson:hover {
  cursor: not-allowed;
}

.lesson-setting ul {
  display: flex;
  justify-content: left;
  gap: 10px;

  & li {
    font-size: 14px;
  }


}

.header-footer {
  width: 1224px;
  height: 64px;
  color: #3c4043;
  font-size: 14px;
  font-weight: 400;
  justify-content: center;
  background: #fff;

  & ::v-deep .el-tabs.el-tabs--top {
    border-radius: 0 0 8px 8px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 10%);
  }

  &::v-deep .el-tabs__nav-scroll {
    margin: auto;
    overflow: hidden;
    width: 600px;
  }

  ::v-deep .el-tabs__nav-wrap::after {
    display: none;
  }

  ::v-deep .el-tabs__active-bar {
    display: none;
  }

  ::v-deep .el-tabs__item.is-active {
    background: #e8f0ff;
    color: #4285f4;
    border-radius: 10px;
  }

  ::v-deep .el-tabs__item {
    font-size: 20px;
  }

  ::v-deep .el-tabs__item.is-top:last-child {
    padding-right: 20px;
  }

  ::v-deep .el-tabs__item.is-top:nth-child(2) {
    padding-left: 20px;
  }

}


.detail {

  width: 100%;
  margin: 100px auto 0;
  padding: 10px 0 2px;

  & ::v-deep .el-tabs__item.is-active {
    color: #409EFF;
  }

  & ::v-deep .el-tabs__item {
    padding: 0 20px;
    height: 40px;
    box-sizing: border-box;
    line-height: 40px;
    display: inline-block;
    list-style: none;
    font-size: 16px;
    font-weight: 500;
    color: #303133;
    position: relative;

  }

  &::v-deep .el-tabs__nav-scroll {
    overflow: hidden;
    width: auto;
  }

  ::v-deep .el-tabs__nav-wrap::after {
    display: none;
  }

  ::v-deep .el-tabs__active-bar {
    height: 3px;
  }
}

.custom-made {
  position: absolute;
  top: 5px;
  right: 5px;
  color: black;
  font-size: 16px;
}

.head-box {
  display: flex;
  justify-content: space-between;
}

.course {

}

.course-list-box {
  padding-top: 16px;
  border: 1px solid #e7ebf0;
  border-radius: 8px;
  margin-top: 8px;
  margin-bottom: 10px;
  list-style-type: none;

  & li {
    padding: 10px 16px 0 16px;
    background: #fff;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: space-between;
    list-style-type: none;
  }
}

.homework-card {
  width: 100%;
  background: #fff;
  display: flex;
  position: relative;

  & .layout-left {
    flex-direction: column;
    min-width: 85px;
    margin-right: 16px;
    font-size: 12px;
    display: flex;
    align-items: center;

    & img {
      height: 40px;
      width: 40px;
      margin: 10px;
      border-radius: 50%;
      border: none;
    }

    & .another-name {
      position: relative;
      margin-top: 5px;
      line-height: 13px;
      display: inline-block;
      width: 85px;
      text-align: center;
      max-height: 31px;
      margin-bottom: 2px;

      & span {
        color: #3c4043;
        font-size: 13px;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 65px;
        max-height: 30px;
        line-height: 15px;
        word-break: break-all;
        display: inline-block;
        text-align: center;
      }
    }
  }
}

.layout-right {
  width: 100%;
  border-bottom: 1px solid #eee;
  padding: 0 0 4px;
  font-size: 14px;
  display: flex;
  align-items: baseline;
  justify-content: space-between;

  & .layout-right-info {
    height: 80px;

    & .info-title {
      font-size: 16px;
      max-width: 500px;
      cursor: pointer;
      color: #212121;
      display: -webkit-box;
      text-overflow: ellipsis;
      overflow: hidden;
      word-break: break-all;
      white-space: normal;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }

    & .status-bar {
      transform: translateY(-10px);
      color: #5f6368;
      font-size: 12px;
    }

    & .learn-state {
      transform: translateY(-15px);
      font-size: 12px;
      color: #68a3ff;
    }
  }

}

.homework-operate {
  & ul {
    display: flex;
    list-style: none;

    & li {
      display: block;
      padding: 0 16px;
      list-style: none;

      & p:first-child {
        text-align: center;
        display: block;
        color: #68a3ff;
        font-size: 24px;
      }
    }
  }
}

.teacher-all-operate {
  & ul {
    display: flex;
    list-style: none;
    gap: 20px;

    & li {
      font-size: 14px;
      color: #68a3ff;
      line-height: 40px;
    }
  }
}


//----------------------------------//
.import-homework {
  text-align: left;
  color: #68a3ff;
}

::v-deep .el-form-item__content {
  display: flex;
  justify-content: left;
}

::v-deep .el-radio-group {
  line-height: 30px;
}

.vip {
  display: inline-block;
  margin-left: -20px;
}

.type {
  & ::v-deep .el-input {
    width: 40%;
    margin-right: 10px;
  }

  & ::v-deep .el-input__inner {

    float: left;
  }

  & i {
    float: left;
  }
}

.homework-time {
  display: flex;
  justify-content: space-between;
}

.all-score {
  display: flex;

  & ::v-deep .el-switch__core {
    margin-top: 20px;
    margin-left: 10px;
    margin-right: 10px;
  }
}

.check-duplicates {
  & ::v-deep .el-switch__core {
    margin-top: 20px;
    margin-left: 10px;
    margin-right: 10px;
  }
}

::v-deep .el-divider--horizontal {
  margin: 0;
}
</style>