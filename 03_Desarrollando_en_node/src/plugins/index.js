//31
//este es un archivo de barril, se si es que tenemos muchos plugins y desde aqui podemos exportar todos y luego en el otro archivo solo se importa el index.js.
//debe llamarse index.js.

const { getUUID }  = require('../plugins/get-id.plugin');
const { getAge }  = require('../plugins/get-age.plugin');  
const { httpClientPlugin }  = require('../plugins/http-client');  

module.exports = {
    getAge,
    getUUID,
    httpClientPlugin,
}