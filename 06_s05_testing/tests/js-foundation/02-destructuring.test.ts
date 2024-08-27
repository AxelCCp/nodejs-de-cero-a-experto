import { describe, test, expect, jest } from '@jest/globals';

import { characters } from '../../src/js-foundation/02-destructuring';


describe('/js-foundation/02-destructuring.ts', () => {

    test('debe contener flash y superman', () => {

        expect(characters).toContain('Flash');

        expect(characters).toContain('Superman');

    });


    test('1ro debe ser flash y 2do superman', () => {

        const [flash, superman] = characters;
        expect(flash).toBe('Flash');
        expect(superman).toBe('Superman');

    });

});