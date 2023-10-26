const sharp = require('sharp')
const path = require('path')

exports.resizeFN = (file_name, width, img_quality) => {
const inputFile = path.join('public', 'images', file_name)

sharp(inputFile)
  .resize(width)
  .toFormat('png', { quality: img_quality })
  .toFile(`${inputFile}-compressed.png`, (err, info) => {
    if (err) {
      console.error(err)
    } else {
      console.log('Image resized and compressed')
    }
  });
}