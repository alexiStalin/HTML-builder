const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { stdin: input, stdout: output } = require('process');

const rl = readline.createInterface({ input, output });

let writeStream = fs.createWriteStream(
   path.join(__dirname, 'text.txt'),
   'utf-8'
);

rl.question('Введите текст: ', (answer) => {
   writeStream.write(answer);
   writeStream.write('\n');
});

rl.on('line', (input) => {
   if (input === 'exit') {
      process.stdout.write('Всего хорошего! До свидания');
      rl.pause();
   } else {
      writeStream.write(input);
      writeStream.write('\n');
   }
});

rl.on('SIGINT', () => {
   process.stdout.write('Всего хорошего! Досвидания');
   rl.pause();
});
