const employeeRouter = {
  route: null,
  name: null,
  title: '员工管理',
  type: 'folder', // 类型: folder, tab, view
  icon: 'iconfont icon-tushuguanli',
  filePath: 'view/employee/', // 文件路径
  order: null,
  inNav: true,
  children: [
    {
      title: '添加员工',
      type: 'view',
      name: 'EmployeeCreate',
      route: '/employee/add',
      filePath: 'view/employee/employee-create.vue',
      inNav: true,
      icon: 'iconfont icon-tushuguanli',
    },
    {
      title: '员工列表',
      type: 'view',
      name: 'EmployeeList',
      route: '/employee/list',
      filePath: 'view/employee/employee-list.vue',
      inNav: true,
      icon: 'iconfont icon-tushuguanli',
    },
  ],
}

export default employeeRouter
