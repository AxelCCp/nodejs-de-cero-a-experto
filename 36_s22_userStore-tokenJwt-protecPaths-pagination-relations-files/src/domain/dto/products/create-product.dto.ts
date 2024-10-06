import { Validators } from "../../../config";

export class CreateProductDto {
    
    private constructor(
        public readonly name : string,
        public readonly available : boolean,
        public readonly price : number,
        public readonly description : string,
        public readonly user : string,
        public readonly category : string,
    ) {}

    static create (props : { [ key : string ] : any; } ) : [string?, CreateProductDto?] {
        
        const { name, available, price, description, user, category }   = props;
        
        if(!name) return ['missing name'];
        
        if(!user) return ['missing user'];
        if(!Validators.isMongoID(user)) return ['invalid user Id'];
        
        if(!category) return ['missing category'];
        if(!Validators.isMongoID(category)) return ['invalid category Id'];

        return [undefined, new CreateProductDto(name, !!available, price, description, user, category)];        //!!available : si viene un valor como string, se considera true, si viene falso, se hace la doble negacion y queda como falso

    }
} 