<template>
  <div class="user">
    <nav class="sidenav">
      <ul>
        <li>
          <router-link :to="{name: 'userProducts'}">Produtos</router-link>
        </li>
        <li>
          <router-link :to="{name: 'purchase'}">Compras</router-link>
        </li>
        <li>
          <router-link :to="{name: 'sales'}">Vendas</router-link>
        </li>
        <li>
          <router-link :to="{name: 'edit-user'}">Editar Usuário</router-link>
        </li>
        <li>
          <button @click="logoutUser">Deslogar</button>
        </li>
      </ul>
    </nav>

    <transition mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: "User",
  methods: {
    logoutUser() {
      /*Chamamos nossa action logoffUser para "deslogin"*/
      this.$store.dispatch("logoutUser");
      this.$router.push("/login")
    }
  }
}
</script>

<style scoped>
  .user {
    display: grid;
    grid-template-columns: minmax(140px, 200px) 1fr;
    max-width: 900px;
    margin: 40px auto;
    grid-gap: 30px;
    padding: 20px;
  }

  @media screen and (max-width: 500px) {
    .user {
      grid-template-columns: 1fr;
      margin: 0px auto;
    }
  }

  .sidenav a,
  .sidenav button{
    padding: 10px;
    display: block;
    background: #f4f7fc;
    margin-bottom: 10px;
    border-radius: 4px;
  }

  .sidenav a.router-link-exact-active,
  .sidenav a:hover,
  .sidenav button:hover{
    background: #87f;
    color: white;
  }

  .sidenav button {
    border: none;
    width: 100%;
    font-size: 1rem;
    text-align: left;
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    cursor: pointer;
  }

</style>