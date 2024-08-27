//74 - 75
//ejercicio de tabla de multiplicar y creacion de archivo txt.


import fs from 'fs';

let outputMessagge = '';

const base = 5;
const headerMessagge = `

=====================================
         Tabla del ${base}
=====================================\n

`;


for(let i=1; i<=10; i++) {
    outputMessagge += `${ base } x ${ i } = ${base * i}\n`;
}

outputMessagge = headerMessagge + outputMessagge;

console.log(outputMessagge);

const outputPath = 'outputs'; 

fs.mkdirSync(outputPath, {recursive :true});                                        //recursive :true ---> si esta ruta "outputPath" tuviera mas de un directorio consecutivo, crea todas las carpetas de la ruta.                                

fs.writeFileSync(`${outputPath}/tabla-${base}.txt`, outputMessagge);