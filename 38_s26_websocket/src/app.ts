import { WebSocketServer, WebSocket } from 'ws';

const wss = new WebSocketServer({ port: 3000 });

wss.on('connection', function connection(ws) {

    console.log('Client connected');

    console.log('informacion de cliente conectado: \n', ws);

    ws.on('error', console.error);



    ws.on('message', function message(data) {       

        //recibe mensaje desde el cliente html.                                
        console.log('received from client: %s', data);

        //devuelve datos al cliente
        
        //ws.send(data.toString().toUpperCase());

        const payload = {
            type : 'custom-message',
            payload : data.toString(),
        }

        //ws.send(JSON.stringify(payload));

        //envía mensaje a todos, incluyendo al emisor.
        /*
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify(payload), { binary: false });
            }
        });
        */

        //envía mensaje a todos, menos al emisor.
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(payload), { binary: false });
              }
        });

    });



    
    /*
    ws.on('message', function message(data, isBinary) {
        console.log('received: %s', data);
    });
    */

    //ws.send('hola desde el servidor');

    ws.on('close', () => {
        console.log('Client disconnected');
    });

    /*
    setInterval(() => {
        ws.send('hola de nuevo');
    }, 2000);
    */

});


console.log('server running ... http://localhost:3000');