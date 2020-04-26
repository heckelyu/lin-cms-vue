<template>
  <div>
    <!-- 列表页面 -->
    <div class="container" v-if="!showEdit">
      <div class="header"><div class="title">类别列表</div></div>
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
    <category-modify v-else @editClose="editClose" :editCategoryID="editCategoryID"></category-modify>
  </div>
</template>

<script>
import category from '@/model/category'
import LinTable from '@/component/base/table/lin-table'
import CategoryModify from './category-modify'

export default {
  components: {
    LinTable,
    CategoryModify,
  },
  data() {
    return {
      tableColumn: [
        { prop: 'category_type', label: '分类类型' },
        { prop: 'category_name', label: '类型名称' },
        { prop: 'sub_code', label: '分类编码' },
        { prop: 'sub_name', label: '分类名称' },
        { prop: 'sub_value', label: '分类值' },
        { prop: 'sub_flag', label: '类别标记' },
        { prop: 'sub_note', label: '类别简介' },
      ],
      tableData: [],
      operate: [],
      showEdit: false,
      editCategoryID: 1,
    }
  },
  async created() {
    this.loading = true
    await this.getCategorys()
    this.operate = [
      { name: '编辑', func: 'handleEdit', type: 'primary' },
      {
        name: '删除',
        func: 'handleDelete',
        type: 'danger',
        permission: '删除类别',
      },
    ]
    this.loading = false
  },
  methods: {
    async getCategorys() {
      try {
        const categorys = await category.getCategorys()
        this.tableData = categorys
      } catch (error) {
        if (error.code === 10020) {
          this.tableData = []
        }
      }
    },
    handleEdit(val) {
      console.log('val', val)
      this.showEdit = true
      this.editCategoryID = val.row.id
    },
    handleDelete(val) {
      this.$confirm('此操作将永久删除该类别, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(async () => {
        const res = await category.delectCategory(val.row.id)
        if (res.code < window.MAX_SUCCESS_CODE) {
          this.getCategorys()
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
      this.getCategorys()
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
