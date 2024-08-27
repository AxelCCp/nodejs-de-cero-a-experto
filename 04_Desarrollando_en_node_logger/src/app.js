//42

console.log('---42---//usando logger winston');

const { buildLogger } = require('./plugins');                      //te traes la function.

const logger = buildLogger('app.js');                              //nombre del archivo desde donde se está mandando a llamar.

logger.log('hola ..... !!!');

logger.error('error ..... !!!')