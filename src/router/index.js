import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import AddDrink from '@/components/AddDrink'
import EditDrink from '@/components/EditDrink'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/add-drink',
      name: 'AddDrink',
      component: AddDrink
    },
    {
      path: '/edit-drink/:drink_slug',
      name: 'EditDrink',
      component: EditDrink
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
