<template>
  <div class="search-form">
    <!-- 头部tab切换 -->
    <el-row type="flex" class="search-tab">
      <span
        v-for="(item, index) in tabs"
        :key="index"
        @click="handleSearchTab(item, index)"
        :class="{active: index === currentTab}"
      >
        <i :class="item.icon"></i>
        {{item.name}}
      </span>
    </el-row>
    <el-form class="search-form-content" ref="form" label-width="80px">
      <div class="reverse">
        <span @click="handleReverse">换</span>
      </div>
      <el-form-item label="出发城市">
        <!-- fetch-suggestions 返回输入建议的方法 -->
        <!-- 组件是input输入框里的远程搜索 select 点击选中建议项时触发 -->
        <el-autocomplete
          v-model="form.departCity"
          :fetch-suggestions="queryDepartSearch"
          placeholder="请输入出发城市"
          @blur="handleDepartBlur"
          @select="handleDepartSelect"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="到达城市">
        <el-autocomplete
          v-model="form.destCity"
          :fetch-suggestions="queryDestSearch"
          placeholder="请输入到达城市"
          @blur="handleDestBlur"
          @select="handleDestSelect"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="出发时间">
        <!-- 日期piker组件 -->
        <el-date-picker
          v-model="form.departDate"
          type="date"
          placeholder="选择日期"
          @change="hadleDate"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label>
        <el-button style="width:100%;" type="primary" icon="el-icon-search" @click="handleSubmit">搜索</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import momment from 'moment'
export default {
  data() {
    return {
      tabs: [
        { icon: "iconfont icondancheng", name: "单程" },
        { icon: "iconfont iconshuangxiang", name: "往返" }
      ],
      currentTab: 0,
      form: {
        departCity: "",
        departCode: "",
        destCity: "",
        destCode: "",
        departDate: ""
      },
      //   出发城市
      departData: [],
      // 目的地城市
      destData: []
    };
  },
  methods: {
    handleSearchTab(item, index) {
      if (index == 1) {
        this.$alert("目前暂不支持往返，请使用单程选票！", "提示", {
          confirmButtonText: "确定"
        });
      }
    },
    // 出发城市的下拉
    handleDepartSelect(item) {
        // console.log(item); item可以拿到当前的选项的信息        
        // 把选中的城市的code赋给数据
        this.departCode = item.sort
    },
    // 目的城市的下拉
    handleDestSelect(item) {
        this.destCode = item.sort

    },
    // 出发城市搜索的监听
    queryDepartSearch(value, callback) {
      //   如果输入框为空
      if (!value) return;
      //   多出使用 银川封装在actions里
      this.$store.dispatch("airs/citySearch", value).then(res => {
        this.departData = res;
        callback(res);
      });
    },
    // 目的城市搜索的监听
    queryDestSearch(value, callback) {
      if (!value) return;
      this.$store.dispatch("airs/citySearch", value).then(res => {
        this.destData = res;
        callback(res);
      });
    },
    // 出发城市输入框失焦
    handleDepartBlur() {
      if (this.departData.length == 0) return;
      // 非空时默认选中第一个 因为在input事件里已经把数据存下来了
      this.form.departCity = this.departData[0].value;
      this.form.departCode = this.departData[0].sort;
    },
    // 目的城市输入框失焦
    handleDestBlur() {
      if (this.destData.length == 0) return;
      // 非空时默认选中第一个
        this.form.destCity = this.destData[0].value
        this.form.destCode = this.destData[0].sort
    },
    // 处理时间
    hadleDate(value) {
    //   console.log(value);
      this.form.departDate = momment(value).format('YYYY-MM-DD')
    },
    // 点击交换出发和目的地
    handleReverse() {},
    //提交表单
    handleSubmit() {
      console.log(this.form);
    //   获取所有的数据后就可以跳转了
    this.$router.push({
        path:'air/flights',
        // 传参
        query: this.form
    })
    }
  }
};
</script>

<style scoped lang="less">
.search-form {
  border: 1px #ddd solid;
  border-top: none;
  width: 360px;
  height: 350px;
  box-sizing: border-box;
}

.search-tab {
  span {
    display: block;
    flex: 1;
    text-align: center;
    height: 48px;
    line-height: 42px;
    box-sizing: border-box;
    border-top: 3px #eee solid;
    background: #eee;
  }

  .active {
    border-top-color: orange;
    background: #fff;
  }

  i {
    margin-right: 5px;
    font-size: 18px;

    &:first-child {
      font-size: 16px;
    }
  }
}

.search-form-content {
  padding: 15px 50px 15px 15px;
  position: relative;

  .el-autocomplete {
    width: 100%;
  }
}

.reverse {
  position: absolute;
  top: 35px;
  right: 15px;
  &:after,
  &:before {
    display: block;
    content: "";
    position: absolute;
    left: -35px;
    width: 25px;
    height: 1px;
    background: #ccc;
  }

  &:after {
    top: 0;
  }

  &:before {
    top: 60px;
  }

  span {
    display: block;
    position: absolute;
    top: 20px;
    right: 0;
    font-size: 12px;
    background: #999;
    color: #fff;
    width: 20px;
    height: 20px;
    line-height: 18px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;

    &:after,
    &:before {
      display: block;
      content: "";
      position: absolute;
      left: 10px;
      width: 1px;
      height: 20px;
      background: #ccc;
    }

    &:after {
      top: -20px;
    }

    &:before {
      top: 20px;
    }
  }
}
</style>