import Vue from 'vue'
import Vuex from 'vuex'
import {api} from "@/services";

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    login: false,
    user: {
      id: "",
      name: "",
      email: "",
      password: "",
      cep: "",
      street: "",
      number: "",
      neighborhood: "", /*Bairro*/
      city: "",
      state: ""
    },
    users_products: null
  },
  mutations: {
    UPDATE_LOGIN(state, payload)  {
      state.login = payload
    },
    UPDATE_USER(state, payload)  {
      state.user = Object.assign(state.user, payload);
    },
    UPDATE_USERS_PRODUCTS(state, payload) {
      state.users_products = payload
    },
    ADD_USERS_PRODUCTS(state, payload) {
      state.users_products.unshift(payload);
    }
  },
  actions: {
    getUserProducts(context) {
      api.get(`/product?user_id=${context.state.user.id}`).then(response => {
        context.commit("UPDATE_USERS_PRODUCTS", response.data)
      })
    },
    getUser(context, payload) {
      return api.get(`/user/${payload}`).then(response => {
        context.commit("UPDATE_USER", response.data);
        context.commit("UPDATE_LOGIN", true);
      })
    },
    createUser(context, payload) {
      context.commit("UPDATE_USER", {id: payload.email})
      return api.post("/user", payload)
    },
    /*Deslogar*/
    logoutUser(context) {
      /*Atualizar nossos dados para 0*/
      context.commit("UPDATE_USER",{
        id: "",
        name: "",
        email: "",
        password: "",
        cep: "",
        street: "",
        number: "",
        neighborhood: "",
        city: "",
        state: ""
      });
      /*E mudar nosso login de true para false*/
      context.commit("UPDATE_LOGIN", false);
    }
  },
  modules: {
  }
})
