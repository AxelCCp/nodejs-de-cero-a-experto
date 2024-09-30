import jwt from 'jsonwebtoken';
import { envs } from './envs';


const JWT_SEED = envs.JWT_SEED;

export class JwtAdapter {

    static async generateToken(payload : any, duration : string = '2h') {                                         //duracion por defecto de 2 horas

        return new Promise((resolve => {

            //SEED . SEMILLA CON LA CUAL SE VAN A FIRMAR LOS TOKEN.
            jwt.sign(payload, JWT_SEED, {expiresIn : duration}, (err, token) => {

                if(err) return resolve(null);
                
                return resolve(token);

            });

        }));
        
    }


    static validateToken<T>(token : string) : Promise<T | null> {                      // (validateToken<T>) si se recibe un tipo T, se devuelve una promesa de T (Promise<T> | null), pero si lo hace mal devulve null.
        
        return new Promise( (resolve) => {
            
            jwt.verify(token, JWT_SEED, (err, decoded) => {
                   
                if(err) return resolve(null);                       //la promesa siempre se resuelve de manera exitosa. si hay error resuelve null.
                
                resolve(decoded as T);                                   //si esta ok, resuelve la promesa con el decoded que es el payload del generateToken().
            });

        });
        
    }

}

