<template>
  <section>
    <FormUser>
      <button class="btn" @click.prevent="updateUser">Atualizar Cadastro</button>
    </FormUser>
  </section>
</template>

<script>
import FormUser from "@/components/general/FormUser";
import { api } from '@/services.js'

export default {
  name: "UserEdit",
  components: {FormUser},
  methods: {
    updateUser() {
     api
         .put(
             `/user/${this.$store.state.user.id}`,
             this.$store.state.user
         )
         .then(() => {
           this.$store.dispatch("getUser");
           this.$router.push({ name: "user" });
          })
      .catch(error => {
        console.log(error.response)
      });
    }
  }
}
</script>

<style scoped>

</style>