// esto es una serie de procesos que se van a ejecutar antes de levantar la app

import {config} from 'dotenv';

//171 - se le dice a jest , que cuando levante la app,  ejecute primero este archivo.
//en "jest.config.ts" hay q configurar el setupFiles: [] que está comentado.
config({
    path : '.env.test'
});