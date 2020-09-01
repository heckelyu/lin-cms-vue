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

            <el-form-item label="资产分类" prop="capital_category_subcode">
              <el-select size="medium" v-model="form.capital_category_subcode" placeholder="请选择资产分类">
                <el-option
                  v-for="item in capital_category_data"
                  :key="item.sub_code"
                  :label="item.sub_name"
                  :value="item.sub_code"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="实物分类" prop="material_category_subcode">
              <el-input
                size="medium"
                v-model="form.material_category_subcode"
                placeholder="请填写实物分类类别"
              ></el-input>
            </el-form-item>
            <el-form-item label="费用类别" prop="expense_category_subcode">
              <el-input size="medium" v-model="form.expense_category_subcode" placeholder="请填写费用类别"></el-input>
            </el-form-item>
            <el-form-item label="使用状态" prop="usage_category_subcode">
              <el-input size="medium" v-model="form.usage_category_subcode" placeholder="请填写使用状态类别"></el-input>
            </el-form-item>
            <el-form-item label="自定义分类1" prop="customized_category_1_type">
              <el-input
                size="medium"
                v-model="form.customized_category_1_type"
                placeholder="请填写自定义分类类型1"
              ></el-input>
            </el-form-item>
            <el-form-item label="自定义类别1" prop="customized_category_1_subcode">
              <el-input
                size="medium"
                v-model="form.customized_category_1_subcode"
                placeholder="请填写自定义类别1"
              ></el-input>
            </el-form-item>
            <el-form-item label="购置时间" prop="asset_purchase_date">
              <el-input size="medium" v-model="form.asset_purchase_date" placeholder="请填写资产购置时间"></el-input>
            </el-form-item>
            <el-form-item label="资产所有人" prop="asset_owner">
              <el-input size="medium" v-model="form.asset_owner" placeholder="请填写资产所有人"></el-input>
            </el-form-item>
            <!-- <el-form-item label="产权单位" prop="asset_legal_entity">
              <el-input size="medium" v-model="form.asset_legal_entity" placeholder="请填写资产产权单位"></el-input>
            </el-form-item>-->
            <el-form-item label="产权单位" prop="asset_legal_entity">
              <el-select size="medium" v-model="form.asset_legal_entity" placeholder="请选择资产产权单位">
                <el-option
                  v-for="item in legalentity_data"
                  :key="item.entity_code"
                  :label="item.entity_name"
                  :value="item.entity_code"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="使用单位" prop="asset_owner_entity">
              <el-input size="medium" v-model="form.asset_owner_entity" placeholder="请填写资产使用单位"></el-input>
            </el-form-item>
            <el-form-item label="使用部门" prop="asset_owner_dept">
              <el-input size="medium" v-model="form.asset_owner_dept" placeholder="请填写资产使用部门"></el-input>
            </el-form-item>
            <el-form-item label="资产位置" prop="asset_location">
              <el-input size="medium" v-model="form.asset_location" placeholder="请填写资产位置"></el-input>
            </el-form-item>
            <el-form-item label="资产描述" prop="asset_note">
              <el-input size="medium" v-model="form.asset_note" placeholder="请填写资产描述"></el-input>
            </el-form-item>
            <el-form-item label="资产图片" prop="asset_image_id">
              <el-input size="medium" v-model="form.asset_image_id" placeholder="请填写资产图片"></el-input>
            </el-form-item>
            <el-form-item label="凭证编号" prop="asset_proofs_code">
              <el-input size="medium" v-model="form.asset_proofs_code" placeholder="请填写资产凭证编号"></el-input>
            </el-form-item>
            <el-form-item label="资产原值" prop="asset_original_value">
              <el-input size="medium" v-model="form.asset_original_value" placeholder="请填写资产原值"></el-input>
            </el-form-item>
            <el-form-item label="资产净值" prop="asset_net_value">
              <el-input size="medium" v-model="form.asset_net_value" placeholder="请填写资产净值"></el-input>
            </el-form-item>
            <el-form-item label="当年折旧" prop="asset_depreciation_this_year">
              <el-input
                size="medium"
                v-model="form.asset_depreciation_this_year"
                placeholder="请填写资产当年折旧"
              ></el-input>
            </el-form-item>
            <el-form-item label="当月折旧" prop="asset_depreciation_this_month">
              <el-input
                size="medium"
                v-model="form.asset_depreciation_this_month"
                placeholder="请填写资产当月折旧"
              ></el-input>
            </el-form-item>
            <el-form-item label="残值率" prop="asset_residual_value">
              <el-input size="medium" v-model="form.asset_residual_value" placeholder="请填写资产残值率"></el-input>
            </el-form-item>
            <el-form-item label="入账日期" prop="asset_account_entry_date">
              <el-input
                size="medium"
                v-model="form.asset_account_entry_date"
                placeholder="请填写资产入账日期"
              ></el-input>
            </el-form-item>
            <el-form-item label="折旧年限" prop="asset_depreciation_years">
              <el-input
                size="medium"
                v-model="form.asset_depreciation_years"
                placeholder="请填写资产折旧年限"
              ></el-input>
            </el-form-item>
            <el-form-item label="已折旧月数" prop="asset_depreciated_months">
              <el-input
                size="medium"
                v-model="form.asset_depreciated_months"
                placeholder="请填写资产已折旧月数"
              ></el-input>
            </el-form-item>
            <el-form-item label="核销状态" prop="asset_write_off_status">
              <el-input size="medium" v-model="form.asset_write_off_status" placeholder="请填写资产核销状态"></el-input>
            </el-form-item>
            <el-form-item label="核销原因" prop="asset_write_off_reason">
              <el-input size="medium" v-model="form.asset_write_off_reason" placeholder="请填写资产核销原因"></el-input>
            </el-form-item>
            <el-form-item label="处置说明" prop="asset_write_off_note">
              <el-input size="medium" v-model="form.asset_write_off_note" placeholder="请填写资产处置说明"></el-input>
            </el-form-item>
            <el-form-item label="成套设备" prop="asset_is_subitem">
              <el-input size="medium" v-model="form.asset_is_subitem" placeholder="请填写资产成套设备代码"></el-input>
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
import asset from '@/model/asset'
import category from '@/model/category'
import legalentity from '@/model/legalentity'

