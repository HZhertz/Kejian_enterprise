import Vue from 'vue'
import VueRouter from 'vue-router'
import https from '@/utils/https'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/news',
    name: 'news',
    component: () => import('../views/News.vue')
  },
  {
    path: '/newsdetails/:id',
    name: 'newsdetails',
    component: () => import('../views/NewsDetails.vue')
  },
  {
    path: '/product',
    name: 'product',
    component: () => import('../views/Product.vue')
  },
  {
    path: '/case',
    name: 'case',
    component: () => import('../views/Case.vue')
  },
  {
    path: '/casedetails/:id',
    name: 'casedetails',
    component: () => import('../views/CaseDetails.vue')
  },
  {
    path: '/goin',
    name: 'goin',
    component: () => import('../views/GoIn.vue')
  },
  {
    path: '/download',
    name: 'download',
    component: () => import('../views/Download.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    meta: {
      requireAuth: true
    },
    component: () => import('../views/Admin.vue'),
    redirect: '/admin/user',
    children: [
      {
        path: '/admin/user',
        name: 'user',
        component: () => import('../views/Admin/User.vue')
      },
      {
        path: '/admin/news',
        name: 'new',
        component: () => import('../views/Admin/News.vue')
      },
      {
        path: '/admin/cases',
        name: 'cases',
        component: () => import('../views/Admin/Cases.vue')
      },
      {
        path: '/admin/team',
        name: 'team',
        component: () => import('../views/Admin/Team.vue')
      },
      {
        path: '/admin/course',
        name: 'course',
        component: () => import('../views/Admin/Course.vue')
      },
      {
        path: '/admin/enterprise',
        name: 'enterprise',
        component: () => import('../views/Admin/Enterprise.vue')
      },
      {
        path: '/admin/honor',
        name: 'honor',
        component: () => import('../views/Admin/Honor.vue')
      },
      {
        path: '/admin/dictionary',
        name: 'dictionary',
        component: () => import('../views/Admin/Dictionary.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((res) => res.meta.requireAuth)) {
    if (sessionStorage.getItem('Ticket')) {
      https
        .get('Admin/User/GetUserAll')
        .then((response) => {
          if (response.type === 'success') {
            next()
          } else {
            sessionStorage.removeItem('Ticket')
            next({ path: '/login' })
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    } else {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    }
  } else {
    next()
  }
})

export default router
