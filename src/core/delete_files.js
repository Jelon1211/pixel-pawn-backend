const fs = require('fs');
const path = require('path');

const folderPath = './public/images';

exports.fileDelete = () => {
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error(err);
      return;
    }
    for (const file of files) {
      fs.unlink(path.join(folderPath, file), (err) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log(`${file} was deleted`);
      });
    }
  })
}