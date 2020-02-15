<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <div>
          <FlightsFilters :data="cacheFlightsData" @setDataList="setDataList" />
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
        <FlightsAside />
      </div>
    </el-row>
  </section>
</template>

<script>
import FlightsListHead from "@/components/air/flightsListHead";
import FlightsItem from "@/components/air/flightsItem";
import FlightsFilters from "@/components/air/flightsFilters.vue";
import FlightsAside from "@/components/air/flightsAside";
export default {
  components: {
    FlightsListHead,
    FlightsItem,
    FlightsFilters,
    FlightsAside
  },
  data() {
    return {
      flightsData: {
        // 为了解决undefined的问题
        flights: [],
        info: {},
        options: {}
      },
      cacheFlightsData: {
        // 缓存一份数据，只会修改一次
        flights: [],
        info: {},
        options: {}
      },
      dataList: [],

      PageSize: 5, //显示条数
      pageIndex: 1,
      total: 0
    };
  },
  // 当<FlightsAside/>的路由改变后页面没有刷新 因为mounted及事件缓存 需要添加一个监听$route()事件重新加载页面或添加组件导航守卫
  beforeRouteUpdate(to, from, next) {
    next()//需要先next 不然后面的代码不会执行
    this.getData();
  },
  mounted() {
    this.getData();
  },
  methods: {
    // 页面加载时的数据获取
    getData() {
      this.$axios({
      url: "/airs",
      params: this.$route.query
    }).then(res => {
      console.log(res);
      this.flightsData = res.data;
      // 备份数据
      this.cacheFlightsData = { ...res.data };
      // this.dataList = res.data.flights;
      this.setDataList();
    });
    },
    // 条数改变时 把值给pageSize
    handleSizeChange(val) {
      this.PageSize = val;
      this.setDataList();
    },
    // 当前页改变
    handleCurrentChange(val) {
      this.pageIndex = val;
      console.log(this.pageIndex);

      this.setDataList();
    },
    // 切割数据
    setDataList(arr) {
      // 接受子组件的数据
      if (arr) {
        this.pageIndex = 1;
        this.flightsData.flights = arr;
        this.flightsData.total = arr.length;
      }
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