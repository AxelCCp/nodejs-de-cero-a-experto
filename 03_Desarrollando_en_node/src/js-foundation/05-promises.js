//33.

//forma 1 - esta manera no es muy limpia ------------------------------------------
/*
const getPokemonById = (id) => {

    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

    fetch( url ).then( (response) => {

        response.json().then((pokemon) => {
            console.log(pokemon.name);
        });
        
    });
    //return 'pokemon';
} 
module.exports = getPokemonById;
*/
//---------------------------------------------------------------------------------



//forma 2 - codigo sucio con callback ----------------------------------------------
/*
const getPokemonById = (id, callback) => {

    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

    fetch( url ).then( (response) => {

        response.json().then((pokemon) => {

            callback(pokemon.name);
       
        });

        
    });
    //return 'pokemon';
} 
module.exports = getPokemonById;
*/
//---------------------------------------------------------------------------------


//34
//forma 3 - promesas en cadena y callback - forma correcta ------------------------
/*
const getPokemonById = (id, callback) => {

    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

    fetch( url )
    
        .then( (response) => {
            return response.json();
        })
        .then( (pokemon) => {
            callback ( pokemon.name );
        });

    //return 'pokemon';
} 

module.exports = getPokemonById;
*/
//---------------------------------------------------------------------------------



//forma 4 - promesas sin callback - forma correcta -----------------------------------
const getPokemonById = (id) => {

    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

    return fetch( url )
    
        .then( (response) => {
            return response.json();
        })
        .then( (pokemon) => {
            return pokemon.name;
        });

} 

module.exports = getPokemonById;
//---------------------------------------------------------------------------------