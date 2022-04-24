<template>
  <el-row class="home" :gutter="20">
    <!-- 用户信息展示区域 -->
    <el-col :span="8" style="margin-top: 15px">
      <el-card shadow="hover">
        <div class="user">
          <img :src="userImg" alt="" />
          <div class="userinfo">
            <p class="name">Admin</p>
            <p class="acess">超级管理员</p>
          </div>
        </div>
        <p class="line"></p>
        <div class="login-info">
          <p>上次登录事件：<span>2022-3-18</span></p>
          <p>上次登录地点：<span>南京</span></p>
        </div>
      </el-card>
      <el-card style="margin-top: 20px">
        <el-table :data="tableData">
          <el-table-column
            v-for="(item, key) in tableLable"
            :key="key"
            :prop="key"
            :label="item"
          >
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <!-- flex布局的销量图 -->
    <el-col :span="16" style="margin-top: 20px">
      <div class="num">
        <el-card
          v-for="item in countData"
          :key="item.name"
          :body-style="{ display: 'flex', padding: 0 }"
        >
          <i
            class="icon"
            :class="`el-icon-${item.icon}`"
            :style="{ background: item.color }"
          ></i>
          <div class="detail">
            <p class="num">¥{{ item.value }}</p>
            <p class="txt">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <!-- 图标区域 -->
      <el-card style="height: 280px; margin-top: 10px">
        <echarts :charData="echartsData.order" style="height:280px"/>
      </el-card>
      <div class="graph">
        <el-card style="height: 260px; width: 48%">
          <!-- <div style="height: 240px" ref="userEcharts"></div> -->
          <echarts :charData="echartsData.user" style="height: 240px" />
        </el-card>
        <el-card style="height: 260px; width: 48%">
          <!-- <div style="height: 240px" ref="videoEcharts"></div> -->
          <echarts :charData="echartsData.video" style="height: 240px" />

        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { getData } from "../../api/data.js";
import Echarts from '../../components/Echarts.vue'
export default {
  name: "Index",
  components:{
    Echarts
  },

  data() {
    return {
      userImg: require("../../assets/user.jpeg"),
      tableData: [
        {
          name: "appo",
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800,
        },
        {
          name: "vivo",
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800,
        },
        {
          name: "苹果",
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800,
        },
        {
          name: "小米",
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800,
        },
        {
          name: "三星",
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800,
        },
        {
          name: "魅族",
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800,
        },
      ],
      tableLable: {
        name: "课程",
        todayBuy: "今日购买",
        monthBuy: "本月购买",
        totalBuy: "总购买",
      },
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 1234,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
      echartsData:{
        order:{
          xData:[],
          series:[]
        },
        user:{
          xData:[],
          series:[]
        },
        video:{
          series:[]
        }
      }
    };
  },

  mounted() {
    getData().then((res) => {
      const { code, data } = res.data;
      if (code === 20000) {
        // 将页面中表格数据进行更新
        this.tableData = data.tableData;
        const order = data.orderData;
        const xData = order.date;
        const keyArray = Object.keys(order.data[0]);
        const series = [];
        keyArray.forEach((key) => {
          series.push({
            name: key,
            data: order.data.map((item) => item[key]),
            type: "line",
          });
        });
        
        this.echartsData.order.xData = xData
        this.echartsData.order.series = series
       
        this.echartsData.user.xData = data.userData.map(item=> item.date),
        this.echartsData.user.series = [
            {
              name: "新增用户",
              data: data.userData.map((item) => item.new),
              type: "bar",
            },
            {
              name: "活跃用户",
              data: data.userData.map((item) => item.active),
              type: "bar",
            },
          ]
      
         this.echartsData.video.series = [
            {
              data:data.videoData,
              type:'pie',

            }
          ]
      }
      console.log(res);
    });
  },

};
</script>

<style lang="less" scoped>
.home {
  width: 100%;
  height: 100%;
}
.line {
  width: 100%;
  height: 1px;
  border-top: 1px solid black;
}
.user {
  height: 100px;
  position: relative;
  img {
    width: 40px;
    height: 40px;
    position: absolute;
    top: 50%;
    margin-top: -20px;
  }
  .userinfo {
    position: absolute;
    left: 70px;
    top: 50%;
    margin-top: -35px;
    font-size: 12px;
  }
}
.login-info {
  font-size: 12px;
}
.num {
  display: flex;
  justify-content: space-between;
  margin-bottom: -10px;
  width: calc(100%-259.33px);

  .el-card {
    height: 60px;
    margin-bottom: 10px;
  }
  display: flex;
  flex-wrap: wrap;
  .icon {
    width: 60px;
    color: aliceblue;
    line-height: 60px;
    text-align: center;
  }
}
.detail {
  width: 170px;
  height: 60px;
  position: relative;
  .num {
    position: absolute;
    top: 0;
    left: 8px;
    font-size: 18px;
  }
  .txt {
    position: absolute;
    font-size: 12px;
    top: 31px;
    left: 8px;
    color: green;
  }
}
.graph {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
</style>