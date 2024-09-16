
import { Request, Response } from 'express';
import { prisma } from '../../data/postgres';

export class TodosController {

    //DI
    constructor() {}

    public getTodos = async (req : Request, resp : Response) => {

        const todos = await prisma.todo.findMany();

        return resp.json(todos);
    }


    public getTodoById = async (req : Request, resp : Response) => {
        
        const id = +req.params.id;

        if(isNaN(id)) return resp.status(400).json({error : 'El id ingresado no es un numero'});

        const todo = await prisma.todo.findFirst({
            where : {id}
        });

        return (todo) ? resp.json(todo) : resp.status(404).json({error : `El registro con el id ${id} no existe`});
    }


    public createTodo = async (req : Request, resp : Response) => {

        const {text} = req.body;
        if(!text) return resp.status(400).json({error : 'text property is required'});

        const todo = await prisma.todo.create({
            data : {text : text}
        });

         resp.json(todo);
    };


    public updateTodo = async (req : Request, resp : Response) => {

        const id = +req.params.id;

        if(isNaN(id)) return resp.status(400).json({error : 'El id ingresado no es un numero'});

        const todo = await prisma.todo.findFirst({
            where : {id}
        });

        if(!todo) return resp.status(404).json({error : `todo con el ud ${id} no se encuentra`});

        const {text, completedAt} = req.body;

        const updatedTodo = await prisma.todo.update({
            where : { id },
            data : { 
                text, 
                completedAt : (completedAt) ? new Date(completedAt) : null
            }
        });

        resp.json(updatedTodo);
    }


    public deleteTodo = async (req : Request, resp : Response) => {
        
        const id = +req.params.id;
        
        const todo = await prisma.todo.findFirst({
            where : {id}
        });
        
        if(!todo) return resp.status(404).json({error : `Todo con id ${id} no existe`});
                
        const deleted = await prisma.todo.delete({
            where : {id}                                                                            //hay q poner el where , sino te echai la bbdd.
        });

        (deleted) ? resp.json(deleted) : resp.status(404).json({error : `Todo con id ${id} no existe`});

    }
    
}
