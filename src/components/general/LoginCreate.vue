<template>
  <section>
    <h2>Crie sua conta</h2>
    <transition mode="out-in">
      <button v-if="!create" class="btn create" @click="create = true">Criar conta</button>
      <FormUser v-else>
        <router-link to="/user" class="btn btn-form" @click.prevent="createUser">Criar Usuário</router-link>
      </FormUser>
    </transition>
  </section>
</template>

<script>
import FormUser from "@/components/general/FormUser";
export default {
  name: "LoginCreate",
  components: {
    FormUser
  },
  data() {
    return {
      create: false
    };
  },
  methods: {
   async createUser() {
     try{
       await this.$store.dispatch("createUser", this.$store.state.user);
       await this.$store.dispatch(
           "getUser",
           this.$store.state.user.email
       );
       this.$router.push({ name: "user" });
     } catch (error) {
       console.log(error)
     }

   }
  }
}

</script>

<style scoped>
h2 {
  text-align: center;
  margin: 40px 0 10px 0;
}

.btn {
  width: 100%;
  max-width: 300px;
  margin: 0 auto 0 auto;
}

.btn-form {
  max-width: 100%;
}
</style>