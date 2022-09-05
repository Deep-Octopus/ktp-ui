<template>
  <div id="home">
    <!--    导航栏-->
    <el-row>
      <el-col :span="24">
        <Nav/>
      </el-col>
    </el-row>
    <!--    上部大图-->
    <div class="img-top">
      <LargeImg/>
    </div>
    <div class="contain">
      <!--    blendList-->
      <div class="blend-list">
        <div>
          <div class="head">
            <div class="title">混合教育全过程管理</div>
            <div class="detail">课前、课中、课后, 线上线下, 教学场景全过程管理</div>
          </div>
          <div class="list">
            <List :items="mixItems"/>
          </div>
        </div>
      </div>
      <!--   智慧教学平台 -->
      <div class="wisdom">
        <div class="head">
          <div class="title">智慧教学平台</div>
        </div>
        <div class="wisdomList">
          <List :items="wisdomItems"/>
        </div>
        <div class="understand">
          <div class="content">
            <TwoButton
                :fontSize="18"
                :wide="160"
                :height="48"
                left-bt-value="了解详细功能"
                right-bt-value="立即注册体验"
                right-type="primary"
            right-path-name="register"
            left-path-name="home"/>
          </div>
        </div>
      </div>
      <!--   课堂派机构版 -->
      <div class="mechanism">
        <div class="head">
          <div class="title">
            课堂派机构版
          </div>
        </div>
        <ImgAndList/>
      </div>
      <!--    媒体报道-->
      <div class="medium">
        <div class="head">
          <div class="title">
            媒体报道
          </div>
        </div>
        <Carousel :items="cardItems"/>
      </div>
      <Welcome
          title="欢迎使用课堂派"
          detail="精彩教学，从这里开启"
          btLeftValue="联系课堂派"
          btRightValue="免费注册"
      />
    </div>
    <Footer/>
    <GoTop/>
  </div>

</template>

<script>
import List from "@/components/home/List";
import Nav from "@/components/home/HomeNav";
import LargeImg from "@/components/home/LargeImg";
import TwoButton from "@/components/home/TwoButton";
import ImgAndList from "@/components/home/ImgAndList";
import Carousel from "@/components/home/Carousel";
import Welcome from "@/components/home/Welcome";
import Footer from "@/components/home/Footer";
import GoTop from "@/components/home/GoTop";

