<template>
  <div class="container">
    <div class="loading">
      <div>
        <div class="sb-loading sb-loading--green"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PageLoading",
  test: /\.vue$/,
  loader: 'vue-loader',
  options: {
    loaders: {
      scss: 'vue-style-loader!css-loader!sass-loader', // <style lang="scss">
      sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax' // <style lang="sass">
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
}

.loading {
  display: flex;
  align-items: center;
  height: 50vh;
}

.sb-loading {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  border-top: 5px solid rgba(136, 119, 255, 0.2);
  border-right: 5px solid rgba(136, 119, 255, 0.2);
  border-bottom: 5px solid rgba(136, 119, 255, 0.2);
  border-left: 5px solid #000;
  animation: loading 1s infinite linear;
  position: relative;
  box-sizing: border-box;
}
.sb-loading::before {
  content: "";
  position: absolute;
  top: 2px;
  left: 2px;
  width: calc(100% - 4px);
  height: calc(100% - 4px);
  border-radius: 50%;
  border-top: 5px solid rgba(136, 119, 255, 0.2);
  border-right: 5px solid #000;
  border-bottom: 5px solid rgba(136, 119, 255, 0.2);
  border-left: 5px solid rgba(136, 119, 255, 0.2);
  animation: loading 3s infinite linear;
  box-sizing: border-box;
}
@keyframes loading {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
.sb-loading--green {
  border-left-color: #87f;
}
.sb-loading--green::before {
  border-right-color: #87f;
}
.sb-loading--green::after {
  border-top-color: #87f;
}
</style>