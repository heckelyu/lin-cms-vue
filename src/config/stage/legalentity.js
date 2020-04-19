const legalentityRouter = {
  route: null,
  name: null,
  title: '法人单位管理',
  type: 'folder', // 类型: folder, tab, view
  icon: 'iconfont icon-tushuguanli',
  filePath: 'view/legalentity/', // 文件路径
  order: null,
  inNav: true,
  children: [
    {
      title: '添加单位',
      type: 'view',
      name: 'LegalentityCreate',
      route: '/legalentity/add',
      filePath: 'view/legalentity/legalentity-create.vue',
      inNav: true,
      icon: 'iconfont icon-tushuguanli',
    },
    {
      title: '单位列表',
      type: 'view',
      name: 'LegalentityList',
      route: '/legalentity/list',
      filePath: 'view/legalentity/legalentity-list.vue',
      inNav: true,
      icon: 'iconfont icon-tushuguanli',
    },
  ],
}

export default legalentityRouter
