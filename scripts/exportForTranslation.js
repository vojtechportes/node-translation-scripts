/* eslint-disable */
const getOutputDirectoryPath = require('../utils/getOutputDirectoryPath')
const deleteFolder = require('../utils/deleteFolder')
const getReferenceLanguagePath = require('../utils/getReferenceLanguagePath')
const getTranslationLanguagePaths = require('../utils/getTranslationLanguagePaths')
const getReferenceData = require('../utils/getReferenceData')
const getTranslationData = require('../utils/getTranslationData')
const getLanguages = require('../utils/getLanguages')
const unflatten = require('../utils/unflatten')
const exitProcess = require('../utils/exitProcess')
const fs = require('fs')
const path = require('path')
const argv = require('yargs').argv

function exportForTranslation() {
  const outputDirectory = getOutputDirectoryPath()
  const dry = argv.d || argv.dry

  process.stdout.write(
    'Exporting translations...\n' +
      (!!dry ? 'Running dry, nothing will be exported...\n\n' : '')
  )

  if (!outputDirectory) {
    process.stdout.write('Output directory was not specified')
    exitProcess(9)
  }

  if (!dry) {
    if (!fs.existsSync(outputDirectory)) {
      fs.mkdirSync(outputDirectory)
    } else {
      deleteFolder(outputDirectory)
      fs.mkdirSync(outputDirectory)
    }
  }

  const referenceLanguagePath = getReferenceLanguagePath()
  const translationPaths = getTranslationLanguagePaths()
  const keepOriginal = argv.k || argv.keepOriginal
  const includeReferencePath = argv.i || argv.includeReferenceLanguage

  if (referenceLanguagePath && translationPaths) {
    if (!fs.existsSync(referenceLanguagePath)) {
      process.stdout.write("Reference language path doesn't exist.")
      exitProcess(1)
    }

    translationPaths.forEach(translationPath => {
      if (!fs.existsSync(translationPath)) {
        process.stdout.write(
          'Translation path "' + translationPath + '" path doesn\'t exist.'
        )
        exitProcess(1)
      }
    })

    const referenceData = getReferenceData(referenceLanguagePath)
    const translationData = getTranslationData(translationPaths)
    const languages = getLanguages(translationPaths)
    const referenceLanguageName = path.basename(referenceLanguagePath)

    if (includeReferencePath) {
      const output = {}

      Object.keys(referenceData).forEach(file => {
        file = file.replace('.', '__dot__')

        output[file] = unflatten(referenceData[file])
      })

      if (!dry) {
        fs.mkdirSync(path.join(outputDirectory, referenceLanguageName))
        fs.writeFileSync(
          path.join(outputDirectory, referenceLanguageName, 'translation.json'),
          JSON.stringify(output, null, 2)
        )
      }
    }

    languages.forEach(language => {
      if (!dry) {
        fs.mkdirSync(path.join(outputDirectory, language))
      }

      const data = translationData[language]
      const output = {}

      Object.keys(referenceData).forEach(file => {
        file = file.replace('.', '__dot__')

        output[file] = !keepOriginal
          ? unflatten(referenceData[file])
          : unflatten({ ...referenceData[file], ...data[file] })
      })

      if (!dry) {
        fs.writeFileSync(
          path.join(outputDirectory, language, 'translation.json'),
          JSON.stringify(output, null, 2)
        )
      }
    })
  } else {
    process.stdout.write(
      'Reference language path or language paths arguments were not provided.'
    )
    exitProcess(9)
  }
}

module.exports = exportForTranslation
