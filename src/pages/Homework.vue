<template>
  <div class="homework">
    <div class="nav">
      <div class="logo">
        <img :src="logo" alt="#">
      </div>
      <div class="breadcrumb">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ name: 'main' }">我的课堂</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ name: 'classDetail' }">课程内容</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ name: 'homework' }">作业详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="avatar-area">
        <AvatarArea/>
      </div>
    </div>
    <div class="view-homework">
      <el-tabs v-model="activeName">
        <el-tab-pane label="详情" name="0">
          <div class="view-homework-detail">
            <div class="header">
              <div class="cmp-work-list-card">
                <span class="tips-ion">作业</span>
                <div class="layout-right">
                  <header class="flex-align">
                    <div class="h-left">
                      <div class="title">
                        <h4>{{homework.title}}</h4>
                      </div>
                    </div>
                    <div class="h-right">
                      <!--                      -->
                      <!--                      -->
                      <!--                      -->
                    </div>
                  </header>
                  <div class="tags">
                    <el-tag>{{homework.type}}</el-tag>
                    <el-tag>提交起止时间</el-tag>
                    <el-tag>{{homework.startTime}}~{{homework.endTime}}</el-tag>
                    <el-tag type="info">{{homework.allScore}}</el-tag>
                    <el-tag type="info" v-if="homework.duplicates">查重</el-tag>
                    <el-tag type="info" :v-text="homework.delivery?'允许超时提交':'不允许超时提交'">允许超时提交</el-tag>
                  </div>
                  <div class="homework-description">
                    <p>{{homework.homeworkDescription}}</p>
                  </div>
                  <!--                  教师端-->
                  <div class="stu-status">
                    <!---->
                    <!---->
                    <!---->
                    <!---->
                    <!---->
                  </div>
                  <div class="attachments-layout">
                    <div>
                      <div class="left">
                        <img src="@/assets/images/file_ext_big_docx.png">
                      </div>
                      <div class="right">
                        <h3>第7次作业.docx</h3>
                        <div>
                          <span>10.59KB</span>
                          <el-button type="text">下载</el-button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            <div class="cmp-comment-list">
              <section class="comment-container">
                <div class="comment-main flex-align">
                  <div class="left">
                    <el-avatar shape="circle" src=""></el-avatar>
                  </div>
                  <div class="right">
                    <el-input
                        type="textarea"
                        :autosize="{ minRows: 5}"
                        placeholder="说点什么吧"
                        v-model="textarea">
                    </el-input>
                  </div>
                </div>
                <div class="comment-tools flex-align">
                  <el-checkbox v-model="checked">实名发表</el-checkbox>
                  <el-upload
                      class="upload-demo"
                      action="https://jsonplaceholder.typicode.com/posts/"
                      :on-preview="handlePreview"
                      :on-remove="handleRemove"
                      :before-remove="beforeRemove"
                      multiple
                      :limit="3"
                      :on-exceed="handleExceed">
                    <el-button size="small" type="text">
                      <span class="iconfont" style="font-size: 16px;color:black;margin-right: 5px">&#xe60d;</span>
                      <span style="font-size: 14px; color: black">添加附件</span>
                    </el-button>
                  </el-upload>
                  <el-button type="primary">发表评论</el-button>
                </div>
              </section>
              <section class="comment-list">
                <h1>
                  全部评论
                  <span style="font-size: 10px">共{{ comments.length }}条</span>
                </h1>
                <!--                评论-->
                <div v-if="comments.length===0" class="comment-no_data">
                  <el-empty :image="emptyPng" :image-size=500></el-empty>
                </div>
                <ul v-if="comments.length!==0" class="list-layout">
                  <li>
                    <div class="context">
                      {{ comments.context }}
                    </div>
                    <div class="comment-foot flex-align">
                      <div class="left flex-align">
                        <el-avatar shape="circle" src=""/>
                        <h3>{{ comments.name }}</h3>
                        <span>2022-08-23 20:14</span>
                        <span>

                        </span>
                      </div>
                      <div class="right flex-align">
                        <div class="item common_pointer flex-align">
                          <!--                          点赞-->
                          <i class="iconfont">&#xec7f;</i>
                          <span>{{ comments.numOfLike }}</span>
                        </div>
                        <div class="item common_pointer flex-align">
                          <!--                          回复-->
                          <i class="iconfont">&#xe70e;</i>
                          <span>回复</span>
                        </div>
                        <div class="item common_pointer flex-align">
                          <!--                          删除-->
                          <i class="iconfont">&#xe74b;</i>
                          <span>删除</span>
                        </div>
                      </div>
                    </div>
                  </li>
                  <div class="pagination">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[100, 200, 300, 400]"
                        :page-size="100"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="400">
                    </el-pagination>
                  </div>
                </ul>
              </section>
            </div>
          </div>
        </el-tab-pane>
        <!--学生-->
        <el-tab-pane v-if="!isTeacher" label="提交作业" name="1">
          <div class="submit-homework">
            <div class="head">
              <div class="left">
                <div>
                  <el-avatar shape="circle"/>
                  <p>作业</p>
                </div>
                <div>
                  <h4>{{homework.title}}</h4>
                  <div class="tags">
                    <el-tag>{{homework.type}}</el-tag>
                    <el-tag>提交起止时间</el-tag>
                    <el-tag>{{homework.startTime}}~{{homework.endTime}}</el-tag>
                    <el-tag type="info">{{homework.allScore}}</el-tag>
                    <el-tag type="info" v-if="homework.duplicates">查重</el-tag>
                    <el-tag type="info" :v-text="homework.delivery?'允许超时提交':'不允许超时提交'">允许超时提交</el-tag>
                  </div>
                </div>
              </div>
              <div class="right">
                <i class="iconfont" style="color: #68a3ff">&#xe62b;</i>
                <span style="color: #68a3ff">查看谁交了</span>
              </div>
            </div>
            <div class="submit-content">
              <div class="submit-content-head">
                <div>
                  <p style="font-size: 20px;font-weight: 600">提交内容</p>
                </div>
                <div>
                  <el-button v-if="!isSubmitted" type="primary" @click="uploadHomework('homework')">确认提交</el-button>
                </div>
              </div>
              <div v-if="!isSubmitted" class="submit-content-body">
                <div>作业附件</div>
                <!--                上传-->
                <el-upload
                    ref="homework"
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
                    class="upload-demo"
                    drag>
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text"><em>点击或拖拽上传添加作业文件</em>
                    <p style="font-size: 12px;margin-top: 10px">支持各类文档、图片、代码、压缩包格式</p>
                  </div>
                </el-upload>
                <div class="leave-comments">
                  <div>作业留言<span style="font-size: 12px;color: #74787c;margin-left: 12px">选填</span></div>
                  <el-input type="textarea" placeholder="作业以附件形式提交，留言仅做备注使用哦！" :rows="6"></el-input>
                </div>
              </div>
