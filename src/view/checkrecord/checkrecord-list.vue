<template>
  <div>
    <!-- 列表页面 -->
    <div class="container" v-if="!showEdit">
      <div class="header"><div class="title">盘点记录列表</div></div>
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
    <checkrecord-modify v-else @editClose="editClose" :editCheckrecordID="editCheckrecordID"></checkrecord-modify>
  </div>
</template>

<script>
import checkrecord from '@/model/checkrecord'
import LinTable from '@/component/base/table/lin-table'
import CheckrecordModify from './checkrecord-modify'

export default {
  components: {
    LinTable,
    CheckrecordModify,
  },
  data() {
    return {
      tableColumn: [
        { prop: 'asset_code', label: '资产编码' },
        { prop: 'entity_name', label: '单位名称' },
        { prop: 'asset_status', label: '资产状态' },
        { prop: 'check_note', label: '盘点备注' },
        { prop: 'check_image_id', label: '图片' },
        { prop: 'check_date', label: '盘点日期' },
        { prop: 'check_user_id', label: '盘点人员' },
      ],
      tableData: [],
      operate: [],
      showEdit: false,
      editCheckrecordID: 1,
    }
  },

  async created() {
    this.loading = true
    await this.getCheckrecords()
    this.operate = [
      { name: '编辑', func: 'handleEdit', type: 'primary' },
      {
        name: '删除',
        func: 'handleDelete',
        type: 'danger',
        permission: '删除盘点记录',
      },
    ]
    this.loading = false
  },
  methods: {
    async getCheckrecords() {
      try {
        const checkrecords = await checkrecord.getCheckrecords()
        this.tableData = checkrecords
      } catch (error) {
        if (error.code === 10020) {
          this.tableData = []
        }
      }
    },
    handleEdit(val) {
      console.log('val', val)
      this.showEdit = true
      this.editCheckrecordID = val.row.id
    },
    handleDelete(val) {
      this.$confirm('此操作将永久删除该盘点记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(async () => {
        const res = await checkrecord.delectCheckrecord(val.row.id)
        if (res.code < window.MAX_SUCCESS_CODE) {
          this.getCheckrecords()
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
      this.getCheckrecords()
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
