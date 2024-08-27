//81
//usando yargs empiricamente
//ejercicio de tabla de multiplicar y creacion de archivo txt.

import fs from 'fs';
import { yarg } from './config/plugins/yars.plugin';

const {b:base, l:limit, s:showTable} = yarg; 

let outputMessagge = '';
const headerMessagge = `

=====================================
         Tabla del ${base}
=====================================\n

`;


for(let i=1; i<=limit; i++) {
    outputMessagge += `${ base } x ${ i } = ${base * i}\n`;
}

outputMessagge = headerMessagge + outputMessagge;

if(showTable){
    console.log(outputMessagge);
}

const outputPath = 'outputs'; 

fs.mkdirSync(outputPath, {recursive :true});                                                                       

fs.writeFileSync(`${outputPath}/tabla-${base}.txt`, outputMessagge);