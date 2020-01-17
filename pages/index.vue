<template>
  <div class="container">
    <el-carousel trigger="click" height="700px">
      <el-carousel-item v-for="(item,index) in banners" :key="index">
        <div
          class="banner"
          :style="`background:url(${$axios.defaults.baseURL+item.url}) center center no-repeat`"
        >
          <!-- <img :src="item" alt=""> -->
        </div>
      </el-carousel-item>
    </el-carousel>
    <div class="banner-content">
      <div class="search-bar">
        <!-- tab栏 -->
        <el-row type="flex" class="search-tab">
          <span v-for="(item, index) in tabs" :key="index" @click="handleClick(index)" :class="{active:index === current}">
            <i>{{item.text}}</i>
          </span>
        </el-row>

        <!-- 输入框 -->
        <el-row type="flex" align="middle" class="search-input">
          <input
          :placeholder="tabs[current].placeholder"
             />
          <i class="el-icon-search" ></i>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      banners: [],
      tabs: [
        {
          text: '攻略',
          placeholder:'请输入城市'
        },
        {
          text: '酒店',
          placeholder:'请输入城市 搜索酒店'
        },
        {
          text: '机票',
          placeholder:''
        },
      ],
      current:0,
    };
  },
  // mounted start
  mounted() {
    this.$axios({
      url: "/scenics/banners"
    }).then(res => {
      const { data } = res.data;
      // console.log(data);
      this.banners = data;
    });
  },
  // mounted end
  methods: {
    handleClick(index) {
      this.current = index;
      // 如果点击 的是机票 则跳转页面
      if(index == 2) {
        this.$router.push('/air')
      }
    }
  }
};
</script>

<style lang="less" scoped>
.banner {
  height: 700px;
}
.container{
    min-width:1000px;
    margin:0 auto;
    position:relative;

    /deep/ .el-carousel__container{
        height:700px;
    }

    .banner-image{
        width:100%;
        height:100%;
    }

    .banner-content{
        z-index:9;
        width:1000px;
        position:absolute;
        left:50%;
        top:45%;
        margin-left: -500px;
        border-top:1px transparent solid;

        .search-bar{
            width:552px;
            margin:0 auto;
        }

        .search-tab{
            .active{
                i{
                color:#333;
                }
                &::after{
                background: #eee;
                }
            }

            span{
                width:82px;
                height:36px;
                display:block;
                position: relative;
                margin-right:8px;
                cursor: pointer;

                i{
                position:absolute;
                z-index:2;
                display: block;
                width:100%;
                height:100%;
                line-height:30px;
                text-align:center;
                color:#fff;
                }

                &:after{
                position: absolute;
                left:0;
                top:0;
                display:block;
                content: "";
                width:100%;
                height:100%;
                border: 1px rgba(255,255,255,.2) solid;
                border-bottom: none;
                transform: scale(1.1,1.3) perspective(.7em) rotateX(2.2deg);
                transform-origin: bottom left;
                background: rgba(0,0,0,.5);
                border-radius:1px 2px 0 0;
                box-sizing:border-box;
                }
            }
        }

        .search-input{
            width:550px;
            height:46px;
            background:#fff;
            border-radius: 0 4px 4px 4px;
            border: 1px rgba(255,255,255,.2) solid;
            border-top:none;
            box-sizing: unset;

            input{
                flex:1;
                height:20px;
                padding: 13px 15px;
                outline: none;
                border:0;
                font-size:16px;
            }

            .el-icon-search{
                cursor :pointer;
                font-size:22px;
                padding:0 10px;
                font-weight:bold;
            }
        }
    }
}
</style>