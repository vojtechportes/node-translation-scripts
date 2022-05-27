/* eslint-disable */
const argv = require('yargs').argv
const path = require('path')

function getReferenceLanguagePath() {
  return argv.refLanguagePath || argv.r
    ? path.join(__dirname, '../../', argv.refLanguagePath || argv.r)
    : false
}

module.exports = getReferenceLanguagePath
