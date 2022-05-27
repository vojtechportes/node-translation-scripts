/* eslint-disable */
const argv = require('yargs').argv
const path = require('path')
const __rootDirname = require("../constants")

function getTranslationLanguagePaths() {
  let translationPaths = argv.translationPaths || argv.t

  if (translationPaths) {
    return translationPaths.split(',').map(item => {
      return path.join(__rootDirname, '../../', item)
    })
  } else {
    return false
  }
}

module.exports = getTranslationLanguagePaths
