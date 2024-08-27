//77
//argument values , con la librería YARGS
//https://www.npmjs.com/package/yargs
//comando : npm i yargs


/* forma 1 para importar
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
*/

//forma 1 para importar
import yargs, {options} from 'yargs';
import {hideBin} from 'yargs/helpers';

//export sin opciones de configuracion:
//export const yarg = yargs(process.argv).parseSync();


//79
//export con opciones de configuracion:
export const yarg = yargs(hideBin(process.argv))

.option('b', {
    alias : 'base',
    type : 'number',
    demandOption : true,
    describe : 'multiplication table base'
})
.option('l',{
    alias : 'limit',
    type : 'number',
    default : 10,
    describe : 'multiplication table limit'
})
.option('s', {
    alias : 'show',
    type : 'boolean',
    default : 'false',
    describe : 'show mult table'
})
//80 - validaciones
//.check( (argv, options) => {
   
    //console.log({argv, options});
    //if(argv.b < 1) throw new Error('Error : (argv.b < 1)');
    //throw new Error('Error : ... . . . . ');
//})

.parseSync();


