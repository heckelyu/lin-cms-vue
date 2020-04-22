<template>
  <div>
    <!-- 列表页面 -->
    <div class="container" v-if="!showEdit">
      <div class="header"><div class="title">资产条目基本信息列表</div></div>
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
    <assetbasic-modify v-else @editClose="editClose" :editAssetbasicID="editAssetbasicID"></assetbasic-modify>
  </div>
</template>

<script>
import assetbasic from '@/model/assetbasic'
import LinTable from '@/component/base/table/lin-table'
import AssetbasicModify from './assetbasic-modify'

export default {
  components: {
    LinTable,
    AssetbasicModify,
  },
  data() {
    return {
      tableColumn: [
        { prop: 'asset_code', label: '资产代码' },
        { prop: 'asset_name', label: '资产名称' },
        { prop: 'asset_model', label: '资产型号' },
        { prop: 'asset_unit', label: '资产单位' },
        { prop: 'asset_quantity', label: '资产数量' },
        { prop: 'asset_category', label: '资产类别' },
        { prop: 'asset_status', label: '资产状态' },
        { prop: 'asset_owner', label: '资产所有人' },
        { prop: 'asset_entity', label: '资产所有单位' },
      ],
      tableData: [],
      operate: [],
      showEdit: false,
      editAssetbasicID: 1,
    }
  },
  async created() {
    this.loading = true
    await this.getAssetbasics()
    this.operate = [
      { name: '编辑', func: 'handleEdit', type: 'primary' },
      {
        name: '删除',
        func: 'handleDelete',
        type: 'danger',
        permission: '删除资产条目',
      },
    ]
    this.loading = false
  },
  methods: {
    async getAssetbasics() {
      try {
        const assetbasics = await assetbasic.getAssetbasics()
        this.tableData = assetbasics
      } catch (error) {
        if (error.code === 10020) {
          this.tableData = []
        }
      }
    },
    handleEdit(val) {
      console.log('val', val)
      this.showEdit = true
      this.editAssetbasicID = val.row.id
    },
    handleDelete(val) {
      this.$confirm('此操作将永久删除该资产条目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(async () => {
        const res = await assetbasic.delectAssetbasic(val.row.id)
        if (res.code < window.MAX_SUCCESS_CODE) {
          this.getAssetbasics()
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
      this.getAssetbasics()
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
