<template>
  <section>
    <h1>Compre ou Venda</h1>
    <SearchProduct />
    <ListProduct />
  </section>
</template>

<script>

import SearchProduct from "@/components/home/SearchProduct";
import ListProduct from "@/components/home/ListProduct";
export default {
  name: 'Home',
  components: {
    ListProduct,
    SearchProduct
  }
}
</script>

<style>
h1 {
  color: #87f;
  font-size: 2rem;
  margin-top: 40px;
  text-align: center;
}
</style>
