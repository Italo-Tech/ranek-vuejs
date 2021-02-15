import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Product from "@/views/Product";
import Login from "@/views/Login";
import User from "@/views/user/User";
import UserProducts from "@/views/user/UserProducts";
import UserPurchase from "@/views/user/UserPurchase";
import UserSales from "@/views/user/UserSales";
import UserEdit from "@/views/user/UserEdit";


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/product/:id',
    name: 'Product',
    component: Product,
    props: true
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/user',
    name: User,
    component: User,
    children: [
      {
        path: "",
        name: "userProducts",
        component: UserProducts
      },
        /*Compras*/
      {
        path: "purchase",
        name: "purchase",
        component: UserPurchase
      },
        /*Vendas*/
      {
        path: "sales",
        name: "sales",
        component: UserSales
      },
      {
        path: "edit",
        name: "edit-user",
        component: UserEdit
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    /*scrollBehavio:
    * A cada interação com os componentes após carrega-los nossa imagem volta ao topo
    * ao invés de ficar fixo no final da página.
    * O behavior ao final leva ao topo da página de forma suave com o smooth*/
    return window.scrollTo({top: 0, behavior: "smooth"});
  }
})

export default router
