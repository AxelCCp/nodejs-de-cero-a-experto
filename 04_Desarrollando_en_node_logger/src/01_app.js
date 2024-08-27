
console.log('---22---')
console.log('---hola desde app.js---');




console.log('---23---//sin des-estructuracion')
const templateExports = require('./js-foundation/01-template.js');              //sintaxis de importacion tradicional de modulos        
console.log(templateExports);
console.log(templateExports.emailTemplate);




console.log('---23---//con des-estructuracion')
const {emailTemplate} = require('./js-foundation/01-template.js');              //sintaxis de importacion tradicional de modulos           
console.log(emailTemplate);




console.log('---25---//obteniendo los procesos del pc')
require('./js-foundation/02-des-estructuracion.js');  

console.log('---25---//funciones callback');
require('./js-foundation/03-callbacks.js');  

const {getUserById} = require('./js-foundation/03-callbacks.js');  

const id = 2;
getUserById(id, function(error, user) {

    if(error){
        throw new Error(error , id);
    }
    console.log(user);
});




console.log('---29---//funciones factory');
require('./js-foundation/04-factory.js');  




console.log('---32---//funciones factory');
const { getAge, getUUID }  = require('./plugins');
const { buildMakePerson } = require('./js-foundation/04-factory.js');  

const makePerson = buildMakePerson( { getUUID, getAge } );
const obj = { name : 'John', birthdate : '1988-10-02' };
const john = makePerson(obj);
console.log(john);




