const assetbasicRouter = {
  route: null,
  name: null,
  title: '资产条目管理',
  type: 'folder', // 类型: folder, tab, view
  icon: 'iconfont icon-tushuguanli',
  filePath: 'view/assetbasic/', // 文件路径
  order: null,
  inNav: true,
  children: [
    {
      title: '添加资产条目',
      type: 'view',
      name: 'AssetbasicCreate',
      route: '/assetbasic/add',
      filePath: 'view/assetbasic/assetbasic-create.vue',
      inNav: true,
      icon: 'iconfont icon-tushuguanli',
    },
    {
      title: '资产条目列表',
      type: 'view',
      name: 'AssetbasicList',
      route: '/assetbasic/list',
      filePath: 'view/assetbasic/assetbasic-list.vue',
      inNav: true,
      icon: 'iconfont icon-tushuguanli',
    },
  ],
}

export default assetbasicRouter
