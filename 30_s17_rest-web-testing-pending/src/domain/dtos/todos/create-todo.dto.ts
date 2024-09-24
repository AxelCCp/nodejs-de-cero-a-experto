
export class CreateTodoDto {

    private constructor(public readonly text : string) {}
    
    static create(props : {[key:string] : any}) : [string?, CreateTodoDto?] {           //retorna un arreglo con un string y una instancia de CreateTodoDto. ? ambos son opcionales.

        const {text} = props;

        if(!text) return ['Text property is required', undefined];

        return [undefined, new CreateTodoDto(text)];
    }
}