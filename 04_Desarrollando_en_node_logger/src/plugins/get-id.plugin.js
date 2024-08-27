//31
/**
 * instalacion de paquetes
 * https://www.npmjs.com/package/uuid
 * 
 *  npm install uuid
 * 
 */

const { v4: uuidv4 } = require('uuid');                                                 // esto viene de la librería de uuid. llega un valor v4 y lo renombra a uuidv4.

const getUUID = () => {
    return uuidv4();
}

module.exports = {
    getUUID,
}