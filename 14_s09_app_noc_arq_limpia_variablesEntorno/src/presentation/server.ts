import { CheckService } from '../domain/use-cases/check/check-service';
import { FileSystemDatasource } from '../infraestructure/datasources/file-system.datasources';
import { LogRepositoryImpl } from '../infraestructure/repositories/log.repository.impl';
import { CronService } from './cron/cron-service';


const fileSystemLogRepository = new LogRepositoryImpl(new FileSystemDatasource());

export class Server {

    public static start() {

        console.log('Server started...');
        
    //codigo ok ... ------------------------------------------
        
    //    CronService.createJob1();

        //CronService.createJob2('*/3 * * * * *',
    /*    () => {
            const date = new Date();
            console.log('3 seconds X --- ', date);
        });
    */    
        //CronService.createJob2('*/4 * * * * *', 
    /*    () => {
            const date = new Date();
            console.log('4 seconds Y --- ', date);
        });
    */    
        //CronService.createJob2('*/5 * * * * *', 
    /*    () => {
            const date = new Date();
            console.log('5 seconds Z --- ', date);
        });
    */  
   
    // ... codigo ok ------------------------------------------
    

    //113    
    CronService.createJob2('*/5 * * * * *', 
        () => {
            const url = 'https://google.com';
            new CheckService(
                fileSystemLogRepository,
                () => console.log(`${url} is ok`),
                (error) => console.log(error),
            ).execute(url);
        });
    
    }
}