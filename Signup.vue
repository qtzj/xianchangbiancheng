<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户</el-breadcrumb-item>
      <el-breadcrumb-item>注册</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <h1 class="pageH">vote注册</h1>
      <el-form
        :model="signupForm"
        :rules="dataRule"
        ref="signupFormRef"
        @keyup.enter.native="signupFormSubmit()"
        status-icon
      >
        <el-form-item prop="username" label="学号">
          <el-input
            v-model="signupForm.username"
            placeholder="请输入学号"
          ></el-input>
        </el-form-item>
        <el-form-item prop="name" label="真实姓名">
          <el-input
            v-model="signupForm.name"
            placeholder="请输入真实姓名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input
            v-model="signupForm.password"
            type="password"
            placeholder="请输入密码(密码在6-16位之间)"
          ></el-input>
        </el-form-item>
        <el-form-item prop="checkPwd" label="再次输入密码">
          <el-input
            v-model="signupForm.checkPwd"
            type="password"
            placeholder="请再次输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="groupId" label="请选择小组">
          <el-select v-model="signupForm.groupId" placeholder="请选择小组">
            <el-option label="1" value="1"></el-option>
            <el-option label="2" value="2"></el-option>
            <el-option label="3" value="3"></el-option>
            <el-option label="4" value="4"></el-option>
            <el-option label="5" value="5"></el-option>
            <el-option label="6" value="6"></el-option>
            <el-option label="7" value="7"></el-option>
            <el-option label="8" value="8"></el-option>
            <el-option label="9" value="9"></el-option>
            <el-option label="10" value="10"></el-option>
            <el-option label="11" value="11"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            class="login-btn-submit"
            type="primary"
            @click="signupFormSubmit()"
            >注册</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    var checkPwd = (rule, value, cb) => {
      if (value !== this.signupForm.password) {
        return cb(new Error("两次输入密码不一致"));
      }
      cb();
    };

    return {
      signupForm: {
        username: "",
        name: "",
        password: "",
        checkPwd: "",
        groupId: "",
      },
      dataRule: {
        username: [
          { required: true, message: "学号不能为空", trigger: "blur" },
          { min: 6, message: "学号不正确", trigger: "blur" },

        ],
        name: [
          { required: true, message: "真实姓名不能为空", trigger: "blur" },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 16, message: "密码在6-16位之间", trigger: "blur" },
        ],
        checkPwd: [
          { required: true, message: "重复密码不能为空", trigger: "blur" },
          {
            validator: checkPwd,
            message: "两次输入密码不一致",
            trigger: "blur",
          },
        ],
        groupId: [
          { required: true, message: "组别不能为空", trigger: "blur" }
        ]
      },
    };
  },
  created() {},
  methods: {
    // 获取验证码

    signupFormSubmit() {
      this.$refs.signupFormRef.validate(async (valid) => {
        if (!valid) return;
        const { data: res } = await this.$http.post("/user/register", {
          stuId: this.signupForm.username,
          name: this.signupForm.name,
          password: this.signupForm.password,
          group: Number(this.signupForm.groupId)
        });
        if (res.status !== 200) {
          return this.$message.error("注册失败");
        }
        this.$router.push("/login");
        return this.$message.success("注册成功");
      });
    },
  },
};
</script>

<style lang="less" scoped>
.pageH {
  text-align: center;
  font-size: 30px;
}
</style>