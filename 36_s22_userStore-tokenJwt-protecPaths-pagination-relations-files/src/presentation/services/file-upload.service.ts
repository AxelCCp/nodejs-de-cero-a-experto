import { UploadedFile } from "express-fileupload";
import path from 'path';
import fs from 'fs';
import { Uuid } from "../../config";
import { CustomError } from "../../domain";


export class FileUploadService {

    constructor(private readonly uuid = Uuid.v4) {}

    private checkFolder(folderPath : string) {
        if(!fs.existsSync(folderPath)) {                        //pregunta si existe la ruta y la carpeta, sino existe la crea.
            fs.mkdirSync(folderPath)
        }
    }

    public async uploadSingle(
        file : UploadedFile,
        folder : string = 'uploads',
        validExtensions : string[] = ['png', 'jpg', 'jpeg', 'gif'],
    ) {
        
        try {
            
            const fileExtension = file.mimetype.split('/').at(1) ?? '';                             //esta wea es como un operador ternario.      

            if(!validExtensions.includes(fileExtension)) {
                throw CustomError.badRequest(`Invalid extension: ${fileExtension}, valid ones ${validExtensions}`);
            }

            const destination = path.resolve(__dirname, '../../../', folder);                       //318 min 3.
            this.checkFolder(destination);
            
            
            //form 1
            //file.mv(destination + `/mi-imagen.${fileExtension}`);                                 //guarda el archivo.
        
            //forma 2 con uuid 
            const fileName = `${this.uuid()}.${fileExtension}`;
            file.mv(`${destination}/${fileName}`);

            return {fileName};
        
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    public uploadMultiple(
        file : any[],
        folder : string = 'uploads',
        validExtensions : string[] = ['png', 'jpg', 'jpeg', 'gif'],
    ) {}

}