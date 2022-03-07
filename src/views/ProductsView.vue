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
            <div class="d-flex justify-content-between">
              <router-link :to="`/product/${product.id}`" class="btn btn-primary">查看更多</router-link>
              <button type="button" class="btn border border-dark" @click="addToCart(product.id)" :disabled="isLoadingItem === product.id">
                加到購物車
                <span class="spinner-border spinner-border-sm" v-show="isLoadingItem === product.id"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      products: [],
      isLoadingItem: ''
    }
  },
  methods: {
    getProducts () {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`
      this.$http(url)
        .then(res => {
          this.products = res.data.products
        })
        .catch((err) => {
          alert(err.data.message)
        })
    },
    // 加入購物車
    addToCart (id, qty = 1) { // 參數預設值，數量剛加進來就是一個
      // 根據 api 資料格式建構
      const data = {
        product_id: id,
        qty
      }
      this.isLoadingItem = id
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`
      this.$http.post(url, { data }) // 這邊要將資料帶出去
        .then(res => {
          console.log(res)
          this.isLoadingItem = ''// 讀取完清空
          // this.$refs.productModal.closeModal()
        })
        // .catch((err) => {
        //   alert(err.data.message)
        // })
    }
  },
  mounted () {
    this.getProducts()
  }
}
</script>
