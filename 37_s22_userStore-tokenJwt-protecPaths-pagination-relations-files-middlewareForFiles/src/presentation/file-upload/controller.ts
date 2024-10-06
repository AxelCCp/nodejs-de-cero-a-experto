import { Request, Response } from "express";
import { CustomError } from "../../domain";
import { FileUploadService } from "../services/file-upload.service";
import { error } from "console";
import { UploadedFile } from "express-fileupload";



export class FileUploadController {

    constructor(private readonly fileUploadService : FileUploadService) {}

    private handleError = (error : unknown, res : Response) => {
        
        if(error instanceof CustomError) {
            return res.status(error.statusCode).json({error : error.message});
        }
        console.log(`${error}`);
        return res.status(500).json({error : 'Internal server error'});
    }


    //forma 1
    //sin ruta adicional de carpeta
    // POST - localhost:3000/api/upload/single/users
    /*
    uploadFile = (req : Request, res : Response) => {

        const files = req.files;

        if(!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({error : 'No files were selected'});
        }

        const file = req.files.file as UploadedFile;                //318 - trata el file como un UploadedFile

        this.fileUploadService.uploadSingle(file)
                                .then(uploaded => res.json(uploaded))
                                .catch(error => this.handleError(error, res));
    }
    */


    // forma 2
    //guarda el archivo en una carpeta especificada
    //POST - 
    uploadFile = (req : Request, res : Response) => {

        const type = req.params.type;

        const file = req.body.files.at(0) as UploadedFile;                //321 - min 4.50

        this.fileUploadService.uploadSingle(file, `uploads/${type}`)
                                .then(uploaded => res.json(uploaded))
                                .catch(error => this.handleError(error, res));
    }

    //localhost:3000/api/upload/multiple/products
    uploadMultipleFiles = (req : Request, res : Response) => {

        const type = req.params.type;

        const files = req.body.files as UploadedFile[];               

        this.fileUploadService.uploadMultiple(files, `uploads/${type}`)
                                .then(uploaded => res.json(uploaded))
                                .catch(error => this.handleError(error, res));
        
    }
    

}