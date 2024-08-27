//78

//funcion anonima autoinvocada
(() => {
    console.log('ejecutado ...');
}) ();


//funcion anonima autoinvocada asincrona
(async() => {
    console.log('ejecutado asincrona...');
}) ();


//funcion anonima autoinvocada asincrona llamando al main que devuelve una promesa

import { yarg } from './config/plugins/yars.plugin';

(async() => {
    await main();
}) ();

async function main() {
    console.log('main ejecutado...');
    console.log(yarg);
}