//29
//factory functions : es una funcion q crea otra funcion.
/**
                 const makeBuildPerson = () => {
                    
                    return () => {

                        return{

                        }
                    }
                }
 */


/** -----------------------------------------------------------------
 * instalacion de paquetes
 * https://www.npmjs.com/package/uuid
 * 
 *  npm install uuid
 * 
 * https://www.npmjs.com/package/get-age
 * 
 *  npm install get-age
 */ //---------------------------------------------------------------


 //:::::::::::::::::::::::::::::::::::::::::::::::::: FORMA 1 ... :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

//importaciones individuales: ---------------------------------------
//OK    //const { getUUID }  = require('../plugins/get-id.plugin');
//OK    //const { getAge }  = require('../plugins/get-age.plugin');                               //get-age.plugin : esto devuelve un obj, es por eso se que se desestructura { getAge } , para obtener la funcion.
//-------------------------------------------------------------------


//importacion con index.js ------------------------------------------
//OK    //const { getAge, getUUID }  = require('../plugins');
//-------------------------------------------------------------------


//codigo ok----------------------------------------------------------
/*const buildPerson = ({name, birthdate}) => {

    return {
        id :  getUUID(),            //new Date().getTime(),
        name : name,
        birthdate : birthdate,
        age : getAge(birthdate)    //new Date().getFullYear() - new Date(birthdate).getFullYear(),
    }

}

const obj = { name : 'John', birthdate : '1988-10-02' };
const john = buildPerson( obj );
console.log(john);


module.exports = {
    buildPerson,
}

*///------------------------------------------------------------------

 //:::::::::::::::::::::::::::::::::::::::::::::::::::: ... FORMA 1:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

 //:::::::::::::::::::::::::::::::::::::::::::::::::: FORMA 2 ... :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::


//32. codigo ok - con factory - se usa app.js - y con una funcion se manda otra funcion ------------------------

//funcion
const buildMakePerson = ({getUUID, getAge}) => {
    //funcion
    return ({name, birthdate}) => {

        return {
            id :  getUUID(),            
            name : name,
            birthdate : birthdate,
            age : getAge(birthdate)    
        }
    
    }

}



module.exports = {
    buildMakePerson,
}
//-------------------------------------------------------------------



