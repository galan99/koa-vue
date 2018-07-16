import Vue from 'vue'
import Router from 'vue-router'
//import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/login',
      component: resolve => require(['../pages/Login.vue'], resolve)
    },
    {
      path: '/list',
      component: resolve => require(['../pages/List.vue'], resolve)
    },
    {
      path: '/',
      redirect: '/login'
    },
  ]
})

function getCookie(name){
   var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
   if(arr != null){
     return unescape(arr[2]); 
   }else{
     return null;
   }
} 

router.beforeEach((to, from, next) => {
  const token = getCookie('username');
  if (to.path === '/login') { // 如果是跳转到登录页的
    next()
  } else {
    if (token !== 'null' && token !== null) {
      next() // 如果有token就正常转向
    } else {
      next('/login') // 否则跳转回登录页
    }
  }
})

export default router