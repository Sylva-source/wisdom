import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist
// 过滤一级路由
const getfirst=(permss)=>{
  // console.log("permss",permss);
  const newArr=permss.map(item=>{
    return item.split(':')[0]
  })
  return[...new Set(newArr)]
  console.log(newArr1);
}
// 过滤二级路由
const getseclist=(permss)=>{
const newArr=permss.map(item=>{
  const arr= item.split(':')
  return `${arr[0]}:${arr[1]}`;
})
return[...new Set(newArr)]
console.log(newArr2);
}


router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasGetUserInfo = store.getters.name
      if (hasGetUserInfo) {
        next()
      } else {
        try {
          // get user info
       const permissions  =  await store.dispatch('user/getUserInfo')
          console.log("permissions", permissions);
          // 一级路由数据
         const filstper=getfirst(permissions.permissions)
         console.log('filstper',filstper);
        //  二级路由数据
        const secondper=getseclist(permissions.permissions)
        console.log('secondper',secondper);
          next()
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
