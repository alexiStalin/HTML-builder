const fs = require('fs');
const path = require('path');

function copyFolder() {
   fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, (err) => {
      if (err) throw err;
      console.log('Папка успешно создана');
   });

   fs.readdir(
      path.join(__dirname, 'files'),
      { withFileTypes: true },
      (err, files) => {
         if (err) throw err;
         files.forEach((file) => {
            fs.copyFile(
               path.join(__dirname, 'files', file.name),
               path.join(__dirname, 'files-copy', file.name),
               (err) => {
                  if (err) throw err;
                  console.log('Файл успешно скопирован');
               }
            );
         });
      }
   );
}
copyFolder();
