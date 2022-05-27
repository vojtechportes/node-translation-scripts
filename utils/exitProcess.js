/* eslint-disable */
const argv = require('yargs').argv

function exitProcess(code) {
  const dry = argv.dry || argv.d

  if (!dry) {
    process.exit(code)
  }
}

module.exports = exitProcess
