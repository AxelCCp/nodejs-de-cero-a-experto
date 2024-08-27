//35
//una funcion async es una funcion asincrona que regresa una promesa.

//forma 1 - promesas - async await - forma correcta -----------------------------------
/*
const getPokemonById = async(id) => {

    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

   const resp = await fetch ( url );                                                            // await: es un codigo bloqueante q bloquea el codigo hasta que se resuelva este fetch: fetch ( url ).

   const pokemon = await resp.json();

   return pokemon.name;
} 

module.exports = getPokemonById;
*/
//-------------------------------------------------------------------------------------


//36
//forma 2 -  promesas - async await - plugin client htttp - forma correcta ------------

const { httpClientPlugin } = require('../plugins');

const getPokemonById2 = async(id) => {

    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

    const pokemon =await httpClientPlugin.get(url)

    return pokemon.name;

} 

module.exports = getPokemonById2;

//-------------------------------------------------------------------------------------