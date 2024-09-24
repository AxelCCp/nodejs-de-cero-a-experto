
import { Server } from '../src/presentation/server';

jest.mock('../src/presentation/server');                                //241 - se genera un mock completo. todo lo que esté en la ruta especificada, es un mock.

describe('testing app.ts xxxxx', () => {

    test('should work', async() => {

        //expect(true).toBeTruthy();

        await import('../src/app');

        expect(Server).toHaveBeenCalledTimes(1);                        //241 - se espera q el server haya sido llamado 1 sola vez.
    
    });

});