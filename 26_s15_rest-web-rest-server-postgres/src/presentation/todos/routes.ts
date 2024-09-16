import { Router } from "express";
import { TodosController } from "./controller";

export class TodoRoutes {

    static get routes() : Router {
        
        const router = Router();

        const todoController = new TodosController();

        //routes

        router.get('/', (req, resp) => todoController.getTodos(req, resp));   
        router.get('/:id', (req, resp) => todoController.getTodoById(req, resp));                   
        router.post('/', todoController.createTodo);
        router.put('/:id', todoController.updateTodo);
        router.delete('/:id', todoController.deleteTodo);

        return router;
    }

}