<template>
  <h2>單一產品</h2>
  <div class="container">
    {{ product }}
    <img :src="product.imageUrl" alt="">
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
      // const url =
      this.$http(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${id}`)
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
