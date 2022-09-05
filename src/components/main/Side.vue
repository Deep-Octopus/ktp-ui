<template>
  <div class="sidebar">
    <ul>
      <li><i class="iconfont">&#xeabe;</i><span>待办</span></li>
      <li><i class="iconfont">&#xe93e;</i><span>私信</span></li>
      <li><i class="iconfont">&#xe69b;</i><span>好友</span></li>
      <li><i class="iconfont">&#xe769;</i><span>客服</span></li>
      <li><i class="iconfont">&#xe600;</i><span>公众号</span></li>
      <li><i class="iconfont">&#xe60c;</i><span>反馈</span></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Side"
}
</script>

<style scoped lang="less">
.sidebar {
  position: fixed;
  z-index: 2;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  background: #fff;
  border-radius: 8px 0 0 8px;
  box-shadow: 0 0 18px 0 rgb(0 0 0 / 10%);

  & ul li {
    padding: 0 10px;
    cursor: pointer;
    margin-bottom: 12px;
    color: #ff6000;
    font-weight: 600;
    text-align: center;

    & i {
      display: block;
      font-size: 30px;
    }

    & span {
      font-size: 12px;
      line-height: 16px;
    }
  }
}

</style>