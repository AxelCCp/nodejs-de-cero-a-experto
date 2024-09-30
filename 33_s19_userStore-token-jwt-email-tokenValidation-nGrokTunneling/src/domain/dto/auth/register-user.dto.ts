import { regularExps } from "../../../config";

//265
export class RegisterUserDto {

    private constructor(
        public name : string,
        public email : string,
        public password : string,
    ) {}

    static create(object : {[key : string] : any} ) : [string?, RegisterUserDto?] {

        const { name, email, password } = object;

        if(!name) return ['Missing name', undefined];

        if(!email) return ['Missing email', undefined];

        if(!regularExps.email.test(email)) return ['Email is not valid'];                   //el undefined del 2do argumento "[ , }" no es necesario ponerlo, ya que si no se pone, es por defecto undefined.

        if(!password) return ['missing password'];

        if(password.length < 6) return ['Password too short'];

        return [undefined, new RegisterUserDto(name, email, password)];
    }

}