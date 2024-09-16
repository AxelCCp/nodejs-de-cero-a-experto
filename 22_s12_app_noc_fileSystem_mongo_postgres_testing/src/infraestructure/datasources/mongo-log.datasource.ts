import { LogModel } from "../../data/mongo";
import { LogEntity, LogSeverityLevel } from "../../domain/datasources/entities/log.entity";
import { LogDatasource } from "../../domain/datasources/log.datasource";

export class MongoLogDatasource implements LogDatasource {

    async saveLog(log: LogEntity): Promise<void> {
        const newLog = await LogModel.create(log);
        console.log('mongo log created: ', newLog.id);
    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        const logs = await LogModel.find({
            level : severityLevel
        });

        return logs.map (mongoLog => LogEntity.fromObject(mongoLog));
    }

    
    
}