export default {
  name: 'Home',
  components: {
    Welcome,
    ImgAndList,
    TwoButton,
    Nav, LargeImg, List, Carousel,Footer,GoTop
  },
  data() {
    return {
      //list资源
      mixItems: [
        {
          imgUrl: require('@/assets/images/作业.png'),
          title: '作业',
          detail: '81 种文档格式作业在线展示和批阅，实时查重，精准对比，避免学生抄袭。 自动管理成绩，一键下载作业数据。'
        }, {
          imgUrl: require('@/assets/images/考试.png'),
          title: '考试/练习',
          detail: '单选、多选、填空、简答等10余种题型。支持题库随机抽题组卷。支持限时考试、选项随机等防作弊模式。'
        }, {
          imgUrl: require('@/assets/images/课件.png'),
          title: '课件资料',
          detail: '课件、资料、话题、公告等教学内容支撑。在线制作方便快捷，提升备课效率。支持课前发布活动，课中互动，课后巩固。'
        }, {
          imgUrl: require('@/assets/images/互动.png'),
          title: '课中互动',
          detail: '课件在线讲解、标记疑问 支持发言、开启弹幕、抢答、提问、话题讨论、黑板、画笔标注课堂要点，让课堂更精彩'
        }, {
          imgUrl: require('@/assets/images/签到.png'),
          title: '考勤签到',
          detail: '二维码、数字口令、GPS等5种考勤形式， 精准有效、避免代签 签到数据自动生成，一键导出'
        }, {
          imgUrl: require('@/assets/images/成绩.png'),
          title: '成绩管理',
          detail: '汇总互动数据、平时成绩、期末成绩 个性化配置成绩权重占比数据报表一键导出下载，课留存，可追溯'
        }, {
          imgUrl: require('@/assets/images/数据分析.png'),
          title: '教学数据分析',
          detail: '全方位教学数据信息化，可视化实时监测教学质量，把控教学进度，学业预警分析，提升教学效果'
        }, {
          imgUrl: require('@/assets/images/直播.png'),
          title: '直播-云录屏',
          detail: '满足线上线下混合式教学场景 动画及课件同屏+语音实现轻量级直播 不限人员数量，手机电脑均可参与'
        },
      ],
      wisdomItems: [
        {
          imgUrl: require('@/assets/images/互动课堂.png'),
          title: '线下互动课堂',
          detail: '多种互动教学工具，沉浸式学习体验，精准化学习。'
        },
        {
          imgUrl: require('@/assets/images/混合教学.png'),
          title: '混合教学全过程管理',
          detail: '课前课中课后全过程教学管理，教学数据可视化，可留存，提升教学质量。'
        }, {
          imgUrl: require('@/assets/images/直播教室.png'),
          title: '在线直播教室',
          detail: '在线直播教学搭配教学互动，充分还原真实的教学场景，提升教学效果。'
        }, {
          imgUrl: require('@/assets/images/在线课程建设.png'),
          title: '在线课程建设',
          detail: '在线直播课、精品慕课资源、课程资源体系搭建，沉淀教学资源。'
        }
      ],
      cardItems: [
        {
          id: 0,
          imgUrl: require('@/assets/images/4.png'),
          title: '课堂派亮相2018中国“互联网+”数字经济峰会',
          detail: '4月12日下午教育分论坛，北京大学软件与微电子学院林院长分享了智慧课堂的建设经验：教学资源呈现多样化、课堂形式丰富、如何把学生从玩手机的屏幕聚焦到课堂互动环节等方面。林院长表示，课堂派在研发过程中，学院的一线教师主动参与，把很多丰富的实际教学经验融入研发当中，使整个智慧课堂的建设更具实用性和前瞻性。',
        },
        {
          id: 1,
          imgUrl: require('@/assets/images/5.png'),
          title: '助力智慧课堂：课堂派成为腾讯微校生态战略伙伴',
          detail: '7月18日，腾讯微校发布会在北京船山书院如期举行，正式推出以微信校园卡、腾讯校园码为核心的数字校园解决方案——腾讯微校2.0。本次发布会突破传统Q&A的传统模式，现场模拟校园场景，利用“一款非常好用的应用”课堂派进行了现场互动。作为腾讯微校的生态战略伙伴，互动教学品牌课堂派展现了科技时代，智慧课堂所带来的创新和变化。',
        },
        {
          id: 2,
          imgUrl: require('@/assets/images/6.png'),
          title: '新时代新青年 课堂派创始人陈杰宾的创业梦',
          detail: '6月26日，中国共产主义青年团第十八次全国代表大会在人民大会堂开幕。共青团委对福建省驻京团工委点赞，CCTV新闻频道进行了同步报道。分享会上，课堂派创始人陈杰宾作为闽籍创业青年代表，向在京青年创业者分享了课堂派的发展模式以及创业历程。',
        }, {
          id: 3,
          imgUrl: require('@/assets/images/2.png'),
          title: '【新浪新闻】课堂派云管理颠覆高校传统实习模式',
          detail: '用课堂派最大的好处就是在学习的过程中，随时跟老师进行沟通和分享，无论从知识和情感层面都需要倾诉，而课堂派不仅提供跟老师同学交流的机会，还能够获得别人的指导和鼓励，让整个学习过程更加轻松。',
        }, {
          id: 4,
          imgUrl: require('@/assets/images/4.png'),
          title: '【华北电力大学】“互联网+”让教育发现每一个学生',
          detail: '“课堂上教师要及时了解学生对内容的掌握程度，课下学生也希望教师能对自己的学习困难进行及时的指导。”在以前，这些实现起来比较困难的事情，“课堂派”可以让这一切变得轻而易举。',
        }
      ]
    }
  }

}
</script>

<style scoped lang="less">

//#home {
//  /*background-image: url("./assets/images/bg1.png");*/
//  /*background-repeat: no-repeat;*/
//  /*background-size: cover;*/
//  font-family: Avenir, Helvetica, Arial, sans-serif;
//  -webkit-font-smoothing: antialiased;
//  -moz-osx-font-smoothing: grayscale;
//  text-align: center;
//  color: #2c3e50;
//  margin: 0;
//}

.blend-list > div, .wisdom, .mechanism {
  width: 1224px;
  margin: 0 auto;
}

.head {
  text-align: center;
  padding: 64px 0 40px;
}

.title {
  font-size: 40px;
  font-weight: 500;
  color: #1f2023;
}

.detail {
  height: 32px;
  font-size: 20px;
  color: #74787c;
  margin-top: 16px;
}
.understand{
  margin-top: 30px;
}

.wisdomList /deep/ .box{
  box-shadow: 30px 20px 100px -63px #8297b2!important;
  width: 280px;
  height: 310px;
  margin-bottom: 30px;
}
</style>
