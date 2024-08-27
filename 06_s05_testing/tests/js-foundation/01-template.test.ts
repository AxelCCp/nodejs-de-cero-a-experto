import { describe, test, expect, jest } from '@jest/globals';

import { emailTemplate } from '../../src/js-foundation/01-template';

describe('js-foundation/01-template.ts', () => {


    test('emailTemplate -  debe contener un mensaje', () => {

        expect(emailTemplate).toContain('Hi, ');

    });


    test('emailTemplate -  debe contener {{name}} y {{orderId}}', () => {

        expect(emailTemplate).toMatch(/{{name}}/);
        expect(emailTemplate).toMatch(/{{orderId}}/);

        expect(emailTemplate).toContain('{{name}}');
        expect(emailTemplate).toContain('{{orderId}}');

    });
});