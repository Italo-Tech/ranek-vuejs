<template>
  <section>
    <div v-if="sales">
      <h2>Vendas</h2>
      <div class="produto-wrapper" v-for="(sale, index) in sales" :key="index">
        <ItemProduct v-if="sale.product" :product="sale.product">
          <p class="comprador">
            <span>Comprador:</span>
            {{ sale.buyer_id }}
          </p>
        </ItemProduct>
        <div class="entrega">
          <h3>Entrega:</h3>
          <ul v-if="sale.address">
            <li v-for="(value, key) in sale.address" :key="key">
              {{ key }}: {{ value }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ItemProduct from "@/components/pageUser/products/ItemProduct";
import {mapState} from "vuex";
import {api} from "@/services";

export default {
  name: "UserSales",
  components: {ItemProduct},
  data() {
    return {
      sales: null
    }
  },
  computed: {
    ...mapState(['user', 'login'])
  },
  methods: {
    getSales() {
      api.get(`/transaction?salesman_id=${this.user.id}`).then(response => {
        this.sales = response.data;
      });
    }
  },
  watch: {
    login() {
      this.getSales();
    }
  },
  created() {
    if (this.login) {
      this.getSales();
    }
  }
}

</script>

<style scoped>
.produto-wrapper{
  margin-bottom: 40px;
}
.comprador span{
  color: #e80;
}
.entrega{
  display: grid;
  grid-template-columns: minmax(100px, 200px) 1fr;
  grid-gap: 20px;
  margin-bottom: 60px;
}
h2 {
  margin-bottom: 20px;
}
h3 {
  justify-self: end;
  margin: 0px;
}

@media screen and (max-width: 500px) {
  .entrega {
    grid-template-columns: 1fr;
    grid-gap: 10px;
  }
  h3 {
    justify-self: start;
  }
}
</style>