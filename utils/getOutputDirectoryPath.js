/* eslint-disable */
const argv = require('yargs').argv
const path = require('path')

function getOutputDirectoryPath() {
  return argv.outputDirectory || argv.o
    ? path.join(__dirname, '../../', argv.outputDirectory || argv.o)
    : false
}

module.exports = getOutputDirectoryPath
