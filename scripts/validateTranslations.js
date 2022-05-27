/* eslint-disable */
const getReferenceLanguagePath = require('../utils/getReferenceLanguagePath')
const getTranslationLanguagePaths = require('../utils/getTranslationLanguagePaths')
const getReferenceData = require('../utils/getReferenceData')
const getTranslationData = require('../utils/getTranslationData')
const getLanguages = require('../utils/getLanguages')
const exitProcess = require('../utils/exitProcess')
const fs = require('fs')
const argv = require('yargs').argv

const validateTranslations = () => {
  const referenceLanguagePath = getReferenceLanguagePath()
  const translationPaths = getTranslationLanguagePaths()
  const dry = argv.d || argv.dry

  process.stdout.write(
    'Validating translations...\n' +
      (!!dry ? 'Running dry, script will continue without exiting...\n\n' : '')
  )

  if (referenceLanguagePath && translationPaths) {
    if (fs.existsSync(referenceLanguagePath)) {
      const referenceData = getReferenceData(referenceLanguagePath)
      const translationData = getTranslationData(translationPaths)
      const languages = getLanguages(translationPaths)

      languages.forEach(language => {
        const data = translationData[language]
        const errors = []

        try {
          Object.keys(referenceData).forEach(file => {
            if (!data[file]) {
              errors.push(
                'Translation file "' +
                  file.replace('__dot__', '.') +
                  '" in language "' +
                  language +
                  '" doesn\'t exist'
              )
            } else {
              Object.keys(referenceData[file]).forEach(translationKey => {
                if (!data[file][translationKey]) {
                  errors.push(
                    'Translation key "' +
                      translationKey +
                      '" in file "' +
                      file.replace('__dot__', '.') +
                      '" in language "' +
                      language +
                      '" doesn\'t exist'
                  )
                }
              })
            }
          })
        } catch (e) {
          process.stdout.write(e)
          exitProcess(1)
        }

        if (errors.length > 0) {
          process.stdout.write(
            errors.join('\n') +
              '\n\nFinished with ' +
              errors.length +
              ' errors\n'
          )
          exitProcess(1)
        } else {
          process.stdout.write('Everything is great!\n')
          exitProcess(0)
        }
      })
    } else {
      process.stdout.write(
        'Directory ' + referenceLanguagePath + " doesn't exist."
      )
      exitProcess(9)
    }
  } else {
    process.stdout.write(
      'Reference language path or language paths arguments were not provided.'
    )
    exitProcess(9)
  }
}

module.exports = validateTranslations
