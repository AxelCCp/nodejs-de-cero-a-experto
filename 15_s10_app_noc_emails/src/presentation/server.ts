import { envs } from '../config/plugins/envs.plugin';
import { CheckService } from '../domain/use-cases/check/check-service';
import { FileSystemDatasource } from '../infraestructure/datasources/file-system.datasources';
import { LogRepositoryImpl } from '../infraestructure/repositories/log.repository.impl';
import { CronService } from './cron/cron-service';
import { EmailService } from './email/email.service';


const fileSystemLogRepository = new LogRepositoryImpl(new FileSystemDatasource());

export class Server {

    public static start() {

        console.log('Server started...');
        
        const emailService = new EmailService(fileSystemLogRepository);

        /*
        emailService.sendEmail({
            to : 'emailapp082@gmail.com',
            subject : '',
            htmlbody : `<h3>Logs del sistema - NOC</h3>
                        <p>daksdhka jhakdjhskd jshjshd jshdjhs iuisdasjk hdsjf jhfd oisd jhkdsiosdod i idosdidod isodjcncdp p j ij j adsf.</p>
                        <p>ver log del sistema</p>
                        `,
        });
        */

        //144.CODIGO DE ENVIO DE CORREO OK, CON ARCHIVOS ADJUNTOS. 
          //SE COMENTA PARA Q NO MANDE CORREO CADA VEZ Q SE ACTUALIZA EL CODIGO.
        emailService.sendEmailWithFileSystemLogs(
            ['emailapp082@gmail.com', 'burrocarnicero@gmail.com']
        );
        

    //113  
    //CronService.createJob2('*/5 * * * * *', 
    /*    () => {
            const url = 'https://google.com';
            new CheckService(
                fileSystemLogRepository,
                () => console.log(`${url} is ok`),
                (error) => console.log(error),
            ).execute(url);
        });
    */
    }
}

