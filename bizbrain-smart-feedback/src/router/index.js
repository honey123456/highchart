import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard/Dashboard.vue'
import DeviceMap from '@/components/DeviceMap/DeviceMap.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  hashbang: false,
  history: true,
  routes: [
    {
      path: '/deviceMap',
      name: 'DeviceMap',
      component: DeviceMap
    },
    {
      path: '/dashboard/:deviceId',
      name: 'Dashboard',
      component: Dashboard
    }
  ]
})
