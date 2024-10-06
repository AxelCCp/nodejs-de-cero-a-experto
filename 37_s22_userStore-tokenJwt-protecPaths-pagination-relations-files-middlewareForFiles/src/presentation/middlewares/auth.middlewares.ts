import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../config";
import { error } from "console";
import { UserModel } from "../../data";
import { UserEntity } from "../../domain";

//294
export class AuthMiddleware {

    static async validateJwt(req : Request, res : Response, next : NextFunction) {
        
        const authorization = req.header('Authorization');

        if(!authorization) return res.status(401).json({error : 'No token provider'});

        if(!authorization.startsWith('Bearer ')) return res.status(401).json({error : 'invalid bearer token'});
        
        const token = authorization.split(' ').at(1) || '';
        
        try {
            const payload = await JwtAdapter.validateToken<{id : string}>(token);
            if(!payload) return res.status(401).json({error : 'invalid token'});
            const user = await UserModel.findById(payload.id);
            if(!user) return res.status(401).json({error : 'invalid token - user'});
            req.body.user = UserEntity.fromObject(user);                                            //carga el usuario en el body, tambn podría ir en header.
                                                                                               //si todo anda bien con la carga de usuario, se llama al next(). 
        } catch (error) {
            console.log(error);
            res.status(500).json({error : 'Server internal error'});
        }

        next();
    }

}