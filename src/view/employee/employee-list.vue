<template>
  <div>
    <!-- 列表页面 -->
    <div class="container" v-if="!showEdit">
      <div class="header"><div class="title">员工列表</div></div>
      <!-- 表格 -->
      <lin-table
        :tableColumn="tableColumn"
        :tableData="tableData"
        :operate="operate"
        @handleEdit="handleEdit"
        @handleDelete="handleDelete"
        @row-click="rowClick"
        v-loading="loading"
      ></lin-table>
    </div>

    <!-- 编辑页面 -->
    <employee-modify v-else @editClose="editClose" :editEmployeeID="editEmployeeID"></employee-modify>
  </div>
</template>

<script>
import employee from '@/model/employee'
import LinTable from '@/component/base/table/lin-table'
import EmployeeModify from './employee-modify'

export default {
  components: {
    LinTable,
    EmployeeModify,
  },
  data() {
    return {
      tableColumn: [
        { prop: 'employee_id', label: '员工工号' },
        { prop: 'employee_name', label: '员工姓名' },
        { prop: 'entity_name', label: '归属单位' },
        { prop: 'employee_position', label: '职位' },
        { prop: 'gender', label: '性别' },
        { prop: 'age', label: '年龄' },
        { prop: 'employment_status', label: '在岗状态' },
        { prop: 'attendance_status', label: '出勤状态' },
        { prop: 'education_status', label: '教育水平' },
      ],
      tableData: [],
      operate: [],
      showEdit: false,
      editEmployeeID: 1,
    }
  },
  async created() {
    this.loading = true
    await this.getEmployees()
    this.operate = [
      { name: '编辑', func: 'handleEdit', type: 'primary' },
      {
        name: '删除',
        func: 'handleDelete',
        type: 'danger',
        permission: '删除员工信息',
      },
    ]
    this.loading = false
  },
  methods: {
    async getEmployees() {
      try {
        const employees = await employee.getEmployees()
        this.tableData = employees
      } catch (error) {
        if (error.code === 10020) {
          this.tableData = []
        }
      }
    },
    handleEdit(val) {
      console.log('val', val)
      this.showEdit = true
      this.editEmployeeID = val.row.id
    },
    handleDelete(val) {
      this.$confirm('此操作将永久删除该员工信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(async () => {
        const res = await employee.delectEmployee(val.row.id)
        if (res.code < window.MAX_SUCCESS_CODE) {
          this.getEmployees()
          this.$message({
            type: 'success',
            message: `${res.message}`,
          })
        }
      })
    },
    rowClick() {},
    editClose() {
      this.showEdit = false
      this.getEmployees()
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  padding: 0 30px;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title {
      height: 59px;
      line-height: 59px;
      color: $parent-title-color;
      font-size: 16px;
      font-weight: 500;
    }
  }

  .pagination {
    display: flex;
    justify-content: flex-end;
    margin: 20px;
  }
}
</style>
