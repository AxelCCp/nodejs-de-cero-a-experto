import express from 'express';
import path from 'path';

interface Options {
    port : number;
    public_path? : string;
}

export class Server {

    private app = express();
    
    private readonly port : number;
    private readonly public_path : string;

    constructor(options : Options) {
        const {port, public_path = 'public'} = options;                                     //si el public_path es undefined, entonces por defecto es la carpeta public.
        this.port = port;
        this.public_path = public_path;
    }

    async start() {
        console.log('Server running...');

        //middlewares : funciones q se ejecutan en todo momento que pase por una ruta.


        //public folder
        this.app.use(express.static(this.public_path));


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