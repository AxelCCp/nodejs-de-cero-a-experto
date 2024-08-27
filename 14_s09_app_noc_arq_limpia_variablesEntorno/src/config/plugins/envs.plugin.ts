import 'dotenv/config'; // 131
import * as env from 'env-var';         //para las validaciones de las env.


export const envs = {
    MAILER_EMAIL : env.get('MAILER_EMAIL').required().asEmailString(),
    MAILER_SECRET_KEY : env.get('MAILER_SECRET_KEY').required().asString(),
    PORT : env.get('PORT').required().asPortNumber(),
};