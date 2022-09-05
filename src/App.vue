  <template>
  <div id="app">
    <!--    <router-view/>-->
    <!--    <div  class="global-loading-box">-->
    <!--      <div class="loading-content">-->
    <!--        <img src="./assets/images/loading.gif" style="width: 100px">-->
    <!--      </div>-->
    <!--    </div>-->
<!--    <Home/>-->
<!--    <Login/>-->
<!--    <Register/>-->
    <router-view/>
  </div>

</template>

<script>

import Home from "@/pages/Home";
import LoginBox from "@/components/login/LoginBox";
import Login from "@/pages/Login";
import Register from "@/pages/Register";

export default {
  name: 'App',
  components: {Home,LoginBox,Login,Register}
}
</script>

<style lang="css">

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
}

.global-loading-box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
