import { PrismaClient } from '@prisma/client';
import { envs } from './config/plugins/envs.plugin';
import { LogModel, MongoDataBase } from './data/mongo';
import { Server } from './presentation/server';
import 'dotenv/config'; // 131


//funcion autoinvocada
(async() => {
    main();
})();


async function main() {

    //MONGO-----------------
    await MongoDataBase.connect({mongoUrl : envs.MONGO_URL, dbName : envs.MONGO_DB_NAME});
    //-----------------MONGO
    
    //POSTGRES--------------
    const prisma = new PrismaClient();
    
    //SAVE-----
    /*
    const newLog = await prisma.logModel.create({
        data : {
            level : 'HIGH',
            message : 'test message',
            origin : 'App.ts'
        }
    });
    console.log(newLog)
    */
    //-----SAVE
  
    //READ-----
    const logs = await prisma.logModel.findMany();
    console.log(logs);

    console.log('-----------where----------');
    const logs2 = await prisma.logModel.findMany({
        where : {
            level : 'HIGH'
        }
    });
    console.log(logs2);
    //-----READ

    //--------------POSTGRES

    Server.start();
}