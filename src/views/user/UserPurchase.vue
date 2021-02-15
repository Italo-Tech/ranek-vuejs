<template>
  <section>
    <div v-if="shoppings">
      <h2>Compras</h2>
      <div class="produto-wrapper" v-for="(shopping, index) in shoppings" :key="index">
        <ItemProduct v-if="shopping.product" :product="shopping.product">
          <p class="vendedor">
            <span>Vendedor:</span>
            {{ shopping.salesman_id }}
          </p>
        </ItemProduct>
      </div>
    </div>
  </section>
</template>

<script>
import ItemProduct from "@/components/pageUser/products/ItemProduct";
import {mapState} from "vuex";
import {api} from "@/services";

export default {
  name: "UserPurchase",
  components: {ItemProduct},
  data() {
    return {
      shoppings: null
    }
  },
  computed: {
    ...mapState(['user', 'login'])
  },
  methods: {
    getShoppings() {
      api.get(`/transaction?buyer_id=${this.user.id}`).then(response => {
        this.shoppings = response.data;
      });
    }
  },
  watch: {
    login() {
      this.getShoppings();
    }
  },
  created() {
    if (this.login) {
      this.getShoppings();
    }
  }
}

</script>

<style scoped>
.produto-wrapper{
  margin-bottom: 40px;
}
.vendedor span{
  color: #e80;
}

h2 {
  margin-bottom: 20px;
}
</style>