import { describe, test, expect, jest } from '@jest/globals';


import { getUserById } from '../../src/js-foundation/03-callbacks';

describe('js-foundation/03-callbacks', () => {

    test('getUserById debe retornar un error si el usuario no existe', () => {

        const id = 18;

        //          (id, callback)
        getUserById(id, (error, user) => {
            
            expect(error).toBe(`usuario no encontrado con id: ${id}`);

            expect(user).toBeUndefined();

        });
    });



    test('getUserById debe retornar john doe', (done) => {

        const id = 1;

        //          (id, callback)
        getUserById(id, (error, user) => {

            expect(error).toBeUndefined();

            expect(user).toStrictEqual({
                id : 1,
                name : 'John Doe'
            });

            done();

        });
    });

});