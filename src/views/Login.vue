<template>
  <section class="login">
    <h1>Login</h1>
    <form>
      <label for="email">Email</label>
      <input type="email" name="email" id="email" v-model="login.email">

      <label for="password">Senha</label>
      <input type="password" name="password" id="password" v-model="login.password">
      <button class="btn" @click.prevent="logar">Logar</button>
    </form>
    <div class="lost-container">
      <p>Perdeu a senha? <a class="lost-password" href="/" target="_blank">Clique aqui</a></p>
    </div>

    <LoginCreate />
  </section>
</template>

<script>
import LoginCreate from "@/components/general/LoginCreate";

export default {
  name: "Login",
  components: {LoginCreate},
  data() {
    return {
      login: {
        email: "",
        password: ""
      }
    }
  },
  methods: {
    logar() {
      /*dispatch - usado para ações*/
      this.$store.dispatch("getUser", this.login.email)
      /*É a mesma coisa de utilizar push(/user)*/
      this.$router.push("/User")
    }
  }
}
</script>

<style scoped>
.login {
  max-width: 500px;
  margin: 0 auto;
  padding: 0 20px;
}

form {
  display: grid;
}

.btn {
  width: 100%;
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
}

.lost-container {
  text-align: center;
  margin: 20px auto 0 auto;
}

.lost-password:hover {
  color: #87b;
  text-decoration: underline;
}
</style>