
import { Request, Response } from 'express';

export class TodosController {

    //DI
    constructor() {}

    public getTodos = (req : Request, resp : Response) => {
        return resp.json(todos);
    }


    public getTodoById = (req : Request, resp : Response) => {
        const id = +req.params.id;

        if(isNaN(id)) return resp.status(400).json({error : 'El id ingresado no es un numero'});

        const todo = todos.find(todo => todo.id === id);
        return (todo) ? resp.json(todo) : resp.status(404).json({error : `El registro con el id ${id} no existe`});
    }


    public createTodo = (req : Request, resp : Response) => {
        const {text} = req.body;
        if(!text) return resp.status(400).json({error : 'text property is required'});
        const newTodo = {
            id : todos.length + 1,
            text : text,
            completedAt : null,
        };
        todos.push(newTodo);
        return resp.json(newTodo);
    };


    public updateTodo = (req : Request, resp : Response) => {

        const id = +req.params.id;

        if(isNaN(id)) return resp.status(400).json({error : 'El id ingresado no es un numero'});

        const todo = todos.find(todo => todo.id === id);

        if(!todo) return resp.status(404).json({error : `todo con el ud ${id} no se encuentra`});

        const {text, completedAt} = req.body;

        //if(!text) return resp.status(400).json({error : 'text property is required'});

        todo.text = text || todo.text;  //si viene el valor de text, usalo, sino no lo uses.

        (completedAt === 'null') ? todo.completedAt = null : todo.completedAt = new Date( completedAt || todo.completedAt); 

        resp.json(todo);
    }


    public deleteTodo = (req : Request, resp : Response) => {
        const id = +req.params.id;
        const todo = todos.find(todo => todo.id === id);
        if(!todo) return resp.status(404).json({error : `Todo con id ${id} no existe`});
        todos.slice(todos.indexOf(todo), 1);
        resp.json(todo);
    }
    
}


const todos = [
    {id : 1, text : 'buy milk', completedAt :  new Date()},
    {id : 2, text : 'buy bread', completedAt :  null},
    {id : 3, text : 'buy butter', completedAt :  new Date()},
]