<template>
  <el-carousel :interval="60000" type="card" height="384px">
    <el-carousel-item  v-for="item in items" :key="item.id">
      <Card :item="item"></Card>
    </el-carousel-item>
  </el-carousel>
</template>
<script >
import Card from "@/components/home/Card";
export default {
  components:{
    Card
  },
  props:[
      "items"
  ],
  methods:{
    change(pre,next,index){
      console.log(pre+"/"+next+'/'+index)
    }
  }
}
</script>
<style scoped lang="less">

/deep/.el-carousel__item::after{
  content: "";
  width: 8px;
  background: #2178ff;
  border-radius: 0 5px 5px 0;
  position: absolute;
  right: 0;
  top: 40px;
  bottom: 40px;
}

/deep/ .el-carousel__mask{
  width: 100%;
  background-color: #fff;
  opacity: .24;
  transition: .2s;
  z-index: 2;
}
/deep/ .el-carousel__mask:hover{
  background-color: #fff;
  opacity: .24!important;
}

</style>