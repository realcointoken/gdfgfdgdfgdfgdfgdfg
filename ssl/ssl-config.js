const path = require('path')
const {readFileSync} = require('fs')

exports.privateKey = readFileSync(
  path.join(__dirname, './private.key'),
).toString()
exports.certificate = readFileSync(
  path.join(__dirname, './cert.pem'),
).toString()
