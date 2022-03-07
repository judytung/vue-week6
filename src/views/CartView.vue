<template>
  <h2>購物車</h2>
   <div class="container">
      <div class="mt-4">
        <!-- 產品Modal -->
        <!-- <product-modal ref="productModal" :id="productId" @add-cart="addToCart"></product-modal> -->
        <!-- 產品Modal -->
        <!-- 購物車列表  :disabled="cartData.carts?.length === 0"-->
        <div class="text-end mb-3">
          <button class="btn btn-outline-danger" type="button" v-if="cartData.carts?.length !== 0">清空購物車</button>
        </div>
        <!---->
        <table class="table align-middle" v-if="cartData.carts?.length !== 0">
          <thead>
            <tr>
              <th></th>
              <th>品名</th>
              <th style="width: 150px">數量/單位</th>
              <th class="text-end">單價</th>
            </tr>
          </thead>
          <tbody>
            <!-- 看有沒有購物車資料 -->
            <template v-if="cartData.carts">
              <tr v-for="item in cartData.carts" :key="item.id">
                <td>
                  <button type="button" class="btn btn-outline-danger btn-sm" @click="removeCartItem(item.id)">
                    x
                  </button>
                </td>
                <td>
                  {{ item.product.title }}
                  <!-- <div class="text-success">
                    已套用優惠券
                  </div> -->
                </td>
                <td>
                  <div class="input-group input-group-sm">
                    <div class="input-group mb-3">
                      <!-- <input
                            min="1" type="number" class="form-control" v-model.number="item.qty"> -->
                            <select  id="" class="form-select" v-model="item.qty"  :disabled="isLoadingItem === item.id" @change="updateCart(item)">
                              <option :value="num" v-for="num in 50" :key="`${num}-${item.id}`">{{ num }}</option>
                            </select>
                      <span class="input-group-text" id="basic-addon2">{{ item.product.unit }}</span>
                    </div>
                  </div>
                </td>
                <td class="text-end">
                  {{ item.total }}
                  <!-- <small class="text-success">折扣價：</small>
                  {{  }} -->
                </td>
              </tr>
            </template>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3" class="text-end">總計</td>
              <td class="text-end">{{ cartData.total }}</td>
            </tr>
            <!-- <tr>
              <td colspan="3" class="text-end text-success">折扣價</td>
              <td class="text-end text-success">{{  }}</td>
            </tr> -->
          </tfoot>
        </table>
            <div class="hover-dark text-center p-3 border border-dark position-relative" v-else>
              <router-link to="/products" class="hover-light txt-dark text-decoration-none stretched-link">
                先去買東西
              </router-link>
            </div>
      </div>
      <div class="my-5 row justify-content-center" v-if="cartData.carts?.length !== 0">
        <v-form ref="form" class="col-md-6" v-slot="{ errors }" @submit="onSubmit">
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <v-field id="email" name="email" type="email" class="form-control"
                      :class="{ 'is-invalid': errors['email'] }"
                      rules="email|required"
                      placeholder="請輸入 Email"
                      v-model="user.email"
                    ></v-field>
            <error-message name="email" class="invalid-feedback"></error-message>
          </div>

          <div class="mb-3">
            <label for="name" class="form-label">收件人姓名</label>
            <v-field id="name" name="姓名" type="text" class="form-control" :class="{ 'is-invalid': errors['姓名'] }" v-model="user.name"
                      placeholder="請輸入姓名" rules="required"></v-field>
            <error-message name="姓名" class="invalid-feedback"></error-message>
          </div>

          <div class="mb-3">
            <label for="tel" class="form-label">收件人電話</label>
            <v-field id="tel" name="電話" type="tel" class="form-control" :class="{ 'is-invalid': errors['電話'] }" :rules="isPhone" v-model="user.phone"
                      placeholder="請輸入電話" ></v-field>
            <error-message name="電話" class="invalid-feedback"></error-message>
          </div>

          <div class="mb-3">
            <label for="address" class="form-label">收件人地址</label>
            <v-field id="address" name="地址" type="text" class="form-control" :class="{ 'is-invalid': errors['地址'] }" v-model="user.address"
                      placeholder="請輸入地址" rules="required" ></v-field>
            <error-message name="地址" class="invalid-feedback"></error-message>
          </div>

          <div class="mb-3">
            <label for="message" class="form-label">留言</label>
            <textarea id="message" class="form-control" cols="30" rows="10" v-model="user.textarea"></textarea>
          </div>
          <div class="text-end">
            <button type="submit" class="btn btn-danger"
            :disabled="Object.keys(errors).length > 0 || cartData.carts?.length === 0">送出訂單</button>
          </div>
        </v-form>
      </div>
    </div>
