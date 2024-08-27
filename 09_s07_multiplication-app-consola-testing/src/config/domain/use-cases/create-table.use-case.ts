//84

export interface CreateTableUseCase {
    execute : ( options : CreateTableOptions ) => string;                       //define el return del metodo string. define el tipo de las options en una nueva interfaz CreateTableOptions.
}

export interface CreateTableOptions {
    base : number;
    limit? : number         // ? : quiere decir que no es obligatorio.
}

export class CreateTable implements CreateTableUseCase {
    constructor() {
        /*
            permite la inyeccion de dependencias
        */
    }

    execute( { base, limit=10 } :  CreateTableOptions ) {
        let outputMessagge = '';
        for(let i=1; i<=limit; i++) {
            outputMessagge += `${ base } x ${ i } = ${base * i}`;
            if(i < limit) outputMessagge += '\n';
        }
        return outputMessagge;
    }
}