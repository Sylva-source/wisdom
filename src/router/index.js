import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/detail',
    name: 'detail',
    component: () => import('@/views/detail/index'),
  },
  {
    path: '/add',
    name: 'add',
    component: () => import('@/views/add/index'),
  },
  {
    path: '/edit',
    name: 'edit',
    component: () => import('@/views/edit/index'),
  },
  {
    path: '/',
    component: Layout,
    redirect: '/workbench',
    children: [{
      path: 'workbench',
      name: 'workbench',
      component: () => import('@/views/workbench/index'),
      meta: { title: '工作台', icon: 'el-icon-data-board' }
    }]
  },
  {
    path: '/system/warnList/add',
    name: 'add',
    component: () => import('@/views/system/warnList/add/index'),
  },

  {
    path: '/park',
    component: Layout,
    redirect: '/park/building',
    name: 'park',
    permission: "park",
    meta: { title: '园区管理', icon: 'el-icon-office-building' },
    children: [
      {
        path: 'building',
        name: 'building',
        permission: "park:building",
        component: () => import('@/views/park/building/index'),
        meta: { title: '楼宇管理'}
      },
      {
        path: 'enterprise',
        name: 'enterprise',
        permission: "park:enterprise",
        component: () => import('@/views/park/enterprise/index'),
        meta: { title: '企业管理'},
      }
    ]
  },
  {
    path: '/car',
    component: Layout,
    redirect: '/car/area',
    name: 'car',
    permission: "parking",
    meta: { title: '行车管理', icon: 'el-icon-guide' },
    children: [
      {
        path: 'area',
        name: 'area',
        permission: "parking:area",
        component: () => import('@/views/car/area/index'),
        meta: { title: '区域管理'}
      },
      {
        path: 'monthCard',
        name: 'monthCard',
        permission: "parking:card",
        component: () => import('@/views/car/monthCard/index'),
        meta: { title: '月卡管理'}
      },
      {
        path: 'pay',
        name: 'pay',
        permission: "parking:payment",
        component: () => import('@/views/car/pay/index'),
        meta: { title: '停车缴费管理'}
      },
      {
        path: 'billing',
        name: 'billing',
        permission: "parking:rule",
        component: () => import('@/views/car/billing/index'),
        meta: { title: '计费规则管理'}
      }
    ]
  },
  {
    path: '/propety',
    component: Layout,
    redirect: '/propety/cost',
    name: 'propety',
    meta: { icon: 'el-icon-s-help' },
    children: [
      {
        path: 'cost',
        name: 'cost',
        component: () => import('@/views/propety/cost/index'),
        meta: { title: '物业费管理'}
      }
    ]
  },
  {
    path: '/rod',
    component: Layout,
    redirect: '/rod/manage',
    name: 'rod',
    permission: "pole",
    meta: {title: '一体杆管理', icon:'el-icon-refrigerator' },
    children: [
      {
        path: 'manage',
        name: 'manage',
        permission: "pole:info",
        component: () => import('@/views/rod/manage/index'),
        meta: { title: '一体杆管理'}
      },
      {
        path: 'warnList',
        name: 'warnList',
        permission: "pole:warning",
        component: () => import('@/views/rod/warnList/index'),
        meta: { title: '告警管理'}
      }
    ]
  },
  {
    path: '/system',
    component: Layout,
    redirect: '/system/employee',
    name: 'system',
    permission: "sys",
    meta: {title: '系统管理', icon: 'el-icon-setting' },
    children: [
      {
        path: 'employee',
        name: 'employee',
        permission: "sys:user",
        component: () => import('@/views/system/employee/index'),
        meta: { title: '员工管理'}
      },
      {
        path: 'warnList',
        name: 'warnList',
        permission: "sys:role",
        component: () => import('@/views/system/warnList/index'),
        meta: { title: '角色管理'}
      }
    ]
  },



  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
