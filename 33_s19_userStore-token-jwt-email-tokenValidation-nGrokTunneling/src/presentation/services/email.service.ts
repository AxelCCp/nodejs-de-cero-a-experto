import nodemailer, { Transporter } from 'nodemailer';                    //279 - npm i nodemailer  .......  npm i --save-dev @types/nodemailer

//279 

export interface SendMailOptions {
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachements?: Attachement[];
}

export interface Attachement {
    filename: string;
    path: string;
}


export class EmailService {

    private transporter :  Transporter;

 
    //de esta manera se quita la dependencia oculta.
    constructor(mailerService : string, mailerEmail : string, senderEmailPassword : string) {
       
        this.transporter = nodemailer.createTransport({
            service: mailerService,
            auth: {
            user: mailerEmail,
            pass: senderEmailPassword,
        }

    });

    }

  


  async sendEmail( options: SendMailOptions ): Promise<boolean> {

    const { to, subject, htmlBody, attachements = [] } = options;


    try {

      const sentInformation = await this.transporter.sendMail( {
        to: to,
        subject: subject,
        html: htmlBody,
        attachments: attachements,
      });

      // console.log( sentInformation );

      return true;
      
    } catch ( error ) {

      console.log(error);

      return false;
    }

  }


}