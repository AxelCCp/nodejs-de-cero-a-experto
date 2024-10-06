export class CreateCategoryDto {

    private constructor ( public readonly name : string, public readonly available : boolean){}

    static create(object : { [key : string] : any } ) : [string?, CreateCategoryDto?] {

        const { name, available = false } = object;                                             //DEL OBJ, SE DESESTRUCTURA EL  NAME Y EL AVAILABLE, SI EL AVAILBLE NO VIENE, ES FALSE.
        let availableBoolean = available;
        if(!name) return ['missing name'];
        if(typeof available !== 'boolean') {                                                    //EL AVAILABLE PODRÍA VENIR DE VARIAS MANERAS, TIPOS, Y HAY Q CONTROLAR ESO
            availableBoolean = (available === 'true');                                          //SI EN EL AVAILABLE VIENE UN STRING "TRUE", ENTONCES VA A SER TRUE. CASO CONTRARIO NO IMPORTA.
        }

        return [undefined, new CreateCategoryDto(name, availableBoolean)];

    }

}