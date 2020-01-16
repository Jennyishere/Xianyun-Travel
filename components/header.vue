<template>
  <div class="header">
    <el-row class="head" type="flex" justify="space-between" align="middle">
      <div class="logo">
        <nuxt-link to="/">
          <img src="/logo.jpg" alt />
        </nuxt-link>
      </div>
      <el-row class="navs" type="flex">
        <nuxt-link to="/">首页</nuxt-link>
        <nuxt-link to="/post">旅游攻略</nuxt-link>
        <nuxt-link to="/hotel">酒店</nuxt-link>
        <nuxt-link to="/air">国内机票</nuxt-link>
      </el-row>
      <div class="right">
        <nuxt-link to="/user/login">登录/注册</nuxt-link>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="less">
.header {
  border-bottom: 1px solid #ccc;
  height: 60px;
}
.head {
  width: 1000px;
  height: 60px;
  margin: 0 auto;
  img {
    display: block;
    width: 156px;
    height: 60px;
    margin-right: 20px;
  }
  .navs {
    a {
      padding: 0 20px;
      box-sizing: border-box;
      height: 60px;
      &:hover {
        color: #409eff;
        border-bottom: 4px solid #409eff;
      }
    }
  }
}
.navs {
  flex: 1;
  line-height: 60px;
}

.right {
  line-height: 60px;
  height: 60px;
  a {
    display: block;
    padding: 0 20px;
    box-sizing: border-box;
    height: 60px;
  }
}
.nuxt-link-exact-active {
  background-color: #409eff;
  color: #fff;
  &:hover {
    color: #fff;
  }
}
</style>