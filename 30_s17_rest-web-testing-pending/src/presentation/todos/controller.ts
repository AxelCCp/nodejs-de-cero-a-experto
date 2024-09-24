
import { Request, Response } from 'express';
import { prisma } from '../../data/postgres';
import { CreateTodoDto } from '../../domain/dtos/todos/create-todo.dto';
import { UpdateTodoDto } from '../../domain/dtos';
import { TodoRepository } from '../../domain';

export class TodosController {

    //DI
    constructor(private readonly todoRepository : TodoRepository) {}

    public getTodos = async (req : Request, resp : Response) => {

      const todos = await this.todoRepository.getAll();

        console.log(todos);

      return resp.json(todos);
    }


    public getTodoById = async (req : Request, resp : Response) => {
        
        const id = +req.params.id;

        try {
            const todo = await this.todoRepository.findById(id);
            return resp.json(todo);
        } catch (error) {
            return resp.status(400).json({error});
        }
        
    }


    public createTodo = async (req : Request, resp : Response) => {

        const [error, createTodoDto] = CreateTodoDto.create(req.body);

        if(error) return resp.status(400).json({error});

        const todo = await this.todoRepository.create(createTodoDto!);

        resp.json(todo);
    };


    public updateTodo = async (req : Request, resp : Response) => {

        const id = +req.params.id;

        const [error, updateTodoDto] = UpdateTodoDto.create({...req.body, id});

        if(error) return resp.status(400).json({error});

        const updatedTodo = await this.todoRepository.updateById(updateTodoDto!)

        return resp.json(updatedTodo);
    }


    public deleteTodo = async (req : Request, resp : Response) => {
        
        const id = +req.params.id;
        
        const deletedTodo = await this.todoRepository.deleteById(id);

        resp.json(deletedTodo);

    }
    
}
