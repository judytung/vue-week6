module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/vue-work/' // 資料夾路徑，也是儲存庫名稱
    : '/'
}
