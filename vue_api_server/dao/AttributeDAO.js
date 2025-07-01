var path = require('path')
daoModule = require('./DAO')
databaseModule = require(path.join(process.cwd(), 'modules/database'))

/**
 * 获取参数列表数据
 *
 * @param  {[type]}   catId 分类ID
 * @param  {[type]}   sel    类型
 * @param  {Function} cb     回调函数
 */
module.exports.list = function (catId, sel, cb) {
  db = databaseModule.getDatabase()
  sql = 'SELECT * FROM sp_attribute WHERE catId = ? AND attr_sel = ? AND delete_time is NULL'
  database.driver.execQuery(
    sql
    , [catId, sel], function (err, attributes) {
      if (err) return cb(new Error('查询执行出错'))
      cb(null, attributes)
    })
}
