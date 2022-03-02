<template>
  <h2>產品列表</h2>
  <div class="container">
    <div class="row">
      <div class="col-lg-3 col-md-6 g-3" v-for="product in products" :key="product.id">
        <div class="card h-100">
          <img :src="product.imageUrl" class="card-img-top " alt="">
          <div class="card-body">
            <h5 class="card-title">{{ product.title }}</h5>
            <p class="card-text">{{ product.description }}</p>
            <router-link :to="`/product/${product.id}`" class="btn btn-primary">加入購物車</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import vueAxios from 'vue-axios'
export default {
  data () {
    return {
      products: []
    }
  },
  methods: {
    getProducts () {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`
      this.$http.get(url)
        .then(res => {
          this.products = res.data.products
        })
        .catch((err) => {
          alert(err.data.message)
        })
    }
  },
  mounted () {
    this.getProducts()
  }
}
</script>