<!--已经提交了作业-->
              <div v-if="isSubmitted" class="content-body">
                <div>
                  <div>
                    <p>老师评语</p>
                    <div>暂无</div>
                  </div>
                  <div>
                    <p>成绩</p>
                    <div>
                      <span v-text="`${submittedHomework.score==='未批'?'分数未公布':`${submittedHomework.score}`}`"></span>
                      <span>/{{homework.allScore}}</span>
                    </div>
                  </div>
                </div>
                <div style="margin: 48px 0 24px; display: flex;justify-content: left">
                  <h3 style="">作业附件</h3>
                  <span style="font-size: 12px">1个</span>
                </div>
                <div class="footer">
                  <div>
                    <div class="left">
                      <img src="@/assets/images/file_ext_big_docx.png">
                    </div>
                    <div class="right">
                      <h3>{{submittedHomework.homeworkFileName}}</h3>
                      <div>
                        <span style="font-size: 12px;  color: black;">10.59KB</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <a type="download" style="color: #2178ff">下载</a>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </el-tab-pane>
        <!--        老师-->
        <el-tab-pane v-if="isTeacher" label="批阅" name="1">
          <div class="check-homework">
            <div class="check-homework-head">
              <div>title</div>
              <div>
                <div class="tags">
                  <el-tag>截至:{{homework.endTime}}</el-tag>
                  <el-tag type="info">{{homework.type}}</el-tag>
                  <el-tag type="info">{{homework.allScore}}</el-tag>
                  <el-tag type="info" v-if="homework.duplicates">查重</el-tag>
                  <el-tag type="info" :v-text="homework.delivery?'允许超时提交':'不允许超时提交'">允许超时提交</el-tag>
                </div>
                <div>
                  <el-switch v-model="hidden" style="margin-right: -10px"></el-switch>
                  <span>对学生隐藏成绩</span>
                  <span><i class="iconfont">&#xe856;</i>下载作业报表</span>
                </div>
              </div>
            </div>
            <el-divider/>
            <div class="check-homework-body">
              <div class="body-top">
                <div>
                  <!--                  作业个数-->
                  <el-button round>全部(1)</el-button>
                  <el-button round>未批(1)</el-button>
                  <el-button round>已批(0)</el-button>
                  <el-button round>未交(0)</el-button>
                </div>
                <div>
                  <el-input
                      type="search"
                      :v-model="searchStuName"
                      autocomplete="off"
                      :placeholder="`学生姓名搜索`"/>
                  <span class="iconfont">&#xe6e4;</span>
                </div>
              </div>
              <div class="body-form">
                <el-form :model="ruleForm" :rules="rules">
                  <div>
                    <el-form-item label="提交状态" prop="commitStatus">
                      <el-select v-model="ruleForm.commitStatus" placeholder="不限">
                        <el-option label="超时交" value="overTime"></el-option>
                        <el-option label="按时交" value="onTime"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="相似度" prop="similarity">
                      <el-select v-model="ruleForm.similarity" placeholder="不限">
                        <el-option label="0-50%" value="0-0.5"></el-option>
                        <el-option label="50%-70%" value="0.5-0.7"></el-option>
                        <el-option label="70%-90%" value="0.7-0.9"></el-option>
                        <el-option label="90%-100%" value="0.9-1"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="分享状态" prop="shareStatus">
                      <el-select v-model="ruleForm.shareStatus" placeholder="不限">
                        <el-option label="未分享" value="shareYet"></el-option>
                        <el-option label="已分享" value="shareNever"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="按成员分组" prop="grouping">
                      <el-select v-model="ruleForm.grouping" placeholder="不限">
                        <el-option label="无数据" value="none"></el-option>
                        <!--                        -->
                      </el-select>
                    </el-form-item>
                  </div>
                  <div class="num-words">
                    <el-form-item label="作业字数" prop="numOfWordsMin">
                      <el-input v-model="ruleForm.numOfWordsMin" placeholder="字数"></el-input>
                    </el-form-item>
                    <span style="margin: 10px"> - </span>
                    <el-form-item prop="numOfWordsMax">
                      <el-input v-model="ruleForm.numOfWordsMax" placeholder="字数"></el-input>
                    </el-form-item>
                  </div>
                </el-form>
              </div>

              <el-divider/>

              <div class="body-model">
                <div>
                  <el-select placeholder="批量给分" value="">
                    <el-option label="统一给分" value="all"></el-option>
                    <el-option label="区间给分" value="part"></el-option>
                  </el-select>
                  <el-button plain disabled>打回作业</el-button>
                  <el-select placeholder="批量给分" value="">
                    <el-option label="下载选中作业文档" value="all"></el-option>
                    <el-option label="下载全部作业文档" value="part"></el-option>
                    <el-option class="iconfont" value="part">下载作业文档批注&#xe65b;</el-option>
                    <el-option label="下载选中的报表" value="part"></el-option>
                    <el-option label="下载全部作业报表" value="part"></el-option>
                  </el-select>
                  <el-button plain disabled>变更为已交</el-button>
                </div>
                <div>
                  <el-button class="iconfont" style="font-size: 12px">&#xec08;作业文档无法在线预览？ 点此试试</el-button>
                  <el-button style="font-size: 12px">转存所有文件到资料模块</el-button>
                  <el-button style="font-size: 12px" type="primary">一键催交</el-button>
                </div>
              </div>

              <el-divider/>

              <div class="body-table">
                <el-table
                    ref="multipleTable"
                    :data="stuHomeworks"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                  <el-table-column
                      type="selection"
                      width="55">
                  </el-table-column>
                  <el-table-column
                      prop="name"
                      label="姓名"
                      width="120">
                  </el-table-column>
                  <el-table-column
                      prop="stuId"
                      label="学号"
                      width="180">
                  </el-table-column>
                  <el-table-column
                      prop="similarity"
                      label="相似度"
                      width="100"
                      show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column
                      prop="submitTime"
                      label="提交状态"
                      width="250"
                      show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column
                      prop="numOfWords"
                      label="字数"
                      width="100"
                      show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column
                      prop="reviewTimes"
                      label="批阅次数"
                      width="80"
                      show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column
                      label="成绩"
                      width="160"
                      show-overflow-tooltip>
                    <template #default="scope" >
                      <div class="score">
                        <el-input
                            :placeholder="scope.row.score"
                            class="group-inp"
                            v-model="scope.row.newScore"
                            @change="updateScore(scope.row)">
                        </el-input>
                        <span>/{{homework.allScore}}</span>
                      </div>
                    </template>
