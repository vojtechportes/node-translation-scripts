/* eslint-disable */
const fs = require('fs')
const path = require('path')

function getDirectories(folderPath) {
  const directories = []

  if (fs.existsSync(folderPath)) {
    fs.readdirSync(folderPath).forEach(file => {
      const curPath = path.join(folderPath, file)
      if (fs.lstatSync(curPath).isDirectory()) {
        directories.push(curPath)
      }
    })
  }

  return directories
}

module.exports = getDirectories
