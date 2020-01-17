<template>
  <div class="login">
    <div class="container">
      <div class="wraper">
        <el-row type="flex" justify="space-around" class="box">
          <span
            @click="handleTab(i)"
            :class="{active:currentTab==i}"
            v-for="(e,i) in ['登录','注册']"
            :key="i"
          >{{e}}</span>
          <!-- <span>注册</span> -->
        </el-row>
        <loginForm class="form"></loginForm>
      </div>
    </div>
  </div>
</template>

<script>
import loginForm from "@/components/user/loginForm";
export default {
  components: {
    loginForm
  },
  data() {
    return {
      currentTab: 0
    };
  },
  // 点击切换tab栏
  methods: {
    handleTab(i) {
      this.currentTab = i;
    }
  }
};
</script>

<style lang="less">
.container {
  min-width: 1000px;
  height: 700px;
  background: url("/bar1.jpg");
  overflow: hidden;
  .wraper {
    width: 400px;
    margin: 0 auto;
    background: #fff;
    box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);
  }
}
.box {
  margin: 50px auto;
  background-color: #fff;
  span {
    display: block;
    flex: 1;
    height: 40px;
    line-height: 40px;
    padding: 5px;
    font-size: 18px;
    text-align: center;
    background-color: #eeeeee;
    color: #333;
    &.active {
      background-color: #fff;
      color: #ffa500;
      border-top: 2px solid #ffa500;
    }
  }
}

</style>