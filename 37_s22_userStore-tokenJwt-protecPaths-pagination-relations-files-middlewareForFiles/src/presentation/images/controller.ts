
import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

export class ImageController {
    
    constructor() {}

    // localhost:3000/api/images/users/5c182adf-49c0-4996-b4a5-f1b0cfd5caa9.jpeg
    getImage = (req : Request, res : Response) => {

        const { type = '', img = '' } = req.params;

        const imagePath = path.resolve(__dirname, `../../../uploads/${type}/${img}`);           //324 min 3.20

        console.log(imagePath);

        if(!fs.existsSync(imagePath)) {
            return res.status(404).send('image not found');
        }

        res.sendFile(imagePath);
    }
}