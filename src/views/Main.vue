<template>
  <div class="home">
    <el-container >
      <el-aside width="auto">
        <CommonAside />
      </el-aside>
      <el-container>
        <el-header class="header">
          <CommonHeader />
        </el-header>
         <CommonTag />
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import CommonAside from "../components/CommonAside.vue"
import CommonHeader from "../components/CommonHeader.vue"
import CommonTag from "../components/CommonTag.vue"
export default {
  name: "Main",
  components: {
    CommonAside,
    CommonHeader,
    CommonTag
  },

};
</script>

<style lang="less" scoped>
.home{
  height: 100%;
  .header{
    background-color: dimgrey;
  }
}

</style>
