<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>投票管理</el-breadcrumb-item>
      <el-breadcrumb-item>查看投票</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-button
        type="danger"
        @click="resetResult"
        size="small"
        style="margin-bottom: 5px"
        >重置投票结果</el-button
      >

      <el-table :data="voteList" style="width: 100%" border>
        <el-table-column label="学号" prop="userId"></el-table-column>
        <el-table-column label="姓名" prop="name"></el-table-column>
        <el-table-column label="所在组" prop="groupId"></el-table-column>
        <el-table-column label="投票结果" prop="voteList">
          <template slot-scope="scope">
            <el-tag v-for="item in scope.row.voteList" :key="item">{{
              item
            }}</el-tag>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageInfo.pageNum"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pageInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      voteList: [],
      pageInfo: {
        pageNum: 1,
        pageSize: 10,
      },
      total: 0,
    };
  },
  created() {
    let juser = window.sessionStorage.getItem("user");
    if(!juser){
        this.$message.error("未登录");
        this.$router.push("/login");
    }
    let user = JSON.parse(juser);
    if(user.role.length<2){
        this.$message.error("权限不足");
        this.$router.push("/vote");
        return;
    }
    this.getVoteList();
  },
  methods: {
    async getVoteList() {
      const { data: res } = await this.$http.get("/vote/getVoteList", {
        params: this.pageInfo,
      });
      if (res.status !== 200) {
        return this.$message.error("获取投票列表失败");
      }
      this.voteList = res.data.records;
      this.total = res.data.total;
    },
    // 监听 pagesize 改变
    handleSizeChange(newSize) {
      this.pageInfo.pageSize = newSize;
      this.getVoteList();
    },
    // 监听 pagenum 改变
    handleCurrentChange(newPage) {
      this.pageInfo.pageNum = newPage;
      this.getVoteList();
    },
    async resetResult() {
      const confirmResult = await this.$confirm(
        "是否要重置投票结果，这会失去目前的所有投票记录",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (confirmResult !== "confirm") {
        return;
      }
      const { data: res } = await this.$http.get("/vote/reset");
      if (res.status !== 200) {
        return this.$message.error("重置失败");
      } else {
        this.getVoteList();
        return this.$message.success("重置成功");
      }
    },
  },
};
</script>

<style lang="less" scoped>
</style>