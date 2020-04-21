const categoryRouter = {
  route: null,
  name: null,
  title: '实物类别管理',
  type: 'folder', // 类型: folder, tab, view
  icon: 'iconfont icon-tushuguanli',
  filePath: 'view/category/', // 文件路径
  order: null,
  inNav: true,
  children: [
    {
      title: '添加类别',
      type: 'view',
      name: 'CategoryCreate',
      route: '/category/add',
      filePath: 'view/category/category-create.vue',
      inNav: true,
      icon: 'iconfont icon-tushuguanli',
    },
    {
      title: '类别列表',
      type: 'view',
      name: 'CategoryList',
      route: '/category/list',
      filePath: 'view/category/category-list.vue',
      inNav: true,
      icon: 'iconfont icon-tushuguanli',
    },
  ],
}

export default categoryRouter
