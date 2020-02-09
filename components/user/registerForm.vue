<template>
  <el-form :model="user" ref="user" :rules="rules" class="form">
    <el-form-item class="form-item" prop="username">
      <el-input v-model.trim="user.username" placeholder="用户名手机"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="captcha">
      <el-input v-model="user.captcha" placeholder="验证码">
        <template slot="append">
          <el-button @click="handleSendCaptcha">发送验证码</el-button>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="nickname">
      <el-input v-model="user.nickname" placeholder="你的名字"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="password">
      <el-input v-model="user.password" placeholder="密码" type="password"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="repassword">
      <el-input v-model="user.repassword" placeholder="确认密码" type="password"></el-input>
    </el-form-item>

    <el-button class="submit" type="primary" @click="handleRegSubmit">注册</el-button>
  </el-form>
</template>

<script>
export default {
  data() {
    //   验证用户名
    var validateUsername = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入手机号"));
      } else {
        if (!/^1[3-9][0-9]{9}/.test(value)) {
          callback(new Error("请输入正确的手机号"));
        } else {
          callback();
        }
      }
    };

    // 验证第二次密码
    var validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.user.repassword !== "") {
          this.$refs.user.validateField("repassword");
        }
        callback();
      }
    };
    var validateRepassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.user.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      user: {
        username: "",
        nickname: "",
        captcha: "",
        password: "",
        repassword: ""
      },
      rules: {
        //   给`el-form-item`添加对应的`prop`属性。
        username: [{ validator: validateUsername, trigger: "blur" }],
        nickname: [{ required: true, message: "请输入名字", trigger: "blur" }],
        captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
        repassword: [{ validator: validateRepassword, trigger: "blur" }]
      }
    };
  },
  methods: {
    handleSendCaptcha() {
      // 先判断手机号是否为空
      if (this.user.username == "") {
        return;
      } else {
        console.log(this.user.username);

        this.$store.dispatch("user/Captcha", this.user.username).then(res => {
          this.$message.success('验证码为000000')
        });
      }
    },
    handleRegSubmit() {
        this.$refs.user.validate((valid)=> {
            if(valid) {
                const {repassword, ...data} = this.user;
                 this.$store.dispatch("user/register", data).then(res=> {
                     this.$message('注册成功')
                     this.$router.push('/')
                 })
            }else {
                return;
            }
        })
    }
  }
};
</script>

<style lang="less">
.form {
  margin: 20px;
}
</style>