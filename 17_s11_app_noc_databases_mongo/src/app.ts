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
    
    //SAVE
    //crear coleccion = tables , documento = registro -----------------------------------------
    /*
    const newLog = await LogModel.create({
        message : 'test message from mongo',
        origin : 'App.ts',
        level : 'low'
    });    
    await newLog.save();
    console.log(newLog);
    */
    //-----------------------------------------------------------------------------------------
    

    //READ
    //-----------------------------------------------------------------------------------------
    const logs = await LogModel.find();
    console.log(logs);

    console.log('..........................................');

    console.log(logs[0].message);

    console.log('..........................................');

    console.log(logs[3]);




    //-----------------------------------------------------------------------------------------

    //Server.start();
}