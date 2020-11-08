import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Vote from '../components/vote/Vote.vue'
import Login from '../components/user/Login.vue'
import Signup from '../components/user/Signup.vue'
import VoteResult from '../components/vote/VoteResult.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children:[
      {path:'/vote',component: Vote},
      {path:'/signup',component: Signup},
      {path:'/voteResult',component: VoteResult},

    ]
  },
  {
    path: '/login',
    component: Login
  }

]

const router = new VueRouter({
  routes
})

export default router
