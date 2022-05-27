/* eslint-disable */
const fs = require('fs')

function readFiles(dirname, onFileContent, onError) {
  try {
    const filenames = fs.readdirSync(dirname)

    filenames.forEach(filename => {
      try {
        const content = fs.readFileSync(dirname + filename, 'utf-8')
        onFileContent(filename, content)
      } catch (e) {
        onError && onError(e)
      }
    })
  } catch (e) {
    onError && onError(e)
  }
}

module.exports = readFiles
