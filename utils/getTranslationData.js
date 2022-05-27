/* eslint-disable */
const readFiles = require('./readFiles')
const exitProcess = require('./exitProcess')
const flatten = require('./flatten')
const path = require('path')
const fs = require('fs')

function getTranslationData(paths) {
  const translationData = {}

  paths.forEach(languagePath => {
    if (fs.existsSync(languagePath)) {
      const language = path.basename(languagePath)

      translationData[language] = {}

      readFiles(languagePath, (filename, content) => {
        filename = filename.replace('.', '__dot__')

        translationData[language][String(filename)] = flatten(
          JSON.parse(content)
        )
      })
    } else {
      process.stdout.write('Directory ' + languagePath + " doesn't exist.")
      exitProcess(9)
    }
  })

  return translationData
}

module.exports = getTranslationData
