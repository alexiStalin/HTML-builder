const fs = require('fs');
const path = require('path');

function createFolder(folderName) {
   fs.mkdir(path.join(__dirname, folderName), (err) => {
      if (err) return;
      // console.log('Папка успешно создана');
   });
}

createFolder('project-dist');

function createBundleHTML() {
   fs.readFile(path.join(__dirname, 'template.html'), 'utf-8', (err, data) => {
      let text = data;
      let textPaste;
      fs.readdir(
         path.join(__dirname, 'components'),
         { withFileTypes: true },
         (err, files) => {
            files.forEach((file) => {
               fs.readFile(
                  path.join(__dirname, 'components', file.name),
                  'utf-8',
                  (err, dataPaste) => {
                     textPaste = dataPaste;
                     text = text.replace(
                        `{{${path.parse(file.name).name}}}`,
                        `\n${textPaste}`
                     );
                     fs.writeFile(
                        path.join(__dirname, 'project-dist', 'index.html'),
                        text,
                        (err) => {
                           if (err) throw err;
                        }
                     );
                  }
               );
            });
         }
      );
   });
}

createBundleHTML();

function createBundleCSS() {
   fs.createWriteStream(
      path.join(__dirname, 'project-dist', 'style.css'),
      'utf-8'
   );
   fs.readdir(
      path.join(__dirname, 'styles'),
      { withFileTypes: true },
      (err, files) => {
         if (err) throw err;
         files.forEach((file) => {
            fs.stat(path.join(__dirname, 'styles', file.name), (err, stats) => {
               if (err) {
                  console.error(err);
                  return;
               }
               if (file.isFile()) {
                  if (path.extname(file.name.toString()).slice(1) === 'css') {
                     fs.readFile(
                        path.join(__dirname, 'styles', file.name),
                        (err, data) => {
                           fs.appendFile(
                              path.join(__dirname, 'project-dist', 'style.css'),
                              data,
                              (err) => {
                                 if (err) {
                                    console.error(err);
                                    return;
                                 }
                              }
                           );
                        }
                     );
                  }
               }
            });
         });
      }
   );
}
createBundleCSS();

function copyFolder() {
   fs.mkdir(
      path.join(__dirname, 'project-dist', 'assets'),
      { recursive: true },
      (err) => {
         if (err) throw err;
         //console.log('Папка успешно создана');
      }
   );

   fs.readdir(
      path.join(__dirname, 'assets'),
      { withFileTypes: true },
      (err, files) => {
         files.forEach((file) => {
            if (!file.isFile()) {
               let fileName = file.name;
               fs.mkdir(
                  path.join(__dirname, 'project-dist', 'assets', fileName),
                  (err) => {
                     if (err) return;
                     // console.log('Папка успешно создана');
                  }
               );

               fs.readdir(
                  path.join(__dirname, 'assets', fileName),
                  { withFileTypes: true },
                  (err, files) => {
                     files.forEach((file) => {
                        if (file.isFile()) {
                           fs.copyFile(
                              path.join(
                                 __dirname,
                                 'assets',
                                 fileName,
                                 file.name
                              ),
                              path.join(
                                 __dirname,
                                 'project-dist',
                                 'assets',
                                 fileName,
                                 file.name
                              ),
                              (err) => {
                                 if (err) throw err;
                                 // console.log('Файл успешно скопирован');
                              }
                           );
                           // console.log(fileName);

                           // console.log(file.name);
                        }
                     });
                  }
               );
            }
         });
      }
   );
}

copyFolder();
