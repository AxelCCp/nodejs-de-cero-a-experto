import 'dotenv/config'; // 131
import * as env from 'env-var';         //para las validaciones de las env.


export const envs = {
    MAILER_EMAIL : env.get('MAILER_EMAIL').required().asEmailString(),
    MAILER_SECRET_KEY : env.get('MAILER_SECRET_KEY').required().asString(),
    PORT : env.get('PORT').required().asPortNumber(),
    MAILER_SERVICE : env.get('MAILER_SERVICE').required().asString(),
    PROD : env.get('PROD').required().asBool(),

    //mongo
    MONGO_URL : env.get('MONGO_URL').required().asString(),
    MONGO_DB_NAME : env.get('MONGO_DB_NAME').required().asString(),
    MONGO_USER : env.get('MONGO_USER').required().asString(),
    MONGO_PASS : env.get('MONGO_PASS').required().asString(),
};