<template>
  <section class="product-container">
    <transition mode="out-in">
      <div v-if="products && products.length" class="products" key="products">
        <div v-for="(product, index) in products" :key="index" class="product">
          <router-link :to="{name: 'Product', params: {id: product.id}}">
            <img v-if="product.photos" :src="product.photos[0].src" :alt="product.photos[0].titulo">
            <p class="price">{{product.price | numberPrice}}</p>
            <h2 class="title">{{product.name}}</h2>
            <p>{{product.description}}</p>
          </router-link>
        </div>
        <ProductPagination :totalProducts="totalProducts" :productsPerPage="productsPerPage"/>
      </div>
      <!--v-else para busca de produtos-->
      <div v-else-if="products && products.length === 0" key="noResult">
        <p class="no-result">Busca sem resultados. Tente buscar outro termo.</p>
      </div>
      <!--LoadingPage-->
        <LoadingPage v-else key="loading"/>
    </transition>
  </section>
</template>

<script>
import { api } from "@/services.js"
import {serialize} from "@/helpers";
import ProductPagination from "@/components/general/ProductPagination";

export default {

name: "ListProduct",
  components: {
    ProductPagination
  },
  data() {
    return {
      products: null,
      productsPerPage: 9,
      totalProducts: 0
    };
  },
  computed: {
    url() {
      const query = serialize(this.$route.query);
      return `/product?_limit=${this.productsPerPage}${query}`;
    }
  },

  methods: {
    getProdutos() {
      this.products = null;
      window.setTimeout(() => {
        //Recebendo export de services.js
        api.get(this.url)
            .then( response => {
              this.totalProducts = Number(response.headers['x-total-count']);
              this.products = response.data;
            });
      }, 1500)

      //Fetch
      /*fetch("http://localhost:3000/product")
      .then(response => response.json())
      .then( response => {
        this.products = response;
      })*/
    }
  },
  watch: {
    url() {
      this.getProdutos();
    }
  },

  created() {
    this.getProdutos();
  }
}
</script>

<style scoped>
.product-container {
  max-width: 1000px;
  margin: 0 auto;
}

.products {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30px;
  margin: 30px;
}

@media screen and (max-width: 500px) {
  .products {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 10px;
    margin: 10px;
  }
}

.product {
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.1);
  padding: 10px;
  background: #fff;
  border-radius: 4px;
  transition: all 0.2s;
}

.product:hover {
  box-shadow: 0 6px 12px rgba(30, 60, 90, 0.2);
  transform: scale(1.1);
  position: relative;
  z-index: 1;
}

.product img {
  border-radius: 4px;
  margin-bottom: 20px;
}

.title {
  margin-bottom: 10px;
}

.price {
  color: #e80;
  font-weight: bold;
}

.no-result {
  text-align: center;
}
</style>