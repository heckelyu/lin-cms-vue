const checkrecordRouter = {
  route: null,
  name: null,
  title: '资产盘点记录',
  type: 'folder', // 类型: folder, tab, view
  icon: 'iconfont icon-tushuguanli',
  filePath: 'view/checkrecord/', // 文件路径
  order: null,
  inNav: true,
  children: [
    {
      title: '添加记录',
      type: 'view',
      name: 'CheckrecordCreate',
      route: '/checkrecord/add',
      filePath: 'view/checkrecord/checkrecord-create.vue',
      inNav: true,
      icon: 'iconfont icon-tushuguanli',
    },
    {
      title: '记录列表',
      type: 'view',
      name: 'CheckrecordList',
      route: '/checkrecord/list',
      filePath: 'view/checkrecord/checkrecord-list.vue',
      inNav: true,
      icon: 'iconfont icon-tushuguanli',
    },
  ],
}

export default checkrecordRouter
