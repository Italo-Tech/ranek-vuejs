<template>
  <section>
    <h2>Adicionar Produto</h2>

    <AddProduct />

    <h2>Seus Produtos</h2>
    <transition-group v-if="users_products" name="list" tag="ul">
      <li v-for="(product, index) in users_products" :key="index">
        <ItemProduct :product="product">
          <p>{{product.description}}</p>
          <button class="delete" @click="deleteProduct(product.id)">Deletar</button>
        </ItemProduct>
      </li>
    </transition-group>
  </section>
</template>

<script>
import AddProduct from "@/components/pageUser/AddProduct";
import {mapState, mapActions} from 'vuex';
import ItemProduct from "@/components/pageUser/products/ItemProduct";
import {api} from "@/services";

export default {

name: "UserProducts",
  components: {
    ItemProduct,
    AddProduct
  },

  computed: {
    ...mapState(["login", "user", "users_products"])
  },

  methods: {
  ...mapActions(["getUserProducts"]),
    deleteProduct(id) {
    const confirm = window.confirm("Deseja remover este produto?");
      if(confirm) {
        api
            .delete(`/product/${id}`)
            .then(() => {
              this.getUserProducts();
        })
            .catch(error => {
              console.log(error.response);
            });
      }
    }
  },
  watch: {
    login() {
      this.getUserProducts();
    }
  },
  created() {
    if(this.login) {
      this.getUserProducts();
    }
  }
}
</script>

<style scoped>
h2 {
  margin-bottom: 20px;
}

.list-enter,
.list-leave-to{
  opacity: 0;
  transform: translate3d(20px, 0, 0);
}

.list-enter-active,
.list-leave-active {
  transition: all .3s;
}

.delete {
  position: absolute;
  top: 0px;
  right: 0px;
  background: url("../../assets/remove.svg") no-repeat center center;
  width: 24px;
  height: 24px;
  text-indent: -140px;
  overflow: hidden;
  cursor: pointer;
  border: none;
}
</style>