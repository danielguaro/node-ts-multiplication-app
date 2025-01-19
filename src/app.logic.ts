import fs from 'fs';
import { yarg } from './config/plugins/yargs.plugin';

const { b: base, l: limit, s: showTable } = yarg;

let outputMessage = '';
const headerMessage = `
  ====================
      Tabla del ${base}
  ====================\n
`;

for (let i = 1; i <= limit; i++) {
	outputMessage += `${base} X ${i} = ${base * i}\n`;
}
outputMessage = headerMessage + outputMessage;
const outputPath = 'outputs';

if (showTable) console.log(outputMessage);

fs.mkdirSync(outputPath, { recursive: true }); // Para que cree la carpeta es necesario el recursive:true
fs.writeFileSync(`${outputPath}/tabla-${base}.txt`, outputMessage);
console.log('File created!');
