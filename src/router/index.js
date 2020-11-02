import Vue from 'vue'
import VueRouter from 'vue-router'
const Home = () => import('../view/home/Home.vue')
const Category = () => import('../view/category/Category.vue')
const ShopCart = () => import('../view/shopCart/ShopCart.vue')
const Profile = () => import('../view/profile/Profile.vue')
const Detail =  () => import('../view/detail/Detail')

// 1.安装路由插件
Vue.use(VueRouter)

// 2.创建路由对象,路由表
const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/shopCart',
    component: ShopCart
  },
  {
    path: '/profile',
    component: Profile
  },

  {
    path: '/detail',
    component: Detail
  }
]
const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
