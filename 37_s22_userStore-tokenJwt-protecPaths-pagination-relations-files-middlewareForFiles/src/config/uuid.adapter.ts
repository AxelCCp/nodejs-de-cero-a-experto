import {v4 as uuidv4} from 'uuid'; 

export class Uuid {

    //forma resumida
    //static  v4 = () => uuidv4();

    static v4() {
        return uuidv4();
    }

}