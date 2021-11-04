const fs = require('fs');
const path = require('path');

fs.readdir(
   path.join(__dirname, 'secret-folder'),
   { withFileTypes: true },
   (err, files) => {
      files.forEach((file) => {
         fs.stat(
            path.join(__dirname, 'secret-folder', file.name),
            (err, stats) => {
               if (err) {
                  console.error(err);
                  return;
               }
               if (file.isFile()) {
                  console.log(
                     `${path.parse(file.name).name} - ${path
                        .extname(file.name.toString())
                        .slice(1)} - ${stats.size}b`
                  );
               }
            }
         );
      });
   }
);
