import { PrismaClient, SeverityLevel } from "@prisma/client";
import { LogEntity, LogSeverityLevel } from "../../domain/datasources/entities/log.entity";
import { LogDatasource } from "../../domain/datasources/log.datasource";

const prismaClient = new PrismaClient();

const severityEnum = {
    low : SeverityLevel.LOW,
    medium : SeverityLevel.MEDIUM,
    high : SeverityLevel.HIGH,
}

export class PostgresLogDatasource implements LogDatasource {

    async saveLog(log : LogEntity) : Promise<void> {
        const level = severityEnum['high'];
        const newLog = await prismaClient.logModel.create({
            data: {
                ...log,
                level : level
            }
        });
        console.log('postgres saved ... ')
    }
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        const level = severityEnum[severityLevel];
        const dbLogs = await prismaClient.logModel.findMany({
            where : {
                level : level
            }
        });
        return dbLogs.map(dbLog => LogEntity.fromObject(dbLog));
    }
    
}