import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';
import axios  from 'axios';
import '../src/api/mock.js'
// require('./api/mock.js')

import {
  Button, Container, Main, Header, Aside,
  Submenu, MenuItem, MenuItemGroup, Menu,
   Dropdown, DropdownMenu, DropdownItem,
  Row, Card, Col, Table, TableColumn,Breadcrumb,BreadcrumbItem,Tag,
  Option,DatePicker,Form,FormItem,Select,Dialog,Switch,Input,
  Pagination,MessageBox,Message
} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false


// 全部都引入，这种方法其实是不推荐的，一般按需定义加载组件
// Vue.use(ElementUI)

// 按需引入
// 第一种写法 1、Vue.component(Button.name, Button);
// 或写为2、第二种写法
Vue.use(Button)
Vue.use(Container)
Vue.use(Main)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Menu)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Row)
Vue.use(Card)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Tag)
Vue.use(Option)
Vue.use(DatePicker)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Select)
Vue.use(Dialog)
Vue.use(Switch)
Vue.use(Input)
Vue.use(Pagination)
Vue.prototype.$http=axios

// 将confirm绑定到MessageBox.confirm
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message = Message
// 这段代码网上拷贝用来解决控制台的一个错误的
import Router from 'vue-router'
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
return routerPush.call(this, location).catch(error=> error)
}
// 实现路由的监听,导航守卫
router.beforeEach((to,from,next)=>{
  store.commit('getToken')
  const token = store.state.user.token
  if(!token && to.name!=='login'){
    next({
      name:'login'
    })
  }else if(token && to.name==='login'){
    next({name:'login'})
  }
  else{
    next()
  }
})


new Vue({
  router,
  store,
  render: h => h(App)

}).$mount('#app')



