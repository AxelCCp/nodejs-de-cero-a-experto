//82
import { yarg } from './config/plugins/yars.plugin';
import { ServerApp } from './presentation/server-app';

(async () => {
    await main();
})();

async function main() {
    const { b : base, l : limit, s : showTable, n : fileName, d : fileDestination } = yarg;

    ServerApp.run( {base, limit, showTable, fileName, fileDestination} ); 
}


//npx ts-node src/app.ts --base 8 -s

//npx ts-node src/app.ts -d "xxxx/ccc"  --base 12 -n table777