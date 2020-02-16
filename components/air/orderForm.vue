<template>
  <div class="main">
    <div class="air-column">
      <h2>乘机人</h2>
      <el-form class="member-info">
        <!-- 循环user数组 绑定乘车人 -->
        <div class="member-info-item" v-for="(item,index) in form.users" :key="index">
          <el-form-item label="乘机人类型">
            <el-input placeholder="姓名" class="input-with-select" v-model="item.username">
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="成人" value="1"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <el-form-item label="证件类型">
            <el-input placeholder="证件号码" class="input-with-select" v-model="item.id">
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="身份证" value="1" :checked="true"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <span class="delete-user" @click="handleDeleteUser(index)">-</span>
        </div>
      </el-form>

      <el-button class="add-member" type="primary" @click="handleAddUsers">添加乘机人</el-button>
    </div>

    <div class="air-column">
      <h2>保险</h2>
      <div>
        <div class="insurance-item" v-for="(item,index) in infoData.insurances" :key="index">
          <el-checkbox
            :label="`${item.type} ：￥${item.price}/份×1  最高赔付${item.compensation}`"
            border
            @change="handleInsurance(item.id)"
          ></el-checkbox>
        </div>
      </div>
    </div>

    <div class="air-column">
      <h2>联系人</h2>
      <div class="contact">
        <el-form label-width="60px">
          <el-form-item label="姓名">
            <el-input v-model="form.contactName"></el-input>
          </el-form-item>

          <el-form-item label="手机">
            <el-input placeholder="请输入内容" v-model="form.contactPhone">
              <template slot="append">
                <el-button @click="handleSendCaptcha">发送验证码</el-button>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item label="验证码">
            <el-input v-model="form.captcha"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="warning" class="submit" @click="handleSubmit">提交订单</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        users: [
          {
            username: "",
            id: ""
          }
        ],
        insurances: [],
        contactName: "",
        contactPhone: "",
        captcha: "",
        invoice: false,
        seat_xid: this.$route.query.seat_xid,
        air: this.$route.query.id
      },
      // 当前机票信息
      infoData: {
        insurances: [] // 初始化保险数据
      }
    };
  },
  mounted() {
    //   获取当前的机票信息
    console.log(this.form.air);

    this.$axios({
      url: `airs/${this.form.air}`,
      params: {
        seat_xid: this.form.seat_xid
      }
    }).then(res => {
      console.log(res);
      this.infoData = res.data;
      // 存到store里
      this.$store.commit("airs/setOrderDetail", res.data);
    });
  },
  methods: {
    // 添加乘机人
    handleAddUsers() {
      this.form.users.push({
        username: "",
        id: ""
      });
    },

    // 移除乘机人
    handleDeleteUser(index) {
      this.form.users.splice(index, 1);
    },

    // 选择保险
    handleInsurance(id) {
      console.log(id);
      // 先判断是否已经存在
      const index = this.form.insurances.indexOf(id);
      // 存在就删除
      if (index > -1) {
        this.form.insurances.splice(index, 1);
      } else {
        this.form.insurances.push(id);
      }
    },
    // 发送手机验证码
    handleSendCaptcha() {
      if (!this.form.contactPhone) {
        this.$message.error("手机号不能为空");
        return;
      }
      // 调用我们封装在store里的请求
      this.$store.dispatch("user/Captcha", this.form.contactPhone).then(res => {
        this.$message.success("验证码发送成功");
      });
    },

    // 提交订单
    handleSubmit() {
      // 自定义验证规则
      const rules = {
        users: {
          errMsg: "乘机人信息不能为空",
          validator: () => {
            let valid = this.form.users.every(v => {
              return !!v.username && !!v.id;
            });
            return valid;
          }
        },
        contactName: {
          errMsg: "联系人不能为空",
          validator: () => {
            return !!this.form.contactName; //两个！表示ture
          }
        },
        contactPhone: {
          errMsg: "手机不能为空",
          validator: () => {
            return !!this.form.contactPhone;
          }
        },
        captcha: {
          errMsg: "验证码不能为空",
          validator: () => {
            return !!this.form.captcha;
          }
        }
      };

      // 循环rules调用validator完成校验   Object.keys(rules)遍历得到对象键名
      // 先假设全都符合
      let valid = true;
      Object.keys(rules).forEach(v => {
        // 如果已有不符合的 阻止往下执行
        if (!valid) return;

        valid = rules[v].validator(); //找到函数并执行 拿到布尔值判断
        if (!valid) {
          this.$message.error(rules[v].errMsg);
        }
      });
      // 如果验证没通过，就直接返回
      if (!valid) return;
      console.log(111);
      this.$axios({
        method: "post",
        url: "/airorders",
        data: this.form
        // headers: {
        //   // 必须要做token前面加上`Bearer `字符串，后面有一个空格的
        //   Authorization: `Bearer ` + this.$store.state.user.userInfo.token
        // }
      }).then(res => {
        console.log(res);
      });
    }
  }
};
</script>

<style scoped lang="less">
.air-column {
  border-bottom: 1px #ddd dashed;
  padding-bottom: 20px;
  margin-bottom: 20px;
}

.air-column h2 {
  margin-bottom: 20px;
  font-size: 22px;
  font-weight: normal;
}

/deep/ .el-select .el-input {
  width: 130px;
}

.input-with-select {
  width: 590px;
}

.input-with-select /deep/ .el-input-group__prepend {
  background-color: #fff;
}
.member-info /deep/ .el-form-item {
  margin-bottom: 0;
}

.member-info-item {
  border-bottom: 1px #eee dashed;
  padding-bottom: 20px;
  position: relative;

  &:first-child {
    .delete-user {
      display: none;
    }
  }
}

.add-member {
  margin-top: 20px;
}

.delete-user {
  display: block;
  background: #ddd;
  width: 16px;
  height: 16px;
  font-size: 14px;
  text-align: center;
  line-height: 16px;
  color: #fff;
  cursor: pointer;
  border-radius: 50px;
  position: absolute;
  right: -30px;
  top: 50%;
}

.insurance {
  > div {
    margin-top: 10px;
  }
}

.insurance-item {
  margin-bottom: 20px;
}

.contact {
  /deep/ .el-input {
    width: 50%;
  }
}

.submit {
  margin: 50px auto;
  display: block;
  width: 250px;
  height: 50px;
}
</style>