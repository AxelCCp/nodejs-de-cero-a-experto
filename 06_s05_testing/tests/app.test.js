"use strict";
//56
/*
describe('App', () => {
    
    it('should be true', () => {
        
        expect(true).toBe(true);

    });

});
*/
//57
describe('test in de app file', () => {
    it('should be true', () => {
        //1.arrange
        const num1 = 10;
        const num2 = 20;
        //2.act
        const suma = num1 + num2;
        //3.assert
        expect(suma).toBe(30);
        /*codigo manual:
        if(suma === 34){
            //xxxxxxxxxxx
        } else {
            throw new Error('el resultado debe ser 30');
        }*/
    });
});
