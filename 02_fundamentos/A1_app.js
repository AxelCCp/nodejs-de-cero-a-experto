
//13. filesystem

const fs = require('fs');

//lectura
const data = fs.readFileSync('README.md', 'utf-8');

console.log(data);

//modificacion - cambia todas las palabras 'react' por 'angular'
const newData = data.replace('/React/ig', 'Angular');                                   //ig:  keys insensitive

//escritura de nuevo archivo
fs.writeFileSync('README-ANGULAR.md', newData);

console.log('::::::::::::::::::::::archivo creado:::::::::::::::::::::::::')