<template>
  <h2>產品列表</h2>
  {{products}}
</template>

<script>
import axios from 'axios'
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
      axios.get(url)
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
