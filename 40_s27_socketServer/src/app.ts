import { createServer } from 'http';
import { envs } from './config/envs';
import { AppRoutes } from './presentation/routes';
import { Server } from './presentation/server';
import { WssService } from './presentation/services/wss.service';


(async()=> {
  main();
})();


function main() {

  const server = new Server({
    port: envs.PORT,
    /*routes: AppRoutes.routes,*/
  });


  const httpServer = createServer(server.app);
  WssService.initWss({ server : httpServer });
  server.setRoutes(AppRoutes.routes);               //inicialmente las rutas se inicializaban antes q el WssService y esto podia dar error. Y ahora las rutas se inicializan despues.


  httpServer.listen(envs.PORT, () => {
    console.log(`Server running on port : ${envs.PORT}`);
  });

}