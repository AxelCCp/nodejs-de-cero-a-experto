//84 - 85
import fs from 'fs';

export interface SaveFileUseCase {
    execute : (options : SaveFileOptions) => boolean;
}


export interface SaveFileOptions {
    fileContent : string;
    destination? : string;
    fileName? : string;
    fileDestination : string;
}

export class SaveFile implements SaveFileUseCase {
    constructor() {
        /**
         * storage repository
         */
    }

    execute( {fileContent, fileDestination='outputs', fileName='table'} : SaveFileOptions) : boolean {

        try{
            const outputPath = fileDestination;
            fs.mkdirSync(outputPath, {recursive :true});                                                                    
            fs.writeFileSync(`${fileDestination}/${fileName}.txt`, fileContent);
            console.log('file created');
            return true;
        }catch(error){
            console.error(error);
            return false;
        }
        
    }
}