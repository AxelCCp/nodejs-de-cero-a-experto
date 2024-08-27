import { buildMakePerson } from '../../src/js-foundation/05-factory'
import { describe, test, expect, jest } from '@jest/globals';


describe('js-foundation/05_factory.ts', () => {

    const getUUID = () => '1234';
    const getAge = () => 35;

    test('import { buildMakePerson } debe retornar una funcion', () => {

        const makePerson = buildMakePerson( { getUUID, getAge } );

        expect(typeof makePerson).toBe('function');

    });


    test('makePerson debe retornar una persona', () => {

        const makePerson = buildMakePerson( { getUUID, getAge } );

        const johnDoe = makePerson({name : 'john doe', birthdate : '1998-10-02'});

        expect(johnDoe).toEqual(
            {
                id : '1234',
                name : 'john doe', 
                birthdate : '1998-10-02',
                age : '35'
            }
        );

    });

});
