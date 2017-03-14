const fs = require('fs')

let files = fs.readdirSync('./public')
let htmlFiles = files.filter((file) => /\.html$/.test(file))

const jquery = 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.2/jquery-ui.min.js'
const replaceJquery = './js/juqery-ui.js'

htmlFiles.forEach((file) => {
  file = './public/' + file
  let buf = fs.readFileSync(file)
  let index = buf.indexOf(jquery)

  if (index >= 0) {
    buf = buf.toString().replace(jquery, replaceJquery)
    fs.writeFileSync(file, buf)
  }
})

