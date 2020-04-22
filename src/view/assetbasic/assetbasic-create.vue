<template>
  <div class="container">
    <div class="title">添加资产条目</div>
    <div class="wrap">
      <el-row>
        <el-col :lg="16" :md="20" :sm="24" :xs="24">
          <el-form :model="form" status-icon ref="form" label-width="100px" @submit.native.prevent>
            <el-form-item label="资产代码" prop="asset_code">
              <el-input size="medium" v-model="form.asset_code" placeholder="请填写资产代码"></el-input>
            </el-form-item>
            <el-form-item label="资产名称" prop="asset_name">
              <el-input size="medium" v-model="form.asset_name" placeholder="请填写资产名称"></el-input>
            </el-form-item>
            <el-form-item label="资产型号" prop="asset_model">
              <el-input size="medium" v-model="form.asset_model" placeholder="请填写资产型号"></el-input>
            </el-form-item>
            <el-form-item label="计量单位" prop="asset_unit">
              <el-input size="medium" v-model="form.asset_unit" placeholder="请填写计量单位"></el-input>
            </el-form-item>
            <el-form-item label="资产数量" prop="asset_quantity">
              <el-input size="medium" v-model="form.asset_quantity" placeholder="请填写资产数量"></el-input>
            </el-form-item>
            <el-form-item label="资产类别" prop="asset_category">
              <el-input size="medium" v-model="form.asset_category" placeholder="请填写资产类别"></el-input>
            </el-form-item>
            <el-form-item label="资产状态" prop="asset_status">
              <el-input size="medium" v-model="form.asset_status" placeholder="请填写资产状态"></el-input>
            </el-form-item>
            <el-form-item label="资产所有人" prop="asset_owner">
              <el-input size="medium" v-model="form.asset_owner" placeholder="请填写资产所有人"></el-input>
            </el-form-item>
            <el-form-item label="所有单位" prop="asset_entity">
              <el-input size="medium" v-model="form.asset_entity" placeholder="请填写资产所有单位"></el-input>
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
import assetbasic from '@/model/assetbasic'

export default {
  data() {
    return {
      form: {
        entity_code: '',
        entity_name: '',
      },
    }
  },
  methods: {
    async submitForm(formName) {
      try {
        const res = await assetbasic.createAssetbasic(this.form)
        if (res.code < window.MAX_SUCCESS_CODE) {
          this.$message.success(`${res.message}`)
          this.resetForm(formName)
        }
      } catch (error) {
        this.$message.error('资产条目添加失败，请检测填写信息')
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
