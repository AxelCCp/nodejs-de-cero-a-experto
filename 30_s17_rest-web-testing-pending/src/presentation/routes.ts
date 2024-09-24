import { Router } from "express";
import { TodosController } from "./todos/controller";
import { TodoRoutes } from "./todos/routes";


export class AppRoutes {

    static get routes() : Router {
        
        const router = Router();

           //routes

           //router.get('/api/todos', (req, resp) => todoController.getTodos(req, resp));                       //sin usar la clase con las rutas.

           router.use('/api/todos', TodoRoutes.routes);                                                         //usando la clase con las rutas.

        return router;
    }

}