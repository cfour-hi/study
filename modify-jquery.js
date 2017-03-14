const fs = require('fs')

let files = fs.readdirSync('./public')
let htmlFiles = files.filter((file) => /\.html$/.test(file))

const jquery = 'http://libs.baidu.com/jquery/2.0.0/jquery.min.js'
const replaceJquery = './js/jQuery-2.1.4.js'

htmlFiles.forEach((file) => {
  file = './public/' + file
  let buf = fs.readFileSync(file)
  let index = buf.indexOf(jquery)

  if (index >= 0) {
    buf = buf.toString().replace(jquery, replaceJquery)
    fs.writeFileSync(file, buf)
  }
})

