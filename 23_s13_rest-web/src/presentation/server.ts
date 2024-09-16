import express, { Router } from 'express';
import path from 'path';
import compression from 'compression';

interface Options {
    port : number;
    public_path? : string;
    routes : Router;
}

export class Server {

    private app = express();
    private readonly port : number;
    private readonly public_path : string;
    private readonly routes : Router;

    constructor(options : Options) {
        const {port, public_path = 'public', routes} = options;                                     //si el public_path es undefined, entonces por defecto es la carpeta public.
        this.port = port;
        this.public_path = public_path;
        this.routes = routes;
    }

    async start() {
        console.log('Server running...');

                                                                                      //middlewares : funciones q se ejecutan en todo momento que pase por una ruta.
        this.app.use(express.json());                                                 //postman - raw : si en alguna request viene un body, entonces lo serializa cm json.
        this.app.use(express.urlencoded({extended : true}))                           //postman  - x www form urlencoded.
        this.app.use(compression());                                                  //235 - para comprimir las respuestas del servidor tipo json "gzip compression".

        //public folder
        this.app.use(express.static(this.public_path));


        //routes
        this.app.use(this.routes);

        /*  //el código se mando a routes.ts
        this.app.get('/api/todos', (req, resp) => {
            resp.json([
                {id : 1, text : 'buy milk', createdAt :  new Date()},
                {id : 2, text : 'buy bread', createdAt :  null},
                {id : 3, text : 'buy butter', createdAt :  new Date()},
            ]);
        });
        */


        //si la ruta no la encuentra dentro de public, va a venir aquí a buscar el html
        this.app.get('*', (req, resp) => {
            console.log(req.url);
            const indexPath = path.join(__dirname + `../../../${this.public_path}/index.html`);                      //__dirname : para obtener un path absoluto.
            resp.sendFile(indexPath);
        });

        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`)
        })
    }

}