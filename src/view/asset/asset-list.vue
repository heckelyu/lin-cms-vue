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
    <asset-modify v-else @editClose="editClose" :editAssetID="editAssetID"></asset-modify>
  </div>
</template>

<script>
import asset from '@/model/asset'
import LinTable from '@/component/base/table/lin-table'
import AssetModify from './asset-modify'

export default {
  components: {
    LinTable,
    AssetModify,
  },
  data() {
    return {
      tableColumn: [
        { prop: 'asset_code', label: '资产代码' },
        { prop: 'asset_name', label: '资产名称' },
        { prop: 'asset_model', label: '资产型号' },
        { prop: 'asset_unit', label: '资产单位' },
        { prop: 'asset_quantity', label: '资产数量' },
        { prop: 'capital_category_subcode', label: '资产分类' },
        { prop: 'material_category_subcode', label: '实物分类' },
        { prop: 'expense_category_subcode', label: '费用类别' },
        { prop: 'usage_category_subcode', label: '使用状态' },
        { prop: 'customized_category_1_type', label: '自定义分类1' },
        { prop: 'customized_category_1_subcode', label: '自定义类别1' },
        { prop: 'asset_purchase_date', label: '购置时间' },
        { prop: 'asset_owner', label: '资产所有人' },
        { prop: 'asset_legal_entity', label: '产权单位' },
        { prop: 'asset_owner_entity', label: '使用单位' },
        { prop: 'asset_owner_dept', label: '使用部门' },
        { prop: 'asset_location', label: '资产位置' },
        { prop: 'asset_note', label: '资产描述' },
        { prop: 'asset_image_id', label: '资产图片' },
      ],
      tableData: [],
      operate: [],
      showEdit: false,
      editAssetID: 1,
    }
  },

  async created() {
    this.loading = true
    await this.getAssets()
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
    async getAssets() {
      try {
        const assets = await asset.getAssets()
        this.tableData = assets
      } catch (error) {
        if (error.code === 10020) {
          this.tableData = []
        }
      }
    },
    handleEdit(val) {
      console.log('val', val)
      this.showEdit = true
      this.editAssetID = val.row.id
    },
    handleDelete(val) {
      this.$confirm('此操作将永久删除该资产条目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(async () => {
        const res = await asset.delectAsset(val.row.id)
        if (res.code < window.MAX_SUCCESS_CODE) {
          this.getAssets()
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
      this.getAssets()
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
