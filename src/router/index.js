import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'
import {getStore} from '../utils/storage'
import {setTitle} from '../utils/util'

Vue.use(Router)
const CarBuy = r => require.ensure([], () => r(require('@/views/car-buy')), 'chunk-carbuy')
const CarInsurance = r => require.ensure([], () => r(require('@/views/car-insurance')), 'chunk-carinsurance')
const Detail = r => require.ensure([], () => r(require('@/views/detail')), 'chunk-detail')

const router = new Router({
  routes: [
    { name: 'carbuy', path: '/carbuy', component: CarBuy, meta: { auth: false, title: '新车团购' } },
    { name: 'carinsurance', path: '/carinsurance', component: CarInsurance, meta: { auth: false, title: '车险' } },
    { name: 'detail', path: '/detail', component: Detail, meta: { auth: false, title: '详情' } }
  ]
})

router.beforeEach((to, from, next) => {
  const {path} = to
  setTitle(to.meta.title)
  if (to.meta.auth) {
    const token = getStore('token')
    store.commit('changeFullPath', to.fullPath)
    if (token) {
      next()
    } else if (path !== 'login') {
      next({
        path: '/login',
        query: { redirect: to.fullPath }  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next()
  }
})

router.afterEach((to, from, next) => {
  clearInfo()
})

function clearInfo () {
  store.commit('cleanValidatorMsg')
  store.commit('cleanApplyEdit')
}
export default router
