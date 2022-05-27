#!/usr/bin/env node

/* eslint-disable */
const argv = require('yargs').argv

const validateTranslations = require('./scripts/validateTranslations')
const exportForTranslation = require('./scripts/exportForTranslation')
const importTranslatedFiles = require('./scripts/importTranslatedFiles')

/**/

if (argv.h || argv.help) {
  process.stdout.write(
    'Translation Scripts help\n\n' +
      '--validate - Validates reference language against other translations\n' +
      '\t -r or --refLanguagePath - Path to root of directory with reference language\n' +
      '\t -t or --translationPaths - Paths to root of directories with translations delimited by comma\n' +
      '--export - Exports translation data to specified languages\n' +
      '\t -r or --refLanguagePath - Path to root of directory with reference language\n' +
      '\t -t or --translationPaths - Paths to root of directories with translations delimited by comma\n' +
      '\t -k or --keepOriginalTranslations - Determines whether original translations should be preserved or not\n' +
      '\t -o or --outputPath - Path to output directory\n' +
      '\t -i or --includeReferenceLanguage - Include reference language\n' +
      '--import - Imports translated data to specified directory\n' +
      '\t -i or --inputPath - Path to directory with translated files\n' +
      '\t -o or --outputPath - Path to output directory\n' +
      "\t -r or --referenceLanguage - Reference language (won't be imported)\n" +
      '-d or --dry - Dry run'
  )

  process.exit(0)
}

/**/

if (argv.validate) {
  validateTranslations()
}

if (argv.export) {
  exportForTranslation()
}

if (argv.import) {
  importTranslatedFiles()
}
