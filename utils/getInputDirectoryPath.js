/* eslint-disable */
const argv = require('yargs').argv
const path = require('path')
const __rootDirname = require("../constants")

function getInputDirectoryPath() {
  return argv.inputDirectory || argv.i
    ? path.join(__rootDirname, '../../', argv.inputDirectory || argv.i)
    : false
}

module.exports = getInputDirectoryPath
