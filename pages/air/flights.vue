<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <div>
          <FlightsFilters :data="flightsData"/>
        </div>

        <!-- 航班头部布局 -->
        <div>
          <FlightsListHead></FlightsListHead>
        </div>

        <!-- 航班信息 -->
        <div>
          <!-- 航班列表 -->
          <FlightsItem v-for="item in dataList" :key="item.id" :data="item"></FlightsItem>
          <!-- 分页 -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageIndex"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="PageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="flightsData.total"
          ></el-pagination>
        </div>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
      </div>
    </el-row>
  </section>
</template>

<script>
import FlightsListHead from "@/components/air/flightsListHead";
import FlightsItem from "@/components/air/flightsItem";
import FlightsFilters from "@/components/air/flightsFilters.vue"
export default {
  components: {
    FlightsListHead,
    FlightsItem,
    FlightsFilters
  },
  data() {
    return {
      flightsData: {
        // 为了解决undefined的问题  
        info: {},
        options: {}
      },
      dataList: [],

      PageSize: 5, //显示条数
      pageIndex: 1,
    };
  },
  mounted() {
    this.$axios({
      url: "/airs",
      params: this.$route.query
    }).then(res => {
      console.log(res);
      this.flightsData = res.data;
      // this.dataList = res.data.flights;
      this.setDataList();
    });
  },
  methods: {
    // 条数改变时 把值给pageSize
    handleSizeChange(val) {
      this.PageSize = val;
      this.setDataList();
    },
    // 当前页改变
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.setDataList();
    },
    // 切割数据
    setDataList() {
      this.dataList = this.flightsData.flights.slice(
        (this.pageIndex - 1) * this.PageSize,
        this.pageIndex * this.PageSize
      );
      
    }
  }
};
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>