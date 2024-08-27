// 31
// El uso de la librería externa de 3ros, se usa de esta manera,  para usar el patron adapter. 
// Si a futuro se cambia de librería, solo hay q cambiar el paquete y esto const getAgePlugin = require('get-age');    
/**  
 * https://www.npmjs.com/package/get-age
 * 
 *  npm install get-age
 */

const getAgePlugin = require('get-age');                                                      // esto viene de la librería de get-age.

const getAge = (birthdate) => {
    if(!birthdate) return new Error('the birthdate is requered');
    return getAgePlugin(birthdate);
}

module.exports = {
    getAge
}