//113.un caso de uso es un código que está especializado en una tarea   

interface CheckServiceUseCase {
    execute( url : string ) : Promise<boolean>;
}

//115 - inyeccion dependencias

type SuccessCallback = () => void;
type ErrorCallback = (error : string) => void;

export class CheckService implements CheckServiceUseCase{


    constructor(private readonly successCallback : SuccessCallback, private readonly errorCallback : ErrorCallback) {}              //se usa readonly para no alterar los valores accidentalmente en la funcion.


    async execute(url : string) : Promise<boolean> {
        try {
            const req = await fetch(url);
            if(!req.ok) {
                throw new Error(`Error on check service ${url}`);
            }
            console.log(`El url... ${url} ...is ok!`);
            this.successCallback();
            return true;
        } catch(error) {
            console.log(`${error}`)
            this.errorCallback(`${error}`);
            return false;
        }
    }
}