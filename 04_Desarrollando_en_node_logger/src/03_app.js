//35

console.log('---35---//async await - forma correcta');

/*
const getPokemonById = require('./js-foundation/06-async-await');
getPokemonById(100)
    .then( (pokemon) => console.log( {pokemon} ))
    .catch( (err) => console.log('error ... por favor intente de nuevo...'))
    .finally( () => console.log('finalmente ...')); 
    */




console.log('---36-37---//async await - con plugin de cliente http - forma correcta');
const getPokemonById2 = require('./js-foundation/06-async-await');

getPokemonById2(31)
    .then( (pokemon) => console.log( {pokemon} ))
    .catch( (err) => console.log('error ... por favor intente de nuevo...'))
    .finally( () => console.log('finalmente htttp...')); 