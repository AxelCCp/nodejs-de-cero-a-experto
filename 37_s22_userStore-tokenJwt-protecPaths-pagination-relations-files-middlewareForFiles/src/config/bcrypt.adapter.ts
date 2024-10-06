import { compareSync, genSaltSync, hashSync } from 'bcryptjs';              //   npm i --save-dev @types/bcryptjs

//268
export const bcryptAdapter = {

    //el metodo hash es para recibir la contraseña y encriptarla.
    hash : (password : string) => {

        const salt = genSaltSync();                                         //metodo q encripta.

        return hashSync(password, salt);

    },

    //compara la password con la contraseña encriptada.
    compare : (password : string, hashed : string) => {

        return compareSync(password, hashed);

    }

}