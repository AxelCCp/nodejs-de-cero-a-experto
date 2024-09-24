import { Router } from "express";
import { TodosController } from "./controller";
import { TodoDatasourceImpl } from "../../infraestructure/datasource/todo.datasource.impl";
import { TodoRepositoryImpl } from "../../infraestructure/repository/todo.repository.impl";

export class TodoRoutes {

    static get routes() : Router {
        
        const router = Router();

        const datasource = new TodoDatasourceImpl();

        const todoRepository = new TodoRepositoryImpl(datasource);

        const todoController = new TodosController(todoRepository);

        //routes

        router.get('/', (req, resp) => todoController.getTodos(req, resp));   
        router.get('/:id', (req, resp) => todoController.getTodoById(req, resp));                   
        router.post('/', todoController.createTodo);
        router.put('/:id', todoController.updateTodo);
        router.delete('/:id', todoController.deleteTodo);

        return router;
    }

}