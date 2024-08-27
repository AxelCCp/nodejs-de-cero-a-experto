import { LogEntity, LogSeverityLevel } from "../../domain/datasources/entities/log.entity";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import fs from 'fs';

//123
export class FileSystemDatasource implements LogDatasource {

    private readonly logPath = 'logs/'
    private readonly allLogsPath = 'logs/logs-all.log'
    private readonly mediumLogsPath = 'logs/logs-medium.log'
    private readonly highLogsPath = 'logs/logs-high.log'


    constructor() {
        this.createLogsFiles();
    }

    private createLogsFiles = () => {
        
        if(!fs.existsSync(this.logPath)) {
            fs.mkdirSync(this.logPath);
        }
        
        [
            this.allLogsPath,
            this.mediumLogsPath,
            this.highLogsPath
        ].forEach(path => {
            if(fs.existsSync(path)) return;                                             //si el allLogsPath existe,  no se hace nada, pero si existe , se crea.
            fs.writeFileSync(path, '');
        });
    }

    async saveLog(newLog: LogEntity): Promise<void> {
        const logAsJson = `${ JSON.stringify(newLog) }\n`
        fs.appendFileSync(this.allLogsPath, logAsJson);           //appendFileSync : este metodo va al archivo y agrega una linea al final.
        if(newLog.level === LogSeverityLevel.low) return;                               //si la severidad del log es low,  no se hace nada.
        if(newLog.level === LogSeverityLevel.medium) {
            fs.appendFileSync( this.mediumLogsPath, logAsJson);
        } else {
            fs.appendFileSync(this.highLogsPath, logAsJson);
        }
    }
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        
        switch(severityLevel) {
            case LogSeverityLevel.low:
                return this.getLogsFromFile(this.allLogsPath);
            
            case LogSeverityLevel.medium:
                return this.getLogsFromFile(this.mediumLogsPath);

            case LogSeverityLevel.high:
                return this.getLogsFromFile(this.highLogsPath);

            default:
                throw new Error (`${severityLevel} not implemented`);
        }
    }


    private getLogsFromFile = (path : string) : LogEntity[] => {
        const content = fs.readFileSync(path, 'utf-8');

        if(content === '') return[];

        const logs = content.split('\n').map(LogEntity.fromJson)                        //abreviatura del codigo comentado.
        /*const logs = content.split('\n').map(
            log => LogEntity.fromJson(log)
        );*/
        return logs;
    }

}