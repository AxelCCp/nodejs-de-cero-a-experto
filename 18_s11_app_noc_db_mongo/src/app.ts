import { envs } from './config/plugins/envs.plugin';
import { LogModel, MongoDataBase } from './data/mongo';
import { Server } from './presentation/server';
import 'dotenv/config'; // 131


//funcion autoinvocada
(async() => {
    main();
})();


async function main() {

    await MongoDataBase.connect({mongoUrl : envs.MONGO_URL, dbName : envs.MONGO_DB_NAME});
    
    Server.start();
}