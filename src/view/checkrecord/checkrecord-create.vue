<template>
  <div class="container">
    <div class="title">添加记录</div>
    <div class="wrap">
      <el-row>
        <el-col :lg="16" :md="20" :sm="24" :xs="24">
          <el-form :model="form" status-icon ref="form" label-width="100px" @submit.native.prevent>
            <el-form-item label="资产编码" prop="asset_code">
              <el-input size="medium" v-model="form.asset_code" placeholder="请填写资产编码"></el-input>
            </el-form-item>
            <el-form-item label="产权单位" prop="entity_name">
              <el-input size="medium" v-model="form.entity_name" placeholder="请填写产权单位"></el-input>
            </el-form-item>
            <el-form-item label="资产状态" prop="asset_status">
              <el-input size="medium" v-model="form.asset_status" placeholder="请填写资产状态"></el-input>
            </el-form-item>
            <el-form-item label="盘点备注" prop="check_note">
              <el-input size="medium" v-model="form.check_note" placeholder="请填写盘点备注"></el-input>
            </el-form-item>
            <el-form-item label="图片" prop="check_image_id">
              <el-input size="medium" v-model="form.check_image_id" placeholder="请添加图片"></el-input>
            </el-form-item>
            <el-form-item label="盘点人员" prop="check_user_id">
              <el-input size="medium" v-model="form.check_user_id" placeholder="请填写盘点人员"></el-input>
            </el-form-item>

            <!-- 需要添加表格的其他选项 -->

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
import checkrecord from '@/model/checkrecord'

export default {
  data() {
    return {
      form: {
        asset_code: '',
        entity_name: '',
        asset_status: '',
        check_note: '',
        entity_code: '',
        check_image_id: '',
        check_date: '',
        check_user_id: '',
      },
    }
  },
  methods: {
    async submitForm(formName) {
      try {
        const res = await checkrecord.createCheckrecord(this.form)
        if (res.code < window.MAX_SUCCESS_CODE) {
          this.$message.success(`${res.message}`)
          this.resetForm(formName)
        }
      } catch (error) {
        this.$message.error('盘点条目添加失败，请检测填写信息')
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
