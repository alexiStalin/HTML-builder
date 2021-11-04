const fs = require('fs');
const path = require('path');

function createBundleCSS() {
   fs.createWriteStream(
      path.join(__dirname, 'project-dist', 'bundle.css'),
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
                              path.join(
                                 __dirname,
                                 'project-dist',
                                 'bundle.css'
                              ),
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
