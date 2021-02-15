<template>
  <form>
    <div class="user" v-if="showDateLogin">
      <!--Nome-->
      <label for="name">Nome</label>
      <input id="name" name="name" type="text" v-model="name">

      <!--E-mail-->
      <label for="email">E-mail</label>
      <input id="email" name="email" type="email" v-model="email">

      <!--Senha-->
      <label for="name">Senha</label>
      <input id="password" name="password" type="password" v-model="password">
    </div>

    <!--Cep-->
    <label for="cep">Cep</label>
    <input id="cep" name="cep" type="text" v-model="cep" @keyup="setCep">

    <!--Rua-->
    <label for="street">Rua</label>
    <input id="street" name="street" type="text" v-model="street">

    <!--Numero-->
    <label for="number">Número</label>
    <input id="number" name="number" type="text" v-model="number">

    <!--Bairro-->
    <label for="neighborhood">Bairro</label>
    <input id="neighborhood" name="neighborhood" type="text" v-model="neighborhood">

    <!--Cidade-->
    <label for="city">Cidade</label>
    <input id="city" name="city" type="text" v-model="city">

    <!--Estado-->
    <label for="state">Estado</label>
    <input id="state" name="state" type="text" v-model="state">

    <div class="button">
      <slot></slot>
    </div>
  </form>
</template>

<script>
import {mapFields} from "@/helpers";
import {getCep} from "@/services";

export default {
  name: "FormUser",
  computed: {
    ...mapFields({
      fields: ["name", "email", "password", "street", "cep", "number", "neighborhood", "city", "state"],
      base: "user",
      mutation: "UPDATE_USER"
    }),
    showDateLogin() {
      return (!this.$store.state.login || (this.$route.name === 'edit-user'))
    }
  },
  methods: {
    setCep() {
      const cep = this.cep.replace(/\D/g, "");
      if(cep.length === 8){
        getCep(cep).then(response => {
          this.street = response.data.logradouro;
          this.neighborhood = response.data.bairro;
          this.state = response.data.uf;
          this.city = response.data.localidade;
        })
      }
    }
  }
}
</script>

<style scoped>
form, .user{
  display: grid;
  grid-template-columns: 80px 1fr;
  align-items: center;
}

.user {
  grid-column: 1 / 3;
}

.button {
  grid-column: 2;
  margin-top: 10px;
}
</style>