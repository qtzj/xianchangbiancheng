<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>投票</el-breadcrumb-item>
      <el-breadcrumb-item>投票</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-table
        :data="groupList"
        style="width: 100%"
        :row-key="getRowKeys"
        border
        @selection-change="handleSelectionChange"
      >
        <el-table-column label="小组编号" prop="groupId"></el-table-column>
        <el-table-column label="小组链接" prop="link" width="800px">
          <template slot-scope="scope">
            <el-link :href="scope.row.link" type="primary" target="_blank">
              {{ scope.row.link }}
            </el-link>
          </template>
        </el-table-column>
        <el-table-column label="小组票数" prop="num"></el-table-column>
        <el-table-column
          type="selection"
          width="55"
          :selectable="handleDisable"
        >
        </el-table-column>
      </el-table>
      <el-button type="primary" @click="votes">进行投票</el-button>
      <el-button type="primary" @click="refresh">刷新投票结果</el-button>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    var checkNull = (rule, value, cb) => {
      if (value.trim().length != 0) {
        return cb();
      }

      cb(new Error("当前项不能为空"));
    };
    return {
      unLogin: true,
      groupList: [],
      getRowKeys(row) {
        return row.userId;
      },

      total: 0,
      questionList: [],
      addQuestionForm: {
        question: "",
      },
      hasVoted: true,
      multipleSelection: [],
      user: {},
    };
  },
  async created() {
    let juser = window.sessionStorage.getItem("user");
    if (juser) {
      this.unLogin = false;
    }
    await this.getVoteList();
    this.user = JSON.parse(juser);
    if (this.user.hasVoted == 0) this.hasVoted = false;
  },
  methods: {
    async getVoteList() {
      this.expands = [];
      const { data: res } = await this.$http.get("/vote/getVote");
      if (res.status !== 200) {
        return this.$message.error("获取投票数据失败");
      }
      console.log(res.data);
      this.groupList = res.data.records;
    },

    handleDisable(row, index) {
      // console.log(this.user)
      if (this.hasVoted || row.groupId == this.user.groupId) {
        return false;
      }
      return true;
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    async votes() {
      if (this.multipleSelection.length == 0) {
        return this.$message.error("请至少选择一个小组");
      }
      console.log(this.multipleSelection);
      var voteList = this.multipleSelection.map((i) => i.groupId);
      const { data: res } = await this.$http.post("/vote/vote", {
        voted: voteList,
      });
      if (res.status !== 200) {
        return this.$message.error("投票失败");
      } else {
        this.user.hasVoted = 1;
        this.hasVoted = true;
        await this.getVoteList();
        return this.$message.success("投票成功");
      }
      return;
    },

    refresh() {
      this.getVoteList();
    },
  },
};
</script>

<style lang="less" scoped>
.info-container {
  font-size: 16px;
  .info-detail {
    display: flex;
    margin-bottom: 12px;
    .detailLabel {
      width: 120px;
      margin-right: 37px;
      font-weight: 600;
    }
  }
}
.el-textarea {
  margin-top: 15px;
  margin-bottom: 15px;
}
.el-button {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>