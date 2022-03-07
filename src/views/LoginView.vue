<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-4 offset-lg-4 mt-4">
        <form @submit.prevent="logIn">
          <h2 class="text-center">登入</h2>
          <label for="account" class="fs-5">帳號</label>
          <input type="text" class="form-control" id="account" placeholder="email address"
           v-model="user.username" required/>
          <label for="password" class="fs-5">密碼</label>
          <input type="password" class="form-control" id="password" placeholder="password" v-model="user.password" required/>
          <button type="button" @click="logIn" class="btn btn-primary mt-4 float-end">登入</button>
          <router-link class="btn btn-outline-primary mt-4 me-3 float-end d-block" to="/">回到前台</router-link>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    logIn () {
      const url = `${process.env.VUE_APP_API}/admin/signin/`
      this.$http.post(url, this.user)
        .then((res) => {
          console.log(res)
          const { token, expired } = res.data // 解構寫法
          console.log(token, expired)
          document.cookie = `hexToken=${token}; expires=${new Date(expired)}`
          this.$router.push('/admin/products')
        })
        .catch((err) => {
          alert(err.response.data.message)
        })
    }
  }
}
</script>