</template>

<style>
  .hover-dark:hover {
    background: #000;
  }
  .txt-dark {
    color: #000;
  }
  .hover-light:hover {
    color: #fff;
  }
</style>

<script>
import { defineRule, Form, Field, ErrorMessage, configure } from 'vee-validate'
import { required, email } from '@vee-validate/rules'
import { localize, loadLocaleFromURL } from '@vee-validate/i18n'
defineRule('required', required)
defineRule('email', email)
loadLocaleFromURL('https://unpkg.com/@vee-validate/i18n@4.1.0/dist/locale/zh_TW.json')
configure({ // 用來做一些設定
  generateMessage: localize('zh_TW')
})
export default {
  data () {
    return {
      cartData: {},
      products: [],
      productId: '',
      isLoadingItem: '', // 局部讀取效果的變數，當我們點擊加入到購物車按鈕時，按鈕無法再次點擊
      user: {
        email: '',
        name: '',
        address: '',
        phone: '',
        textarea: ''
      }
    }
  },
  methods: {
    // getProducts () {
    //   const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`
    //   this.$http.get(url)
    //     .then(res => {
    //       this.products = res.data.products
    //     })
    //     .catch((err) => {
    //       alert(err.data.message)
    //     })
    // },
    // openProductModal (id) {
    //   this.productId = id // 這裏的 id 對應到 html product-modal 元件裡的 :id = "productId" ，productId 是外層資料定義的
    //   this.$refs.productModal.openModal() // 取得 productModal 這個元件結點後使用它裡面的 openModal
    // },
    // 取得購物車列表
    getCart () {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`
      this.$http.get(url)
        .then(res => {
          this.cartData = res.data.data // data 裡有兩層，要存到最後一個 data
        })
        .catch((err) => {
          alert(err.data.message)
        })
    },
    // 加入購物車
    // addToCart (id, qty = 1) { // 參數預設值，數量剛加進來就是一個
    //   // 根據 api 資料格式建構
    //   const data = {
    //     product_id: id,
    //     qty
    //   }
    //   this.isLoadingItem = id
    //   const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`
    //   this.$http.post(url, { data }) // 這邊要將資料帶出去
    //     .then(res => {
    //       console.log(res)
    //       this.getCart()
    //       this.isLoadingItem = ''// 讀取完清空
    //       // this.$refs.productModal.closeModal()
    //     })
    //     // .catch((err) => {
    //     //   alert(err.data.message)
    //     // })
    // },
    // 刪除購物車品項
    removeCartItem (id) {
      this.isLoadingItem = id
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${id}`
      this.$http.delete(url)
        .then(res => {
          alert(res.data.message)
          this.getCart()
          this.isLoadingItem = ''
        })
        .catch((err) => {
          alert(err.data.message)
        })
    },
    // 更新購物車
    updateCart (item) {
      // 根據 api 資料格式建構
      const data = {
        product_id: item.product_id,
        qty: item.qty
      }
      this.isLoadingItem = item.id
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${item.id}`
      this.$http.put(url, { data }) // 這邊要將資料帶出去
        .then(res => {
          alert(res.data.message)
          this.getCart()
          this.isLoadingItem = '' // 讀取完清空
        })
        .catch((err) => {
          alert(err.data.message)
        })
    },
    // 表單
    onSubmit () {
      // console.log(this.user);
      this.$refs.form.resetForm()
      this.cartData.carts = ''
      this.cartData.total = ''
    },
    isPhone (value) {
      const phoneNumber = /^(09)[0-9]{8}$/
      return phoneNumber.test(value) ? true : '請輸入正確的電話號碼'
    }
  },
  // 區域註冊
  components: {
    VForm: Form,
    VField: Field,
    ErrorMessage: ErrorMessage
  },
  mounted () {
    // this.getProducts()
    this.getCart()
  }
}

</script>
