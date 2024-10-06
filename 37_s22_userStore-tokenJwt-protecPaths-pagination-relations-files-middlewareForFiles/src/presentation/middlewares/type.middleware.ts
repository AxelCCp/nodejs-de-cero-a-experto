import { NextFunction, Request, Response } from "express";

//323
export class TypeMiddleware {

    //se regresa una funcion dentro de otra funcion. es un metodo que crea una funcion.
    static validTypes(validTypes : string[]) {

        return (req : Request, res : Response, next : NextFunction) => {

            //const type = req.params.type;         //con esto el type llega undefined, por una wea del express.

            const type = req.url.split('/').at(2) ?? '';                ///multiple/products  -----> [multiple , products]

            if(!validTypes.includes(type)) {
                return res.status(400).json({error : `invalid type : ${type}, valid ones ${validTypes}`});
            }

            next();

        };

    }

}