<template>
  <div class="container">
    <div class="title">新建类别</div>
    <div class="wrap">
      <el-row>
        <el-col :lg="16" :md="20" :sm="24" :xs="24">
          <el-form :model="form" status-icon ref="form" label-width="100px" @submit.native.prevent>
            <el-form-item label="类型编码" prop="category_type">
              <el-input size="medium" v-model="form.category_type" placeholder="请填写分类类型编码"></el-input>
            </el-form-item>
            <el-form-item label="类型名称" prop="category_name">
              <el-input size="medium" v-model="form.category_name" placeholder="请填写分类类型名称"></el-input>
            </el-form-item>
            <el-form-item label="分类编码" prop="sub_code">
              <el-input size="medium" v-model="form.sub_code" placeholder="请填写分类编码"></el-input>
            </el-form-item>
            <el-form-item label="分类名称" prop="sub_name">
              <el-input size="medium" v-model="form.sub_name" placeholder="请填写分类名称"></el-input>
            </el-form-item>
            <el-form-item label="分类值" prop="sub_value">
              <el-input size="medium" v-model="form.sub_value" placeholder="请填写分类值"></el-input>
            </el-form-item>
            <el-form-item label="分类标记" prop="sub_flag">
              <el-input size="medium" v-model="form.sub_flag" placeholder="请填写分类标记"></el-input>
            </el-form-item>
            <el-form-item label="类别简介" prop="sub_note">
              <el-input size="medium" v-model="form.sub_note" placeholder="请填写类别简介"></el-input>
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
        category_type: '',
        category_name: '',
        sub_code: '',
        sub_name: '',
        sub_value: '',
        sub_flag: '',
        sub_note: '',
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
        this.$message.error('类别添加失败，请检测填写信息')
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
