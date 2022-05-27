/* eslint-disable */
const getOutputDirectoryPath = require('../utils/getOutputDirectoryPath')
const getInputDirectoryPath = require('../utils/getInputDirectoryPath')
const exitProcess = require('../utils/exitProcess')
const getDirectories = require('../utils/getDirectories')
const deleteFolder = require('../utils/deleteFolder')
const path = require('path')
const fs = require('fs')
const argv = require('yargs').argv

function importTranslatedFiles() {
  const inputDirectoryPath = getInputDirectoryPath()
  const outputDirectoryPath = getOutputDirectoryPath()
  const referenceLanguage = argv.r || argv.referenceLanguage
  const dry = argv.d || argv.dry

  process.stdout.write(
    'Importing translations...\n' +
      (!!dry ? 'Running dry, nothing will be imported...\n\n' : '')
  )

  if (inputDirectoryPath && outputDirectoryPath) {
    if (
      !fs.existsSync(inputDirectoryPath) ||
      !fs.existsSync(outputDirectoryPath)
    ) {
      process.stdout.write("Input or output directory doesn't exist")
      exitProcess(1)
    }

    const directories = getDirectories(inputDirectoryPath).filter(
      directory => path.basename(directory) !== referenceLanguage
    )

    if (directories.length > 0) {
      directories.forEach(directory => {
        const language = path.basename(directory)
        const translationPath = path.join(directory, 'translation.json')

        if (fs.existsSync(translationPath)) {
          const translation = JSON.parse(fs.readFileSync(translationPath))
          const outputLanguageDirectory = path.join(
            outputDirectoryPath,
            language
          )

          if (!dry) {
            if (fs.existsSync(outputLanguageDirectory)) {
              deleteFolder(outputLanguageDirectory)
            }
            fs.mkdirSync(outputLanguageDirectory)
          }

          Object.keys(translation).forEach(file => {
            if (!dry) {
              fs.writeFileSync(
                path.join(
                  outputLanguageDirectory,
                  file.replace('__dot__', '.')
                ),
                JSON.stringify(translation[file], null, 2)
              )
            }
          })
        } else {
          process.stdout.write(
            'Translation file for language "' + language + '" doesn\'t exist'
          )
          exitProcess(1)
        }
      })
    } else {
      process.stdout.write('No translations found.')
      exitProcess(1)
    }
  } else {
    process.stdout.write(
      'Input or output directory arguments were not provided.'
    )
    exitProcess(9)
  }
}

module.exports = importTranslatedFiles
