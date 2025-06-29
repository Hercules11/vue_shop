module.exports = function (db, callback) {
  // 用户模型
  db.define('AttributeModel', {
    attr_id: { type: 'serial', key: true },
    attr_name: String,
    cat_id: Number,
    attr_sel: ['only', 'many'], // only:输入框(唯一)  many:后台下拉列表/前台单选框
    attr_write: ['manual', 'list'], // manual:手工录入  list:从列表选择
    attr_vals: String,
    delete_time: Number
  }, {
    table: 'sp_attribute'
  })
  return callback()
}
// 技术框架的模型千千万，但是解决的问题是相对一致的，
// 作为开发者，弄清楚自己的业务模型，数据字段，按照所选的技术框架暴露的接口，写进去就行了。
// 不用纠结各种技术框架的模型定义方式，
