import { envs } from "./envs.plugin";


describe('envs.plugin.ts', () => {

    test('should return env options', () => {
        //console.log(envs);

        expect(envs).toEqual({
            MAILER_EMAIL: 'emailapp082@gmail.com',
            MAILER_SECRET_KEY: 'ydrrgjazxzqwoouf',
            PORT: 3001,
            MAILER_SERVICE: 'gmail',
            PROD: false,
            MONGO_URL: 'mongodb://donkey:burro@localhost:27017',
            MONGO_DB_NAME: 'NOC-TEST',
            MONGO_USER: 'donkey',
            MONGO_PASS: 'burro'
        });

    });

    //171
    test('should return erro if not found env', async() => {
        jest.resetModules();                //esto resetea el env cargado para poder cargar el nuevo env.
        process.env.PORT = 'ABC';
        try {
            await import('./envs.plugin');  //esto es para que se cargue nuevamente el archivo
            expect(true).toBe(false);       //esta linea nunca se debería ejecutar.
        } catch (error) {
            expect(`${error}`).toContain('"PORT" should be a valid integer');
        }
    });

});