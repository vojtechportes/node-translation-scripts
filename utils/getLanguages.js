/* eslint-disable */
const fs = require('fs')
const path = require('path')
const exitProcess = require('./exitProcess')

function getLanguages(paths) {
  const languages = []

  paths.forEach(languagePath => {
    if (fs.existsSync(languagePath)) {
      const language = path.basename(languagePath)
      languages.push(language)
    } else {
      process.stdout.write('Directory ' + languagePath + " doesn't exist.")
      exitProcess(9)
    }
  })

  return languages
}

module.exports = getLanguages
