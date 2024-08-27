//27
const users = [

    {
        id : 1,
        name : 'john doe',
    },
    {
        id : 2,
        name : 'jane doe',
    }

];


function getUserById( id, callback ) {                  //callback : es la funcion q se quiere ejectar cuando ya se haya resolvido el codigo al interior de getUserById() 
    
    //const user = users.find(u => u.id === id);

    const user = users.find(function(user){
        return user.id === id;
    });
    
    
    if( !user ) {
        return callback(`USUARIO NO ENCONTRADO CON ID: ${id}`);
    }

    return callback(null, user);

}


//28. funciones de flecha

//funcion de flecha
/*
const getUserById = ( id, callback ) => { 
    
    const user = users.find((user) => {
        return user.id === id;
    });
    
    if( !user ) return callback(`USUARIO NO ENCONTRADO CON ID: ${id}`);
    
    return callback(null, user);
}
*/
/*
const getUserById = ( id, callback ) => { 
    
    const user = users.find((user) => {
        return user.id === id;
    });
    
    ( user ) ? callback(null, user) : callback(`USUARIO NO ENCONTRADO CON ID: ${id}`);    
}
*/




module.exports = {
    getUserById
}

