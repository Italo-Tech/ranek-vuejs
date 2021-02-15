<template>
  <section>
    <h2>Endereço de Envio</h2>
    <FormUser>
      <button class="btn" @click.prevent="finishPurchase">Finalizar Compra</button>
    </FormUser>
  </section>
</template>

<script>
import FormUser from "@/components/general/FormUser";
import {mapState} from 'vuex'
import {api} from "@/services";

export default {
name: "ClosePurchase",
  components: {FormUser},
  props: ["product"],

  computed: {
  ...mapState(['user']),
    purchaseItem() {
      return {
        /*Comprador_id*/
        buyer_id: this.user.email,
        /*Vendedor_id*/
        salesman_id:  this.product.user_id,
        product: this.product,
        address: {
          cep: this.user.cep,
          street: this.user.street,
          number: this.user.number,
          neighborhood: this.user.neighborhood,
          city: this.user.city,
          state: this.user.state,
        }
      }
    }
  },

  methods: {
    createTransaction() {
      return api.post("/transaction", this.purchaseItem).then(() => {
        this.$router.push({ name: "purchase" });
      })
    },
    async createUser() {
      try {
        await this.$store.dispatch("createUser", this.$store.state.user);
        await this.$store.dispatch(
            "getUser",
            this.$store.state.user.email
        );
        await this.createTransaction();
      } catch (error) {
        console.log(error);
      }
    },
    finishPurchase() {
      if (this.$store.state.login) {
        this.createTransaction();
      } else {
        this.createUser();
      }
    }
  },
}

</script>

<style scoped>
h2 {
  margin-top: 40px;
  margin-bottom: 20px;
}

.btn{
  background: #e80;
}
</style>