import { Server } from './presentation/server';

//funcion autoinvocada
(async() => {
    main();
})();

function main() {
    Server.start();
}