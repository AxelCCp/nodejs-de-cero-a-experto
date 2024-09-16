
import { Request, Response } from 'express';
import { prisma } from '../../data/postgres';
import { CreateTodoDto } from '../../domain/dtos/todos/create-todo.dto';
import { UpdateTodoDto } from '../../domain/dtos';

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

        const [error, createTodoDto] = CreateTodoDto.create(req.body);

        if(error) return resp.status(400).json({error});

        const todo = await prisma.todo.create({
            data : createTodoDto!
        });

         resp.json(todo);
    };


    public updateTodo = async (req : Request, resp : Response) => {

        const id = +req.params.id;

        const [error, updateTodoDto] = UpdateTodoDto.create({...req.body, id});

        if(error) return resp.status(400).json({error});

        const todo = await prisma.todo.findFirst({
            where : {id}
        });

        if(!todo) return resp.status(404).json({error : `todo con el id ${id} no se encuentra`});

        const updatedTodo = await prisma.todo.update({
            where : { id },
            data : updateTodoDto!.values
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
