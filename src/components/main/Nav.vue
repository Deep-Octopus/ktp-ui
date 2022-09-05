<template>
  <div class="nav">
    <div class="logo">
      <img :src="logo" alt="#">
    </div>
      <div class="tabs" >
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item v-for="item in items" v-if="item.show" :index=item.index>{{item.labelName}}</el-menu-item>
        </el-menu>
        <!--      <Tabs :items="tabItems" ref="tab"/>-->
      </div>
    <div class="avatar-area">
      <AvatarArea></AvatarArea>
    </div>

  </div>

</template>
<script>
import Tabs from "@/components/home/Tabs";
import AvatarArea from "@/components/main/AvatarArea";

export default{
  data() {
    return {
      activeIndex: '1',
      items:[
        {
          labelName:'我的课堂',
          index:'1',
          show:true
        },
        {
          labelName:'备课区',
          index:'2',
          show: this.isTeacher
        },
        {
          labelName:'虚拟教研室',
          index:'3',
          show: this.isTeacher
        }
      ]
    }
  },
  props:[
    'logo',
    'isTeacher'
  ],
  computed:{



  },
  methods:{
    handleSelect(key, keyPath) {
      console.log(this.$parent.setIndex(key))
    }
  },
  watch:{

  },
  components: {
    AvatarArea,Tabs
  }
}
</script>

<style lang="less" scoped>
::v-deep .el-menu{
  transform: translateY(4px);
}
::v-deep.el-menu-item{
  margin: 0 20px!important;
  padding: unset!important;
  border: 4px solid transparent;
  font-size: 16px;
  color: #303133;
}


::v-deep .el-menu--horizontal>.el-menu-item.is-active{
  border-bottom-width: 4px;
  color: #68a3ff;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  transition: border-bottom-width,color .3s;
  & :after{

  }
}
//::v-deep el-menu--horizontal>.el-menu-item.is-active:after {
//   border-bottom: 3px solid #4285f4;
//
// }
.nav{
  height: 64px;
  width: 100%;
  margin-bottom: 12px;
  box-sizing: border-box;
  box-shadow: 0 0 10px #ccc;
}
.logo{
  float: left;
  width: 120px;
  height: 30px;
}
.logo img{
  height: 28px;
  width: 112px;
  margin: 20px 30px;
}
.tabs{
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  border-bottom-width: 0;
}

/deep/ .el-tabs__item {
  height: 64px;
  line-height: 68px;
  font-size: 18px;
}
///deep/ .el-tabs__item:hover{
//
//}

.avatar-area{
  float: right;
  display: flex;
  gap: 20px;
  margin-right: 25px;
  margin-top: 7px;
  line-height: 40px;
  color: black;
  font-weight: bold;
  cursor: pointer ;
}
</style>