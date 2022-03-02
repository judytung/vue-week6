<template>
  <h2>購物車</h2>
</template>

<script>

// export default {
//   data () {
//     return {
//       cartData: {},
//       products: [],
//       productId: '',
//       isLoadingItem: '', // 局部讀取效果的變數，當我們點擊加入到購物車按鈕時，按鈕無法再次點擊
//       user: {
//         email: '',
//         name: '',
//         address: '',
//         phone: '',
//         textarea: ''
//       }
//     }
//   },
//   methods: {
//     getProducts () {
//       const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`
//       this.$http.get(url)
//         .then(res => {
//           this.products = res.data.products
//         })
//         .catch((err) => {
//           alert(err.data.message)
//         })
//     },
//     openProductModal (id) {
//       this.productId = id // 這裏的 id 對應到 html product-modal 元件裡的 :id = "productId" ，productId 是外層資料定義的
//       this.$refs.productModal.openModal() // 取得 productModal 這個元件結點後使用它裡面的 openModal
//     },
//     // 取得購物車列表
//     getCart () {
//       const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`
//       this.$http.get(url)
//         .then(res => {
//           this.cartData = res.data.data // data 裡有兩層，要存到最後一個 data
//         })
//         .catch((err) => {
//           alert(err.data.message)
//         })
//     },
//     // 加入購物車
//     addToCart (id, qty = 1) { // 參數預設值，數量剛加進來就是一個
//       // 根據 api 資料格式建構
//       const data = {
//         product_id: id,
//         qty
//       }
//       this.isLoadingItem = id
//       const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`
//       this.$http.post(url, { data }) // 這邊要將資料帶出去
//         .then(res => {
//           console.log(res)
//           this.getCart()
//           this.isLoadingItem = ''// 讀取完清空
//           // this.$refs.productModal.closeModal()
//         })
//         // .catch((err) => {
//         //   alert(err.data.message)
//         // })
//     },
//     // 刪除購物車品項
//     removeCartItem (id) {
//       this.isLoadingItem = id
//       const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${id}`
//       this.$http.delete(url)
//         .then(res => {
//           alert(res.data.message)
//           this.getCart()
//           this.isLoadingItem = ''
//         })
//         .catch((err) => {
//           alert(err.data.message)
//         })
//     },
//     // 更新購物車
//     updateCart (item) {
//       // 根據 api 資料格式建構
//       const data = {
//         product_id: item.product_id,
//         qty: item.qty
//       }
//       this.isLoadingItem = item.id
//       const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${item.id}`
//       this.$http.put(url, { data }) // 這邊要將資料帶出去
//         .then(res => {
//           alert(res.data.message)
//           this.getCart()
//           this.isLoadingItem = '' // 讀取完清空
//         })
//         .catch((err) => {
//           alert(err.data.message)
//         })
//     },
//     // 表單
//     onSubmit () {
//       // console.log(this.user);
//       this.$refs.form.resetForm()
//       this.cartData.carts = ''
//       this.cartData.total = ''
//     },
//     isPhone (value) {
//       const phoneNumber = /^(09)[0-9]{8}$/
//       return phoneNumber.test(value) ? true : '請輸入正確的電話號碼'
//     }
//   },
//   // 區域註冊
//   // components: {
//   //   VForm: Form,
//   //   VField: Field,
//   //   ErrorMessage: ErrorMessage,
//   // },
//   mounted () {
//     this.getProducts()
//     this.getCart()
//   }
// }
// </script>
