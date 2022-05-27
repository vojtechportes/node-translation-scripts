/* eslint-disable */
const argv = require("yargs").argv;
const path = require("path");
const __rootDirname = require("../constants");

function getOutputDirectoryPath() {
  return argv.outputDirectory || argv.o
    ? path.join(__rootDirname, "../../", argv.outputDirectory || argv.o)
    : false;
}

module.exports = getOutputDirectoryPath;
