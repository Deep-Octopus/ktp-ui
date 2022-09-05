<template>
  <el-row class="content">
    <el-col :span="14" class="leftImg">

    </el-col>
    <el-col :span="8">
      <div>
        <div class="rightList">
          <NormalList :items="items"/>
        </div>
        <div class="rightButton">
          <TwoButton
              :font-size="16"
              left-bt-value="了解详细功能"
              right-bt-value="申请免费试用"
              :wide="160"
              :height="48"
              right-type="primary"/>
        </div>
      </div>

    </el-col>
  </el-row>

</template>
<script>
import TwoButton from "@/components/home/TwoButton";
import NormalList from "@/components/home/NormalList";

export default {
  components: {
    NormalList,
    TwoButton
  },
  data() {
    return {
      items: [
        {
          title: '精准高效管理教学事务',
          detail: '一键对接教务系统，精准高效管理师生教学、课程、课务。'
        }, {
          title: '有效提升教学质量',
          detail: '以课堂教学为核心，以产出为导向；实时监控师生、课程、教学活动等教学过程。'
        }, {
          title: '教学资产管理',
          detail: '沉淀教学过程资产，促进优质课程、资源、知识图谱建设。'
        }, {
          title: '智慧校园全景定制',
          detail: '以学生为中心，以教学为导向，提供校园全景智慧教学解决方案。'
        }
      ]
    }
  },

}
</script>

<style lang="less">
.leftImg {
  background-image: url("../../assets/images/mecShow.7f324bbf.png");

  width: 56%;
  height: 625px;
  background-position: 100%;
  background-size: cover;
  background-repeat: no-repeat;
}

.rightButton {
  margin: 70px 0;
}

</style>