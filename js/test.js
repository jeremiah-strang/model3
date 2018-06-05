const fs = require('fs')
const path = require('path')
const FOLDER = '/Users/jeremiahstrang/dev/model3/img'

fs.readdir(FOLDER, (err, files) => {
  for (let file of files) {
    let oldPath = FOLDER + path.sep + file
    let newPath = oldPath.replace(/_/g, '-')
    console.log(oldPath)
    console.log('  ' + newPath)
    fs.renameSync(oldPath, newPath)
  }
})
