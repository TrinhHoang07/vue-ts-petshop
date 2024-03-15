import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '@/layout/DefaultLayout.vue'
import routesConfig from '@/config/routes'
import HomeView from '@/views/HomeView.vue'
import DescriptionView from '@/views/DescriptionView.vue'
import ProfileView from '@/views/ProfileView.vue'
import RegisterView from '@/views/RegisterView.vue'
import LoginView from '@/views/LoginView.vue'
import FlagmentLayout from '@/layout/FlagmentLayout.vue'
import PrivateRoute from '@/components/PrivateRoute.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'defaultLayout',
      component: DefaultLayout,
      children: [
        {
          path: routesConfig.home,
          component: HomeView,
          name: 'home',
      },
      {
          path: routesConfig.description,
          component: DescriptionView,
          name: 'description',
      },
      {
          component: ProfileView,
          name: 'profile',
          path: routesConfig.profile
      }
      ]
    },
    {
      path: '/',
      name: 'flagmentLayout',
      component: FlagmentLayout,
      children: [
        {
          path: routesConfig.register,
          component: RegisterView,
          name: 'register'
        },
        {
          path: routesConfig.login,
          component: LoginView,
          name: 'login'
        }
      ]
    }
  ]
})

export default router
