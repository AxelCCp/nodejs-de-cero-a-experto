//82
//esta es una clase para mantener estructurada la logica del servidor.

import { CreateTable } from "../config/domain/use-cases/create-table.use-case";
import { SaveFile } from "../config/domain/use-cases/save-file-use-case";

interface RunOptions {
    base : number;
    limit : number;
    showTable : boolean;
    fileName : string;
    fileDestination : string; 
}

export class ServerApp {

    static run( {base, limit, showTable, fileName, fileDestination} : RunOptions) {
        console.log('Server run');
        const table = new CreateTable().execute( {base, limit} );
        const wasCreated = new SaveFile().execute( {fileContent : table, fileDestination : fileDestination, fileName : fileName} );
        if(showTable) console.log(table);
        wasCreated ? console.log('archivo creado') : console.error('el archivo no se creó');
    }

}


