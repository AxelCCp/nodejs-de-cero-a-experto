import { LogEntity, LogSeverityLevel } from "../../domain/datasources/entities/log.entity";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogRepository } from "../../domain/repositories/log.repository";

export class LogRepositoryImpl implements LogRepository {

    constructor(private readonly logDatasource : LogDatasource) {
     }

    async saveLog(log: LogEntity): Promise<void> {
        this.logDatasource.saveLog(log);
    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        return this.logDatasource.getLogs(severityLevel);
    }
    
}