<!--                    <input></input><span>/100</span>-->
                  </el-table-column>
                  <el-table-column
                      fixed="right"
                      label="操作"
                      width="160">
                    <template #default="scope">
                      <el-button
                          @click.native.prevent="deleteRow(scope.$index, stuHomeworks)"
                          type="text"
                          size="small"
                      style="font-size: 16px;font-weight: bold">
                        <a @click.prevent="openHomework('http://localhost:8083/static/studentHomework/'+scope.row.homeworkFileName)">进入批阅</a><i class="iconfont" style="font-weight: bold;margin-left: 10px">&#xe608;</i>
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <div class="block">
                  <!--                  <span class="demonstration">完整功能</span>-->
                  <el-pagination
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      :current-page="currentPage1"
                      :page-sizes="[100, 200, 300, 400]"
                      :page-size="100"
                      layout="total, sizes, prev, pager, next, jumper"
                      :total="stuHomeworks.length">
                  </el-pagination>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-backtop target=".view-homework">
      <div>
        <div
            style="{
        height: 100%;
        width: 100%;
        background-color: #f2f5f6;
        box-shadow:0 0 6px rgba(0,0,0,0.12);
        text-align: center;
        line-height: 40px;
        color: #1989fa;
        }"
        ></div>
      </div>
    </el-backtop>
  </div>


