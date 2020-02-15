<template>
  <div class="filters">
    <el-row type="flex" class="filters-top" justify="space-between" align="middle">
      <el-col :span="8">
        单程：
        {{data.info.departCity}} - {{data.info.destCity}}
        /
        {{data.info.departDate}}
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="airport" placeholder="起飞机场" @change="handleAirport">
          <el-option
            v-for="(item,index) in data.options.airport"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="flightTimes" placeholder="起飞时间" @change="handleFlightTimes">
          <el-option
            v-for="(item,index) in data.options.flightTimes"
            :key="index"
            :label="`${item.from}:00 - ${item.to}:00`"
            :value="`${item.from},${item.to}`"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="company" placeholder="航空公司" @change="handleCompany">
          <el-option
            v-for="(item,index) in data.options.company"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="airSize" placeholder="机型" @change="handleAirSize">
          <el-option
            v-for="(item, index) in sizeOptions"
            :key="index"
            :label="item.name"
            :value="item.size"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <div class="filter-cancel">
      筛选：
      <el-button type="primary" round plain size="mini" @click="handleFiltersCancel">撤销</el-button>
    </div>
    <span>{{filter}}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      airport: "", // 机场
      flightTimes: "", // 出发时间
      company: "", // 航空公司
      airSize: "", // 机型大小
      sizeOptions: [
        { name: "大", size: "L" },
        { name: "中", size: "M" },
        { name: "小", size: "S" }
      ]
    };
  },
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  //methods里用的方法是只对单个筛选有效 要监听多个属性 需要用到计算属性的filter 需要在页面渲染出来才有效 如果不想显示内容就return ""
  computed: {
    filter() {
      const newData = this.data.flights.filter(v => {
        //    先假设全部符合条件 再排除不符合的条件
        let valid = true;
        // 且因为select框做了双向绑定
        if (this.airport && this.airport !== v.org_airport_name) {
          valid = false;
        }
        if (this.company && this.company !== v.airline_name) {
          valid = false;
        }
        if (this.airSize && this.airSize !== v.plane_size) {
          valid = false;
        }
        if (this.flightTimes) {
          const [from, to] = this.flightTimes.split(",");
          const start = +v.dep_time.split(":")[0];
          if (start < from || start >= to) {
            valid = false;
          }
        }
        return valid;
      });
      this.$emit("setDataList", newData);
      return "";
    }
  },
  methods: {
    // 选择机场时候触发
    handleAirport(value) {
      //   const newData = this.data.flights.filter(v => {
      //     return v.org_airport_name == value;
      //   });
      //   console.log(newData);
      //   // 得到符合条件的数据后 高诉父组件
      //   this.$emit("setDataList", newData);
    },

    // 选择出发时间时候触发
    handleFlightTimes(value) {
      //   const [from, to] = value.split(",");
      //   console.log("7" < from, to);
      //   const newData = this.data.flights.filter(v => {
      //     const start = +v.dep_time.split(":")[0];
      //     return start >= from && start < to;
      //   });
      //   // 得到符合条件的数据后 高诉父组件
      //   this.$emit("setDataList", newData);
    },

    // 选择航空公司时候触发
    handleCompany(value) {
      //   const newData = this.data.flights.filter(v => {
      //     return v.airline_name == value;
      //   });
      //   // 得到符合条件的数据后 高诉父组件
      //   this.$emit("setDataList", newData);
    },

    // 选择机型时候触发
    handleAirSize(value) {
      //   const newData = this.data.flights.filter(v => {
      //     return v.plane_size == value;
      //   });
      //   console.log(newData);
      //   // 得到符合条件的数据后 高诉父组件
      //   this.$emit("setDataList", newData);
    },

    // 撤销条件时候触发
    handleFiltersCancel() {
      this.airport = ""; // 机场
      this.flightTimes = ""; // 出发时间
      this.company = ""; // 航空公司
      this.airSize = "";
      this.$emit("setDataList", this.data.flights);
    }
  }
};
</script>

<style scoped lang="less">
.filters {
  margin-bottom: 20px;
}

.filters-top {
  > div {
    /deep/ .el-select {
      margin-left: 10px;
    }
  }
}

.filter-cancel {
  margin-top: 10px;
}
</style>