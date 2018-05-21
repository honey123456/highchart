import Vue from 'vue' // Import Vue from node_modules
import Router from 'vue-router' // Import Vue Router from node_modules
import Home from '@/components/Home' //The Home component that's in charge of everything we see on the app's homepage
import VueChartJS from '@/components/VueChartJS' //The VueChartJS component that displays the vue-chartjs charts.
import VueChartKick from '@/components/VueChartKick' //The VueChartJS component that displays the vue-chartkick charts.
import VueCharts from '@/components/VueCharts' //The VueChartJS component that displays the vue-charts charts.

//Specify that we want to use Vue Router
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/chartjs',
      name: 'VueChartJS',
      component: VueChartJS
    },
    {
      path: '/chartkick',
      name: 'VueChartKick',
      component: VueChartKick
    },
    {
      path: '/charts',
      name: 'VueCharts',
      component: VueCharts
    }
  ]
})