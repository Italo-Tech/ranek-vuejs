<template>
  <section>
    <div v-if="product" class="product">
      <ul class="photos" v-if="product.photos">
        <li v-for="(photo, index) in product.photos" :key="index">
          <img :src="photo.src" :alt="photo.title">
        </li>
      </ul>

      <div class="info">
        <h1>{{product.name}}</h1>
        <p class="price">{{product.price | numberPrice}}</p>
        <p class="description">{{product.description}}</p>
        <transition mode="out-in" v-if="product.sold === 'false'">
          <button class="btn" v-if="!finish" @click="finish = true">Comprar</button>
          <ClosePurchase v-else :product="product"/>
        </transition>
        <button v-else class="btn" disabled>Produto Vendido</button>
      </div>
    </div>
    <PageLoading v-else/>
  </section>
</template>

<script>
import { api } from "@/services";
import PageLoading from "@/components/general/LoadingPage";
import ClosePurchase from "@/components/pageUser/products/ClosePurchase";

export default {
  name: "Product",
  components: {ClosePurchase, PageLoading},
  props: ["id"],
  data() {
    return {
      product: null,
      finish: false
    }
  },
  methods: {
    getProduct() {
      api.get(`/product/${this.id}`).then(response => {
        this.product = response.data;
      });
    }
  },
  created() {
    this.getProduct()
  }
}
</script>

<style scoped>
h1 {
 text-align: start;
  margin-bottom: 10px;
}
.product {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 30px;
  max-width: 900px;
  padding: 60px 20px;
  margin: 0 auto;
}

.price {
  color: #e80;
  font-weight: bold;
  font-size: 1.5rem;
  margin-bottom: 40px;
}

.description {
  font-size: 1.2rem;
}

.btn {
  margin-top: 60px;
  width: 200px;
}

@media screen and (max-width: 500px) {
  .product {
    grid-template-columns: 1fr;
  }
  .photos {
    grid-row: 2;
  }
  .info {
    position: initial;
  }
}
</style>