</template>
<script>
import Nav from "@/components/main/Nav";
import AvatarArea from "@/components/main/AvatarArea";
import png from "@/assets/images/img_empty.84d0931c.png"
import {getSessionStorage} from "@/store/auth";
import {mymessage} from "@/utils/myMessage";
import {doPost} from "@/utils/api";

export default {
  data() {
    return {
      uploadUrl:'http://localhost:8083/file/uploadHomework',
      fileList: [],
      emptyPng: png,
      activeName: '0',
      logo: require('@/assets/images/logo_blue.png'),
      textarea: '',
      checked: '',
      currentPage: 1,

      hidden: true,
      searchStuName: '',
      ruleForm: {
        commitStatus: '',
        similarity: '',
        shareStatus: '',
        grouping: '',
        numOfWordsMin: 0,
        numOfWordsMax: 0
      },
      rules: {},
      multipleSelection: [],
      currentPage1: 1,
      isSubmitted:false,
      submittedHomework:{},
      stuHomeworks:[],
      newScore:''

    }
  },
  props: [],
  computed: {
    homework(){
      return getSessionStorage("currentHomeworkInfo").homework
    },
    isTeacher() {
      return getSessionStorage("currentHomeworkInfo").isTeacher;
    },
    comments() {
      return [
        {
          context: '我做完了，哈哈哈',
          name: '匿名用户',
          time: '2022-08-23 20:14',
          numOfLike: 999,
        }
      ]
    },
  },
  mounted() {
    this.homeworks = this.$store.state.homeworksAbout.homeworks;
    if (getSessionStorage("currentHomeworkInfo").isTeacher){
    //  根据hid获取学生的作业
      doPost("http://localhost:8083/homework/getHomeworks",{
        hid:getSessionStorage("currentHomeworkInfo").homework.hid
      }).then((res)=>{
        if (res.data.status===200){
          console.log("作业些",res)
          this.stuHomeworks = res.data.data
        }
      })

    }
    doPost("http://localhost:8083/homework/queryHomework",{
      hid:getSessionStorage("currentHomeworkInfo").homework.hid,
      username:getSessionStorage("userInfo").username
    }).then((res)=>{
      //找到了，已经提交过
      if (res.data.status===200){
        this.isSubmitted = true;
        this.submittedHomework=res.data.data;
        console.log("isSubmitted",this.isSubmitted)
        console.log("submittedHomework",this.submittedHomework)
      }
    })
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    updateScore(row){
      let newScore = Number(row.newScore)
      if (isNaN(newScore)){
        mymessage.error("只能输入数字")
        row.newScore = ''
      }
      if (parseInt(row.newScore)<0||parseInt(row.newScore)>this.homework.allScore){
        mymessage.error("不在指定分数范围内")
        row.newScore = ''
      }
      for (let i = 0; i < this.submittedHomework.length; i++) {
        if (this.submittedHomework[i].username === row.username){
          this.submittedHomework[i].score = row.newScore
        }
      }
      if (row.newScore===''){
        return;
      }
      this.$store.dispatch("homework/updateScore",{
        username:row.username,
        hid:row.hid,
        score:row.newScore
      })
    },
    //删除
    deleteRow(index, homeworks) {

    },
    uploadHomework(formName){
      if (this.fileList.length===0) {
        this.$refs[formName].submit();
      }

    },
    uploadSuccess(res){
      console.log("res",res)
      if (res.status===200){
        mymessage.success("提交成功")
        this.$store.dispatch("homework/submitHomework",{
          homeworkName:res.data.fileName,
          hid:getSessionStorage("currentHomeworkInfo").homework.hid,
          studentUsername:this.$store.state.user.userInfo.username
        })
      }
    },
    forceUpdate() {
      this.$forceUpdate()
    },
    openHomework(url){
      //-------//
      window.open(url,'_blank')
    }
  },
  watch: {},
  components: {
    AvatarArea,
    Nav
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

.logo {
  float: left;
  width: 120px;
  height: 30px;
}

.logo img {
  height: 28px;
  width: 112px;
  margin-top: -2px;
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

.view-homework {
  background-color: #fff;
  margin-top: 80px;
}

::v-deep .el-tabs__item {
  font-size: 16px;
}

::v-deep .el-tabs__header {
  width: 1224px;
  margin: 0 auto 24px;
}

::v-deep .el-tabs__nav-wrap::after {
  display: none;
}

::v-deep .el-tabs__header {
  padding: 0;
  position: relative;
}

::v-deep .el-tabs__content {
  overflow: hidden;
  position: relative;
}


.view-homework-detail, .submit-homework, .check-homework {
  width: 1224px;
  margin: 0 auto;
  padding-top: 12px;
  padding-bottom: 40px;
}

.header {
  border-radius: 4px;
  border: 1px solid #ccc;
  padding: 12px;
}

.cmp-comment-list {
  width: 100%;
  display: flex;
  position: relative;
}

.tips-ion {
  position: relative;
  background: #31ccd2;
  color: #fff;
  font-size: 14px;
  left: -49.2%;
  top: -7px;
  border-bottom-right-radius: 4px;
  text-align: center;
  padding: 8px;
  outline: none;
}

.layout-right {
  margin-top: 30px;
  width: 100%;

  & header {
    justify-content: space-between;
  }
}

.flex-align {
  display: flex;
  align-items: center;
}

.h-left {
  margin-top: -20px;

  & .title {
    line-height: 20px;

    & h4 {
      font-size: 16px;
      font-weight: 500;
      margin-right: 5px;
      max-width: 670px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      user-select: none;
      cursor: pointer;
    }
  }
}

.h-right {
  text-align: right;
}

.tags {
  padding: 8px 0;
  display: flex;
  justify-content: left;

  &::v-deep .el-tag {
    margin-right: 6px;
    height: 20px;
    line-height: 20px;
    padding: 0 5px;
  }

  & ::v-deep .el-tag--mini {


    line-height: 19px;
  }
}

.homework-description {
  display: flex;
  justify-content: left;
}

.stu-status {
  margin-top: 16px;
  color: #3c4043;
  font-size: 14px;
}

.attachments-layout > div {
  position: relative;
  border: 1px solid #dadce0;
  border-radius: 4px;
  background: #fff;
  display: flex;

  & .left {
    margin-left: 20px;

    & img {
      width: 33px;
      height: 40px;
      border: none;
    }
  }

  & .right {
    margin: 0 16px;
    display: block;

    & h3 {
      font-size: 16px;
      font-weight: 500;
    }

    & div {
      text-align: left;
    }

    & span {
      margin-right: 5px;
      font-size: 12px;
      color: #74787c;
    }

    & ::v-deep .el-button {
      font-size: 12px;
    }
  }
}

.cmp-comment-list {
  overflow: auto;
  color: #3c4043;
  background: #fff;
  display: block;

  & .comment-container {
    display: block;

    & .comment-main {
      margin-top: 24px;
      padding: 12px;
      border-bottom: 2px solid #4285f4;
      background: #f8f9fa;

      & .left {
        & img {
          width: 32px;
          height: 32px;
          border-radius: 50%;
        }
      }

      & .right {
        flex: 1;

        & ::v-deep .el-textarea {
          position: relative;
          display: inline-block;
          width: 100%;
          vertical-align: bottom;
          background: #f8f9fa;
        }

        & ::v-deep .el-textarea__inner {
          display: block;
          resize: vertical;
          padding: 5px 15px;
          line-height: 1.5;
          box-sizing: border-box;
          width: 100%;
          font-size: inherit;
          color: #606266;
          border-radius: 4px;
          transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
        }
      }
    }
  }

  .comment-tools {
    margin: 16px 0;
    justify-content: flex-end;
    gap: 15px
  }
}


.comment-list {
  display: block;
  margin-top: 12px;

  & h1 {
    line-height: 24px;
    text-align: left;

    & span {
      color: #74787c;
      padding: 0 8px;
    }
  }
}

.item {
  & i {
    font-size: 14px;
    margin-right: 5px;
  }
}

.list-layout {
  width: 100%;
  list-style: none;

  & li {
    border: 1px solid #dadce0;
    border-radius: 4px;
    padding: 24px;
    position: relative;
    list-style-type: none;

    & .context {
      line-height: 24px;
      margin-bottom: 16px
    }

    & .comment-foot {
      border-top: 1px solid #dadce0;
      padding-top: 10px;
      font-size: 12px;

      & .left {
        flex: 1;

        & img {
          width: 32px;
          height: 32px;
          border-radius: 50%;
        }

        & h3 {
          font-weight: 500;
          margin: 0 10px 0 8px;
        }

        & span {
          color: #74787c;
        }
      }

      & .right {
        display: flex;
        gap: 16px;
      }
    }

  }
}

.pagination {
  display: flex;
  justify-content: center;
  padding: 30px 0;
}

.submit-homework {
  & .head {
    display: flex;
    justify-content: space-between;

    & .left {
      display: flex;
      justify-content: left;

      & div:nth-child(2) {
        margin-left: 15px;
      }

      & h4 {
        margin-left: 15px;
        text-align: left;
      }

      & .tags {
        margin-left: -5px;
      }
    }
  }
}

.submit-content-head {
  border-top: #dadce0 solid 1px;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  padding: 30px 0 20px;
}

.submit-content-body {
  border: 1px solid #dadce0;
  border-radius: 8px;
  padding: 24px;

  & div:nth-child(1) {
    text-align: left;
  }

  & ::v-deep .el-upload {
    width: 100%;
  }

  & ::v-deep .el-upload-dragger {
    border: none;
    background-color: #f8f9fa;
    width: 100%;
  }
}

.leave-comments {
  margin-top: 15px;

  & ::v-deep .el-textarea {
    margin-top: 10px;
  }
}

//  teacher
.check-homework-head {
  & div:nth-child(1) {
    text-align: left;
  }

  & div:nth-child(2) {
    display: flex;
    justify-content: space-between;
    & div:nth-child(2){
      display: flex;
      gap: 20px;
      & span:nth-child(1){
        margin-right: 10px;
      }
      & span {
        color: #68a3ff;
        font-size: 12px;
      }

      & i {
        font-size: 12px;
      }
    }

  }
}

.body-top{
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
}

.body-form{
  & form{
    & div:nth-child(1){
      display: flex;
      justify-content: left;
      gap: 10px;
    }
    & .num-words{
      display: flex;
      justify-content: left;
    }
  }
}

.body-model{
  display: flex;
  justify-content: space-between;
  & ::v-deep .el-select{
    width:120px ;
  }
  & div{
    display: flex;
    gap: 5px;
  }
  & ::v-deep .el-button{
    height: 40px;
  }
}

.body-table{
  & ::v-deep .block{
    margin-top: 10px;
  }
  &::v-deep .el-table__row{
    & td:nth-child(2){
      & div{
        font-weight: bold;
      }
    }
  }
}

.score{
  & ::v-deep .el-input{
    height: 36px;
    width: 80px;
    border: none;

  }
  & ::v-deep .el-input__inner{
    border: transparent;
    border-radius: 0;
    border-bottom: black solid 1px;
    font-size: 24px;
    text-align: center;
   }
  & span{
    display: inline-block;
    transform: translateY(8px);
    font-size: 24px;
    margin-left: 5px;
  }
}

.content-body{
  border: 1px solid #dadce0;
  border-radius: 8px;
  padding: 24px;
  background-color: rgb(248, 249, 250);
  & div:nth-child(1){
    display: flex;
    justify-content: space-between;
    & div:nth-child(1){
      display: block;
      text-align: left;
      & p{
        font-size: 16px;
      }
      & div{
        text-align: left;
        padding: 16px;
        width: 500px;
        background-color: white;
      }
    }
    & div:nth-child(2){
      display: block;
      & p{
        font-size: 16px;
      }
      & div{

        line-height: 50px;
        & span:nth-child(1){
          font-size: 24px;
          color: #ff6000;
        }
        & span:nth-child(2){
          font-size: 22px;
          color: #5f6368;
        }
      }
    }
  }
}
.footer{
  display: flex;
  justify-content: space-between;
  border: 1px solid #dadce0;
  border-radius: 8px;
  padding: 24px;
  background-color: rgb(248, 249, 250);
  & div:nth-child(1){
    & .right{
      display: block;
      margin-left: 15px;
      div{
        text-align: left;
        line-height: 30px!important;
      }
    }
    & .left{
      & img{
        margin: 0;
        width: 40px;
      }
    }
  }
  & div:nth-child(2){}

}

</style>