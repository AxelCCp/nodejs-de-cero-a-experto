import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';
import { LogRepository } from '../../domain/repositories/log.repository';
import { LogEntity, LogSeverityLevel } from '../../domain/datasources/entities/log.entity';

interface SendMailoptions {
    to : string | string[];
    subject : string;
    htmlbody : string;
    attachments : Attachment[];
}

interface Attachment {
    filename : string;
    path :string;
}


export class EmailService {

    constructor() {}
 
    private transporter = nodemailer.createTransport({
        service : envs.MAILER_SERVICE,
        auth : {
            user : envs.MAILER_EMAIL,
            pass : envs.MAILER_SECRET_KEY,
        }
    });


    async sendEmail(options : SendMailoptions) : Promise<boolean> {
        const {to, subject, htmlbody, attachments = []} = options;                          //attachments : si no se recibe, se pone un arreglo vacio.
        try {
            const sendinformation = await this.transporter.sendMail({
                to : to,
                subject : subject,
                html : htmlbody,
                attachments : attachments,
            });
            console.log(sendinformation);
            const log = new LogEntity({
                level : LogSeverityLevel.low,
                message : 'Email sent',
                origin : 'email.service.ts',
            });

            return true;
        } catch (error) {
            const log = new LogEntity({
                level : LogSeverityLevel.high,
                message : 'Email was not sent, error',
                origin : 'email.service.ts',
            });

            return false;
        }
    }


    async sendEmailWithFileSystemLogs(to : string | string[]) : Promise<boolean>{

        const subject = 'Logs del servidor';
        const htmlbody = `<h3>Logs del sistema - NOC</h3>
        <p>daksdhka jhakdjhskd jshjshd jshdjhs iuisdasjk hdsjf jhfd oisd jhkdsiosdod i idosdidod isodjcncdp p j ij j adsf.</p>
        <p>ver log adjuntos</p>
        `;

        const attachments : Attachment[] = [
            {filename : 'logs-all.log', path: './logs/logs-all.log'},
            {filename : 'logs-high.log', path: './logs/logs-high.log'},
            {filename : 'logs-medium.log', path: './logs/logs-medium.log'},
        ];

        return this.sendEmail({
            to, subject, attachments, htmlbody
        });
    }

}