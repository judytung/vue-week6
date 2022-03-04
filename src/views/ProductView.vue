<template>
  <h2>單一產品</h2>
  <div class="container">
    <div class="d-flex">
      <div class="row">
        <div class="col-6">
          <img :src="product.imageUrl" class="img-fluid" alt="">
        </div>
        <div class="col-6">
          <h3>{{ product.title }}</h3>
          <p>{{ product.content }}</p>
          <span>原價： {{ product.origin_price }}</span><br>
          <span>特價：{{ product.price }} </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      product: {}
    }
  },
  methods: {
    getProduct () {
      // $route 本身是一個物件可以用來取值
      const { id } = this.$route.params
      console.log(this.$route)
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${id}`
      this.$http(url)
        .then(res => {
          this.product = res.data.product
        })
        .catch((err) => {
          alert(err.data.message)
        })
    }
  },
  mounted () {
    this.getProduct()
  }
}
</script>
