//14

const fs = require('fs');

//lectura
const content = fs.readFileSync('README.md', 'utf-8');

console.log('---------crea un array de palabras y muestra longitud-----------');
const words = content.split(' ');
console.log('palabras: ' + words.length);


console.log('---------encontrar palabras react en el archivo-----------------');

console.log('---con filter---');
const reactCountWords = words.filter(w => w.toLowerCase() === 'react').length;
console.log('palabras react: ' + reactCountWords);

console.log('---con filter e includes---');
const reactCountWords2 = words.filter(w => w.toLowerCase().includes('react')).length;
console.log('palabras react: ' + reactCountWords2);

console.log('---con expresion regular---');
const reactCountWords3 = content.match(/react/gi ?? []).length;                   //ig: keys insensitive        //?? [] : si no encuentra nada, devuelve un arreglo vacio.

