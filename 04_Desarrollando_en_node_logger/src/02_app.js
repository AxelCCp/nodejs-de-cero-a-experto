
console.log('---33---//promesas');
const getPokemonById = require('./js-foundation/05-promises');
//forma 1
/*
console.log(getPokemonById(1));
*/

//forma 2
/*
getPokemonById(3, (pokemon) => {
    console.log({pokemon});
});
*/

//forma 3 - forma correcta con promesas y callback
/*
getPokemonById(3, (pokemon) => {
    console.log({pokemon});
});
*/


//forma 4 - forma correcta con promesas y sin callback
getPokemonById(200)
    .then( (pokemon) => console.log( {pokemon} ))
    .catch( (err) => console.log('error ... por favor intente de nuevo...'))
    .finally( () => console.log('finalmente ...')); 