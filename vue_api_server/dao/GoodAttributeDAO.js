var path = require('path')
daoModule = require('./DAO')
databaseModule = require(path.join(process.cwd(), 'modules/database'))

module.exports.clearGoodAttributes = function (goodsId, cb) {
  db = databaseModule.getDatabase()
  sql = 'DELETE FROM sp_goods_attr WHERE goodsId = ?'
  database.driver.execQuery(
    sql
    , [goodsId], function (err) {
      if (err) return cb(new Error('删除出错'))
      cb(null)
    })
}

module.exports.list = function (goodsId, cb) {
  db = databaseModule.getDatabase()
  sql = 'SELECT good_attr.goodsId,good_attr.attr_id,good_attr.attr_value,good_attr.add_price,attr.attr_name,attr.attr_sel,attr.attr_write,attr.attr_vals FROM sp_goods_attr as good_attr LEFT JOIN sp_attribute as attr ON attr.attr_id = good_attr.attr_id WHERE good_attr.goodsId = ?'
  database.driver.execQuery(
    sql
    , [goodsId], function (err, attrs) {
      if (err) return cb(new Error('删除出错'))
      cb(null, attrs)
    })
}
