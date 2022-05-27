/* eslint-disable */
const argv = require('yargs').argv
const path = require('path')

function getInputDirectoryPath() {
  return argv.inputDirectory || argv.i
    ? path.join(__dirname, '../../', argv.inputDirectory || argv.i)
    : false
}

module.exports = getInputDirectoryPath
