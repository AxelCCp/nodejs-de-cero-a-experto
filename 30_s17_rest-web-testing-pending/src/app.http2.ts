import http2 from 'http2';
import fs, { write, writeFile } from 'fs';


//193 - http2 usa el protocolo https,  por lo tanto se debe usar "https://localhost:8080/"


const server = http2.createSecureServer({
    key : fs.readFileSync('./keys/server.key'),
    cert : fs.readFileSync('./keys/server.crt'),
}, (req, resp) => {

    //REST - WEB

    /*
    console.log(req.url);
    resp.writeHead(200, {'Content-Type' : 'text/html'});
    resp.write('<h4>probando rest web </h4>');
    resp.write(`<p>ruta: ${req.url}</p>`);
    resp.end();
    */

    //REST - FORMATO JSON
    
    /*
    const data = {name : 'john doe', age : 30, city : 'new york'};
    resp.writeHead(200, {'Content-Type' : 'application/json'});
    resp.end(JSON.stringify(data));
    */

    //DEVUELVE EL HTML INDEX

    /*
    if(req.url === '/'){
        const htmlFile = fs.readFileSync('./public/index.html', 'utf-8');
        resp.writeHead(200, {'Content-Type' : 'text/html'});
        resp.end(htmlFile);
    } else {
        resp.writeHead(404, {'Content-Type' : 'text/html'});
        resp.end();
    }
    */

     //DEVUELVE EL HTML INDEX Y USA ARCHIVOS JS Y CSS

    if(req.url === '/'){
        const htmlFile = fs.readFileSync('./public/index.html', 'utf-8');
        resp.writeHead(200, {'Content-Type' : 'text/html'});
        resp.end(htmlFile);
        return;
    } 

    if(req.url?.endsWith('.js')) {
        resp.writeHead(200, {'Content-Type' : 'application/javascript'});
    } else if (req.url?.endsWith('.css')) {
        resp.writeHead(200, {'Content-Type' : 'text/css'});
    }

    try {
        const responseContent = fs.readFileSync(`./public${req.url}`, 'utf-8');
        resp.end(responseContent);
    } catch (error) {
        resp.writeHead(404, {'Content-Type' : 'text/html'});
        resp.end();
    }
    

});


server.listen(8080, () => {
    console.log('server running on port 8080');
});