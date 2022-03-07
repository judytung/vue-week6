<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <h1>
        <router-link class="logo navbar-brand d-block" to="/">Own Dessert</router-link>
      </h1>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/">首頁</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/products">產品</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/cart">購物車</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/products">後台產品</router-link>
          </li>
        </ul>
      </div>
        <a class="btn btn-primary position-relative bg-light border-0" @click="changeCart">
          <i class="bi bi-cart2 fs-4"></i>
          <span class="badge rounded-pill bg-danger position-absolute start-50 ">{{ cartData.carts.length }}</span>
        </a>
    </div>
  </nav>
</template>

<script>
import emitter from '@/libs/emitter'

export default {
  data () {
    return {
      cartData: {
        carts: []
      }
    }
  },
  methods: {
    // 取得購物車列表
    getCart () {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`
      this.$http.get(url)
        .then(res => {
          this.cartData = res.data.data // data 裡有兩層，要存到最後一個 data
          emitter.emit('get-cart')
        })
        // .catch((err) => {
        //   alert(err.data.message)
        // })
    },
    changeCart () {
      this.$router.push('/cart')
    }
  },
  mounted () {
    this.getCart()
    emitter.on('get-cart', () => {
      this.getCart()
    })
  }
}

</script>
