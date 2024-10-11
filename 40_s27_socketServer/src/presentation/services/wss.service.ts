import { WebSocket, WebSocketServer } from 'ws';
import { Server } from 'http';

//373
//se maneja commo un singleton ya que solo queremos una instancia del web socket server.

interface Options {
    server : Server;
    path? : string;                     //ws
}

export class WssService {

    private static _instance : WssService;                          //aqui se va a guardar la instancia inicializada.
    private wss : WebSocketServer;                                  // https://www.npmjs.com/package/ws   ---> npm i ws

    private constructor(options : Options) {
        const { server,  path = '/ws' } = options;                  //localhost:3000/ws
        this.wss = new  WebSocketServer({server, path});
        this.start();
    }

    static get instance() : WssService {
        if(!WssService._instance) {
            throw 'WssService is not initialized';
        } 
        return WssService._instance;
    }

    static initWss(options : Options) {
        WssService._instance = new WssService(options);
    }

    public start() {

        this.wss.on('connection', (ws : WebSocket) => {                   //WebSocket  - debe ser de ws ,  no de la implementacion nativa.
            
            console.log('client connected');

            ws.on('close', () => console.log('Client disconnected'));

        });


    
    }
   
}