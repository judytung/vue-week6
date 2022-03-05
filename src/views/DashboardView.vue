<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
    <router-link class="navbar-brand" to="/admin">後台</router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link class="nav-link" to="/">回到前台</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/admin/products">產品列表</router-link>
        </li>
         <li class="nav-item">
          <router-link class="nav-link" to="">訂單</router-link>
        </li>
      </ul>
      <a href="#" @click.prevent="signOut" class="text-light text-decoration-none">登出</a>
    </div>
  </div>
</nav>
  <router-view v-if="checkSuccess"></router-view>
</template>

<script>
// 驗證
export default {
  data () {
    return {
      checkSuccess: false
    }
  },
  methods: {
    checkLogin () {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
      //  axios.defaults.headers.common['Authorization'] = token;
      if (token) {
        this.$http.defaults.headers.common.Authorization = `${token}`
        const url = `${process.env.VUE_APP_API}/api/user/check`
        this.$http
          .post(url, { api_token: this.token })
          .then(() => {
            this.checkSuccess = true
          })
          .catch((err) => {
            alert(err.data.message)
            this.$router.push('/login') // 轉址過去登入頁面
          })
      } else {
        alert('尚未登入')
        this.$router.push('/login')
      }
    },
    signOut () {
      document.cookie = 'hexToken= ; expires=;'
      alert('已登出')
      this.$router.push('/login')
    }
  },
  mounted () {
    this.checkLogin()
  }
}
</script>
