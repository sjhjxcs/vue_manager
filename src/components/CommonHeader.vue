<template>
  <header>
    <div class="l-content">
      <el-button
        plain
        icon="el-icon-menu"
        size="mini"
        @click="handMenu"
      ></el-button>
      <!-- <h3 style="color: #fff">首页</h3> -->
      <!-- 面包屑导航区域 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="item in tags" :key="item.path" :to="{ path:item.path }">{{item.label}}</el-breadcrumb-item>
   
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown trigger="click" size="mini">
        <span>
          <img class="user" :src="userImg" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item @click.native="logOut">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: "CommonHeader",
  data() {
    return {
      userImg: require("../assets/user.jpeg"),
    };
  },
  methods: {
    handMenu() {
      this.$store.commit("collapseMenu");
    },
    logOut(){
      this.$store.commit('clearToken')
      this.$store.commit('clearMenu')
      this.$router.push("/login")

    }
  },
  computed:{
    ...mapState({
      tags:state=>state.tab.tabList
    })
  }
};
</script>

<style lang="less" scoped>
.header {
  position: relative;
  .l-content {
    height: 60px;
    display: flex;
    align-items: center;
    .el-button {
      margin-right: 20px;
    }
  }
  .r-content {
    position: absolute;
    top: 25px;
    right: 10px;
    .el-dropdown {
      .user {
        width: 30px;
        height: 30px;
        border-radius: 50%;
      }
    }
  }
}
</style>