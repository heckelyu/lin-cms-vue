<template>
  <div class="container">
    <div class="title">
      <span>修改实物类别</span>
      <span class="back" @click="back"> <i class="iconfont icon-fanhui"></i> 返回 </span>
    </div>
    <el-divider></el-divider>
    <div class="wrap">
      <el-row>
        <el-col :lg="16" :md="20" :sm="24" :xs="24">
          <el-form :model="form" status-icon ref="form" label-width="100px" v-loading="loading" @submit.native.prevent>
            <el-form-item label="类别代码" prop="code">
              <el-input size="medium" v-model="form.entity_code" placeholder="请填写类别代码"></el-input>
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
  props: {
    editCategoryID: {
      type: Number,
    },
  },
  data() {
    return {
      loading: false,
      form: {
        entity_code: '',
        entity_name: '',
      },
    }
  },
  async mounted() {
    this.loading = true
    this.form = await category.getCategory(this.editCategoryID)
    this.loading = false
  },
  methods: {
    async submitForm() {
      const res = await category.editCategory(this.editCategoryID, this.form)
      if (res.code < window.MAX_SUCCESS_CODE) {
        this.$message.success(`${res.message}`)
        this.$emit('editClose')
      }
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    back() {
      this.$emit('editClose')
    },
  },
}
</script>

<style lang="scss" scoped>
.el-divider--horizontal {
  margin: 0;
}

.container {
  .title {
    height: 59px;
    line-height: 59px;
    color: $parent-title-color;
    font-size: 16px;
    font-weight: 500;
    text-indent: 40px;

    .back {
      float: right;
      margin-right: 40px;
      cursor: pointer;
    }
  }

  .wrap {
    padding: 20px;
  }

  .submit {
    float: left;
  }
}
</style>
