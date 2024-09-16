
import { Request, Response } from 'express';
import { prisma } from '../../data/postgres';
import { CreateTodoDto } from '../../domain/dtos/todos/create-todo.dto';
import { UpdateTodoDto } from '../../domain/dtos';
import { CreateTodo, DeleteTodo, GetTodo, GetTodos, TodoRepository, UpdateTodo } from '../../domain';

export class TodosController {

    //DI
    constructor(private readonly todoRepository : TodoRepository) {}

    public getTodos = (req : Request, resp : Response) => {

        new GetTodos(this.todoRepository).execute().then(todos => resp.json(todos)).catch(error => resp.status(400).json({error}));
        
    };


    public getTodoById = (req : Request, resp : Response) => {
        
        const id = +req.params.id;

        new GetTodo(this.todoRepository).execute(id).then(todo => resp.json(todo)).catch(error => resp.status(400).json({error}));
        
    };


    public createTodo = (req : Request, resp : Response) => {

        const [error, createTodoDto] = CreateTodoDto.create(req.body);

        if(error) return resp.status(400).json({error});

        new CreateTodo(this.todoRepository).execute(createTodoDto!).then(todo => resp.json(todo)).catch(error => resp.status(400).json({error}));
    };


    public updateTodo = (req : Request, resp : Response) => {

        const id = +req.params.id;

        const [error, updateTodoDto] = UpdateTodoDto.create({...req.body, id});

        if(error) return resp.status(400).json({error});

        new UpdateTodo(this.todoRepository).execute(updateTodoDto!).then(todo => resp.json(todo)).catch(error => resp.status(400).json({error}));
    }


    public deleteTodo = (req : Request, resp : Response) => {
        
        const id = +req.params.id;
        
        new DeleteTodo(this.todoRepository).execute(id).then(todo => resp.json(todo)).catch(error => resp.status(400).json({error})); 

    }
    
}
