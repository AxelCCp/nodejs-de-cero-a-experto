import { CheckService } from '../domain/use-cases/check/check-service';
import { CronService } from './cron/cron-service';

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
            new CheckService().execute('https://google.com');
        });
    
    }
}