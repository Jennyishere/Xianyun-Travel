<template>
  <div class="loginForm">
    <el-form
      :model="users"
      :rules="rules"
      ref="users"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="手机号" prop="username">
        <el-input v-model="users.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="users.password" autocomplete="off"></el-input>
      </el-form-item>
      
      <el-form-item>
        <el-button type="primary" @click="submitForm('users')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
    data() {
        var validateUsername = (rule, value, callback) => {
            let reg = /^1[3-9][0-9]{9}$/
        if (!reg.test(value)) {
          callback(new Error('请输入正确的手机号'));
        } else {
            // 验证成功 发送登录请求
        //   console.log(123);
          
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
        return {
            users: {
                username:'13800138000',
                password:'123456'
            },
            rules: {
               username:[
                   { validator: validateUsername, trigger: 'blur' }
               ] ,
               password: [
                    { validator: validatePass, trigger: 'blur' }
               ]
            }
        }
    },
    methods : {
        submitForm() {
            // console.log(this.users);
            this.$refs.users.validate((valid) => {
                if(valid) {
                    this.$axios({
                        method: 'post',
                        url:'/accounts/login',
                        data:this.users
                    }).then(res=> {
                        console.log(res);
                        // 将数据存到store里
                        this.$store.commit('user/setUserInfo',res.data)
                        console.log(this.$store.state.user);
                        console.log(this.$store.state.user.userInfo.token);
                        // 跳转
                        this.$router.push('/')
                    })
                }else {
                    return false;
                }
            })
        }
    }
};
</script>

<style lang="less">

</style>