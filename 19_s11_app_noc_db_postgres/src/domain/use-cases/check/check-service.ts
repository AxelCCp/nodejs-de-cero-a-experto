//113.un caso de uso es un código que está especializado en una tarea   

import { LogEntity, LogSeverityLevel } from "../../datasources/entities/log.entity";
import { LogRepository } from "../../repositories/log.repository";

interface CheckServiceUseCase {
    execute( url : string ) : Promise<boolean>;
}

type SuccessCallback = () => void | undefined;
type ErrorCallback = (error : string) => void | undefined;

export class CheckService implements CheckServiceUseCase{


    constructor(private readonly logRepository : LogRepository,
                private readonly successCallback : SuccessCallback,
                private readonly errorCallback : ErrorCallback) {}

    async execute(url : string) : Promise<boolean> {
        try {
            const req = await fetch(url);
            if(!req.ok) {
                throw new Error(`Error on check service ${url}`);
            }
            const log = new LogEntity(
                { 
                    message : `Service ${url} working`,
                    level : LogSeverityLevel.low,
                    origin : 'check-service.ts'
                });
            this.logRepository.saveLog(log);
            this.successCallback && this.successCallback();                                         //129 como devuelve esto "void | undefined" se debe usar el "&&" para preguntar si el successCallback existe.  <<si el successCallback existe, y lo mandas a llamar>>
            return true;
        } catch(error) {
            const errorMessage = `${url} is not ok!... ${error}`;
            const log = new LogEntity(
                {
                    message : errorMessage,
                    level : LogSeverityLevel.high,
                    origin : 'check-service.ts'
                }
            );
            this.logRepository.saveLog(log);
            this.errorCallback && this.errorCallback(errorMessage);                                //129 como devuelve esto "void | undefined" se debe usar el "&&" para preguntar si el errorCallback existe.  <<si el errorCallback existe, y lo mandas a llamar>>
            return false;
        }
    }
}