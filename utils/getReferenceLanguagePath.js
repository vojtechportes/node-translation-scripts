/* eslint-disable */
const argv = require('yargs').argv
const path = require('path')
const __rootDirname = require("../constants")

function getReferenceLanguagePath() {
  return argv.refLanguagePath || argv.r
    ? path.join(__rootDirname, '../../', argv.refLanguagePath || argv.r)
    : false
}

module.exports = getReferenceLanguagePath