export default {
  data() {
    return {
      form: {
        asset_code: '',
        asset_name: '',
        asset_model: '',
        asset_unit: '',
        asset_quantity: '',
        capital_category_subcode: '',
        material_category_subcode: '',
        expense_category_subcode: '',
        usage_category_subcode: '',
        customized_category_1_type: '',
        customized_category_1_subcode: '',
        asset_purchase_date: '',
        asset_owner: '',
        asset_legal_entity: '',
        asset_owner_entity: '',
        asset_owner_dept: '',
        asset_location: '',
        asset_note: '',
        asset_image_id: '',
        asset_proofs_code: '',
        asset_original_value: '',
        asset_net_value: '',
        asset_depreciation_this_year: '',
        asset_depreciation_this_month: '',
        asset_residual_value: '',
        asset_account_entry_date: '',
        asset_depreciation_years: '',
        asset_depreciated_months: '',
        asset_write_off_status: '',
        asset_write_off_reason: '',
        asset_write_off_note: '',
        asset_is_subitem: '',
      },
      capital_category_data: [],
      legalentity_data: [],
    }
  },

  async created() {
    await this.getLegalentitys()
    this.capital_category_data = await this.getCategoryByType('Capital')
  },
  methods: {
    async getLegalentitys() {
      try {
        const legalentitys = await legalentity.getLegalentitys()
        this.legalentity_data = legalentitys
      } catch (error) {
        if (error.code === 10020) {
          this.legalentity_data = []
        }
      }
    },

    async getCategoryByType(qType) {
      let categorys = []
      try {
        categorys = await category.getCategoryByType(qType)
      } catch (error) {
        if (error.code === 10020) {
          categorys = []
        }
      }
      return categorys
    },

    async submitForm(formName) {
      try {
        const res = await asset.createAsset(this.form)
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

  .el-input {
    width: 300px;
  }

  .submit {
    float: left;
  }
}
</style>
