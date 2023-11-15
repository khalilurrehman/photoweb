import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/auth/Login.vue'
import Signup from '../views/auth/Signup.vue'
import CreateGallery from '../views/gallery/CreateGallery.vue'
import ImageDetail from '../views/gallery/ImageDetail.vue'

// Route Guard
import { projectAuth } from '../firebase/config'

const requireAuth = (to, from, next) => {
  let user = projectAuth.currentUser
  if(!user)
  {
    next({ name: 'Login' })
  }
  else{
    next()
  }
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    beforeEnter: requireAuth
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },

  {
    path: '/gallery/create',
    name: 'CreateGallery',
    component: CreateGallery,
    beforeEnter: requireAuth
  },

  {
    path: '/gallery/:id',
    name: 'ImageDetail',
    component: ImageDetail,
    beforeEnter: requireAuth,
    props: true
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
