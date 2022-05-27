/* eslint-disable */
const flatten = require('./flatten')
const readFiles = require('./readFiles')

function getReferenceData(path) {
  const referenceData = {}

  readFiles(path, (filename, content) => {
    filename = filename.replace('.', '__dot__')

    referenceData[String(filename)] = flatten(JSON.parse(content))
  })

  return referenceData
}

module.exports = getReferenceData
