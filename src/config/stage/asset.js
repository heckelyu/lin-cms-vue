const assetRouter = {
  route: null,
  name: null,
  title: '资产条目管理',
  type: 'folder', // 类型: folder, tab, view
  icon: 'iconfont icon-tushuguanli',
  filePath: 'view/asset/', // 文件路径
  order: null,
  inNav: true,
  children: [
    {
      title: '添加资产条目',
      type: 'view',
      name: 'AssetCreate',
      route: '/asset/add',
      filePath: 'view/asset/asset-create.vue',
      inNav: true,
      icon: 'iconfont icon-tushuguanli',
    },
    {
      title: '资产条目列表',
      type: 'view',
      name: 'AssetList',
      route: '/asset/list',
      filePath: 'view/asset/asset-list.vue',
      inNav: true,
      icon: 'iconfont icon-tushuguanli',
    },
  ],
}

export default assetRouter
