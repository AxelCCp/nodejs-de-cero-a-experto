//113.un caso de uso es un código que está especializado en una tarea   

interface CheckServiceUseCase {
    execute( url : string ) : Promise<boolean>;
}

export class CheckService implements CheckServiceUseCase{

    async execute(url : string) : Promise<boolean> {
        try {
            const req = await fetch(url);
            if(!req.ok) {
                throw new Error(`Error on check service ${url}`);
            }
            console.log(`El url... ${url} ...is ok!`);
            return true;
        } catch(error) {
            console.log(`${error}`)
            return false;
        }
    }
}