var _ = require('lodash')
var path = require('path')
var Busboy = require('busboy')
var fs = require('fs')
var uniqid = require('uniqid')
var ueditorConfig = require(path.join(process.cwd(), '/config/ueditor.config.js'))
var uploadConfig = require('config').get('upload_config')

var filetype = 'jpg,png,gif,ico,bmp'
module.exports = function (req, res, next) {
  if (req.query.action === 'config') {
    // 吐给客户端配置信息
    res.jsonp(ueditorConfig)
  } else if (req.query.action === 'uploadimage' || req.query.action === 'uploadfile' || req.query.action === 'uploadvideo') {
    var busboy = new Busboy({ headers: req.headers })
    busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
      var fileExtArray = filename.split('.')
      var ext = fileExtArray[fileExtArray.length - 1]
      var saveFFilename = uniqid() + '.' + ext
      var savePath = path.join(process.cwd(), uploadConfig.get('upload_ueditor'), saveFilename)
      file.on('end', function () {
        var result = {
          url: uploadConfig.get('baseURL') + '/' + uploadConfig.get('upload_ueditor') + '/' + saveFilename,
          title: req.body && (req.body.pictitle || filename),
          original: filename,
          state: 'SUCCESS'
        }
        if (req.query.encode) {
          res.jsonp(result)
        } else {
          res.redirect(uploadConfig.get('simple_upload_redirect') + '?result=' + JSON.stringify(result))
          // res.redirect(result.url);
        }
      })

      file.pipe(fs.createWriteStream(savePath))
    })
    req.pipe(busboy)
  } else if (req.query.action === 'listimage') {
    fs.readdir(path.join(process.cwd(), uploadConfig.get('upload_ueditor')), function (err, files) {
      if (err) return res.end()
      var total = files.length

      var filelist = []
      total = 0
      _(files).forEach(function (file) {
        var fileExtArray = file.split('.')
        var ext = fileExtArray[fileExtArray.length - 1]
        if (filetype.indexOf(ext.toLowerCase()) >= 0) {
          var resultFile = {}
          resultFile.url = uploadConfig.get('baseURL') + '/' + uploadConfig.get('upload_ueditor') + '/' + file
          filelist.push(resultFile)
          total++
        }
      })
      res.jsonp({
        state: 'SUCCESS',
        list: filelist,
        start: 1,
        total: total
      })
    })
  }
}
