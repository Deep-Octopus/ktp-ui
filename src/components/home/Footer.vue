<template>
  <div class="footer">
    <div class="layer-one">
      <div class="left">
        <div class="bottom-logo">
          <img :src="bottomLogoUrl" alt="#">
        </div>
        <ul>
          <li v-for="msg in leftMsg">
            <a>{{ msg }}</a>
          </li>
        </ul>
      </div>

      <div class="right">
        <div class="contact">
          <p v-for="item in contactItems">
            <img v-if="item.hasImg" :src="item.imgUrl" alt="#">
            {{item.msg}}
          </p>
        </div>
        <div class="qrcode" v-for="item in qrcodeItems">
          <img :src="item.codeUrl" alt="#">
          <p>{{item.msg}}</p>
        </div>
      </div>
    </div>
    <div class="layer-two">
      <span v-for="item in bottomItems">
        {{item.start}}
        <a target="_blank" :href="item.url">{{item.msg}}</a>
      </span>
    </div>
  </div>
</template>
<script>


export default{
  data(){
    return{
      bottomLogoUrl:require('@/assets/images/bottomlogo.png'),
      leftMsg:[
          '关于我们',
          '服务条款',
          '产品动态',
          '浏览器下载'
      ],
      contactItems:[{
        hasImg:false,
        imgUrl:'',
        msg:'联系我们'
      },{
        hasImg:false,
        imgUrl:'',
        msg:'(工作日09:30～18:30)'
      },{
        hasImg:true,
        imgUrl:require('@/assets/images/电话.png'),
        msg:' 010-57748642 '
      },{
        hasImg:true,
        imgUrl:require('@/assets/images/邮件.png'),
        msg:' hi@ketangpai.com '
      }],
      qrcodeItems:[{
        codeUrl:require('@/assets/images/paipai.f19f488d.png'),
        msg:'课堂派客服-派派'
      },{
        codeUrl: require('@/assets/images/portalQRcode.24a37b5d.png'),
        msg:'扫码开启移动教学'
      }],
      bottomItems:[{
        start:' Copyright © 2014 ketangpai.com All Rights Reserved. ',
        url:'https://beian.miit.gov.cn/#/Integrated/recordQuery',
        msg:'京ICP备14023276号-4'
      },{
        start:'',
        url:'https://app.eduyun.cn/mapp/mappCorpDetail?id=003344',
        msg:'教APP备1101923号'
      },{
        start:'',
        url:'http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11011402010566',
        msg:'京公网安备 11011402010566号'
      }]
    }
  },
  props:[

  ]
}
</script>

<style lang="css" scoped>
.footer{
  min-width: 1224px;
}
img{
   border: none;
 }
.layer-one{
  background-color: #272e38;
  padding: 0 120px;
  display: flex;
  justify-content: space-between;
}
.left{
  color: white;
  padding: 65px 0;
}
.bottom-logo{
  height: 32px;
  width: 128px;
  margin-bottom: 8px;
}
.bottom-logo img{
  width: 128px;
}
ul{
  display: flex;
  margin-top: 30px;
}
li{
  margin-top: 20px;
  margin-right: 64px;
}
ul,li{
  list-style-type: none;
}


.right{
  display: flex;
}

.contact{
  padding: 60px 0;
  margin-right: 20px;
}
.contact p{
  font-size: 14px;
  font-weight: 500;
  color: #fff;
  display: flex;

}
.contact p:nth-child(1){
  font-size: 14px;
  font-weight: 500;
  color: #fff;
  display: flex;
}
.contact p:nth-child(2){
  font-size: 12px;
  font-weight: 400;
  color: #6d7790;
  margin-top: 2px;
  margin-left: 5px;
}
.contact p:nth-child(3){
  margin: 16px 0;
}
.contact p:nth-child(3) img,.contact p:nth-child(4) img{
  transform: translateY(-12px);
  margin-right: 8px;
}
.qrcode{
  padding: 40px 0;
  margin-left: 20px;
}
.qrcode img{
  width: 120px;
}
.qrcode p{
  transform: translate(-5px,30px);
  font-size: 14px;
  font-weight: 500;
  color: #fff;
  text-align: center;
}
.layer-two{
  width: 100%;
  height: 48px;
  background: #15191f;
  text-align: center;
}
.layer-two span{
  font-size: 12px;
  color: #647184;
  margin-right: 60px;
  line-height: 48px;
}
.layer-two span a{
  text-decoration: none;
  color: #647184;
}
</style>