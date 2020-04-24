<template>
  <div class="container">
    <div class="title">新建实物类别</div>
    <div class="wrap">
      <el-row>
        <el-col :lg="16" :md="20" :sm="24" :xs="24">
          <el-form :model="form" status-icon ref="form" label-width="100px" @submit.native.prevent>
            <el-form-item label="类别代码" prop="code">
              <el-input size="medium" v-model="form.code" placeholder="请填写类别代码"></el-input>
            </el-form-item>
            <el-form-item label="类别名称" prop="name">
              <el-input size="medium" v-model="form.name" placeholder="请填写类别名称"></el-input>
            </el-form-item>
            <el-form-item label="类别价值" prop="value">
              <el-input size="medium" v-model="form.value" placeholder="请填写类别价值"></el-input>
            </el-form-item>
            <el-form-item label="类别标记" prop="flag">
              <el-input size="medium" v-model="form.flag" placeholder="请填写类别标记"></el-input>
            </el-form-item>
            <el-form-item label="类别简介" prop="note">
              <el-input size="medium" v-model="form.note" placeholder="请填写类别简介"></el-input>
            </el-form-item>

            <el-form-item class="submit">
              <el-button type="primary" @click="submitForm('form')">保 存</el-button>
              <el-button @click="resetForm('form')">重 置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import category from '@/model/category'

export default {
  data() {
    return {
      form: {
        code: '',
        name: '',
        value: '',
        flag: '',
        note: '',
      },
    }
  },
  methods: {
    async submitForm(formName) {
      try {
        const res = await category.createCategory(this.form)
        if (res.code < window.MAX_SUCCESS_CODE) {
          this.$message.success(`${res.message}`)
          this.resetForm(formName)
        }
      } catch (error) {
        this.$message.error('实物类别添加失败，请检测填写信息')
        console.log(error)
      }
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  .title {
    height: 59px;
    line-height: 59px;
    color: $parent-title-color;
    font-size: 16px;
    font-weight: 500;
    text-indent: 40px;
    border-bottom: 1px solid #dae1ec;
  }

  .wrap {
    padding: 20px;
  }

  .submit {
    float: left;
  }
}
</style>
