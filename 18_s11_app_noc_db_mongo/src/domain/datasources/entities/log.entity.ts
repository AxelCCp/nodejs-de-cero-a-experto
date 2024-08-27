export enum LogSeverityLevel {
    low = 'low',
    medium = 'medium',
    high = ' high',
}

export interface LogEntityOptions {
    level : string;
    message : string;
    createdAt? : Date;
    origin : string;
}

export class LogEntity {
 
    public level : string;
    public message : string;
    public createdAt : Date;
    public origin : string;

    constructor(options : LogEntityOptions){
        const { message, level, origin, createdAt = new Date() } = options;
        this.message = message;
        this.level = level;
        this.createdAt =createdAt;
        this.origin = origin;
    }

    static fromJson = (json : string) : LogEntity => {                   

        json = ( json === '') ? '{}' : json;
        const {message, level, createdAt} = JSON.parse(json);
        const log = new LogEntity({
            message : message,
            level : level,
            createdAt : createdAt,
            origin : origin 
        });

        return log;
    }

    static fromObject = ( object : {[key : string] : any}) => {             //recibe un obj que tiene una key de tipo string y el valor es any
        const {message, level, createdAt, origin} = object;
        const log = new LogEntity({message, level, createdAt, origin});
        return log;
    }
    
}