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
                  //  调用dispatch方法给store赋值 把用户数据传过去
                  this.$store.dispatch('user/login',this.users).then(res=> {
                    this.$message({
                      message: '登录成功，正在跳转',
                      type: 'success'
                    })
                    // 如果从其他页面跳过来要求登录 登录完就跳回去
                    this.$router.replace(this.$route.query.returnUrl || '/')
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