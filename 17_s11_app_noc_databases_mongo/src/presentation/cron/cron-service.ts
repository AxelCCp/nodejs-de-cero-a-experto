import { CronJob } from  'cron';

type CronTime = string | Date;
type OnTick = () => void;                       //es una funcion callback q se va a querer ejecutar.   


export class CronService {

    static createJob2( cronTime : CronTime, onTick : OnTick ) : CronJob {

        const job = new CronJob(
            cronTime,
            onTick
        );

        job.start();
        return job;        
    }


    static createJob1() : CronJob {
        const job = new CronJob(
            '*/3 * * * * *',
            () => {
                const d = new Date();
                console.log('You will see this message every 3 seconds...', d);
            }
        );
        job.start();
        return job;        
    }

}