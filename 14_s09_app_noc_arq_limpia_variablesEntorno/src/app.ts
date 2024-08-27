import { envs } from './config/plugins/envs.plugin';
import { Server } from './presentation/server';
import 'dotenv/config'; // 131


//funcion autoinvocada
(async() => {
    main();
})();


function main() {
    //Server.start();

    //131
    //SIN EL PLUGIN  DE ENV-VAR DE VALIDACION
    //console.log(process.env);
    console.log({email : process.env.MAILER_EMAIL});
    console.log({key : process.env.MAILER_SECRET_KEY});
    console.log({port : process.env.PORT});

    //CON EL PLUGIN  DE ENV-VAR DE VALIDACION
    console.log(envs.MAILER_EMAIL);
    console.log(envs.MAILER_SECRET_KEY);
    console.log(envs.PORT);
}