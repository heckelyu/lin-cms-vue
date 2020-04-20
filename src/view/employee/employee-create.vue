<template>
  <div class="container">
    <div class="title">新增员工</div>
    <div class="wrap">
      <el-row>
        <el-col :lg="16" :md="20" :sm="24" :xs="24">
          <el-form :model="form" status-icon ref="form" label-width="100px" @submit.native.prevent>
            <el-form-item label="员工工号" prop="employee_id">
              <el-input size="medium" v-model="form.employee_id" placeholder="请填写员工工号"></el-input>
            </el-form-item>
            <el-form-item label="员工姓名" prop="employee_name">
              <el-input size="medium" v-model="form.employee_name" placeholder="请填写员工姓名"></el-input>
            </el-form-item>
            <el-form-item label="归属单位" prop="entity_name">
              <el-input size="medium" v-model="form.entity_name" placeholder="请填写员工归属单位"></el-input>
            </el-form-item>
            <el-form-item label="职位" prop="employee_position">
              <el-input size="medium" v-model="form.employee_position" placeholder="请填写员工归属单位"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="gender">
              <el-input size="medium" v-model="form.gender" placeholder="请填写员工性别"></el-input>
            </el-form-item>
            <el-form-item label="年龄" prop="age">
              <el-input size="medium" v-model="form.age" placeholder="请填写员工年龄"></el-input>
            </el-form-item>
            <el-form-item label="在岗状态" prop="employment_status">
              <el-input size="medium" v-model="form.employment_status" placeholder="请填写员工在岗状态"></el-input>
            </el-form-item>
            <el-form-item label="出勤状态" prop="attendance_status">
              <el-input size="medium" v-model="form.attendance_status" placeholder="请填写员工出勤状态"></el-input>
            </el-form-item>
            <el-form-item label="教育水平" prop="education_status">
              <el-input size="medium" v-model="form.education_status" placeholder="请填写员工教育水平"></el-input>
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
import employee from '@/model/employee'

export default {
  data() {
    return {
      form: {
        employee_id: '',
        employee_name: '',
        entity_name: '',
        employee_position: '',
        gender: '',
      },
    }
  },
  methods: {
    async submitForm(formName) {
      try {
        const res = await employee.createEmployee(this.form)
        if (res.code < window.MAX_SUCCESS_CODE) {
          this.$message.success(`${res.message}`)
          this.resetForm(formName)
        }
      } catch (error) {
        this.$message.error('员工添加失败，请检测填写信息')
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
