<template>
  <ul v-if="totalPages > 1">
    <router-link class="btn-page" :to="{query: query(1)}">
      <i class="fas fa-angle-double-left"></i>
    </router-link>
    <li v-for="page in pages" :key="page">
      <router-link :to="{query: query(page)}">{{page}}</router-link>
    </li>
    <router-link class="btn-page" :to="{query: query(totalPages)}">
      <i class="fas fa-angle-double-right"></i>
    </router-link>
  </ul>
</template>

<script>
export default {
  name: "ProductPagination",
  props: {
    productsPerPage: {
      type: Number,
      default: 1,
    },
    totalProducts: {
      type: Number,
      default: 1,
    }
  },

  methods: {
    query(page) {
      return {
        ...this.$route.query,
        _page: page
      }
    }
  },

  computed: {
    /*NAVEGAÇÃO DE PÁGINA *IMPORTANTE* */
    pages() {
      /*página atual*/
      const current = Number(this.$route.query._page)
      /*Total de produtos por página*/
      const range = 9;

      /*total páginas*/
      const total = this.totalPages;
      /*array vazia para receber os produtos*/
      const pagesArray = [];
      const offset = Math.ceil(range / 2)

      /*Pegando cada item(produto) e mandando com push para pageArray*/
      for (let i = 1; i <= total; i++) {
        pagesArray.push(i)
      }

      /*Exibe um certo número(offsett) para esquerda*/
      pagesArray.splice(0, current - offset)
      pagesArray.splice(range, total)

      return pagesArray;
    },

    totalPages() {
        const total = this.totalProducts / this.productsPerPage;
        /*Se meu valor for infinito retorna 0
        * Se meu valor for qualquer outro valor ele irá arredondar para o maior (ceil)*/
        return total !== Infinity ? Math.ceil(total) : 0;
    }
  }
}
</script>

<style scoped>
ul {
  grid-column: 2 / -1;
  margin-top: 50px;
}

li {
  display: inline-block;
}
li a,
.btn-page{
  padding: 2px 8px;
  border-radius: 2px;
  margin: 4px;
}

li a.router-link-exact-active,
li a:hover,
.btn-page{
  background: #87f;
  color: white;
}
</style>